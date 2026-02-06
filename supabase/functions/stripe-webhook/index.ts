import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // get the raw body
    const body = await req.text();

    // verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  console.log(`[WEBHOOK] Received event: ${event.type}, ID: ${event.id}`);

  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    console.warn('[WEBHOOK] No data object in event');
    return;
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event);
      break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await handleSubscriptionChange(event);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event);
      break;
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event);
      break;
    case 'payment_intent.succeeded':
      // Only handle if not part of subscription
      if (event.data.object.invoice === null) {
        console.log('[WEBHOOK] One-time payment succeeded (not handling)');
      }
      break;
    default:
      console.log(`[WEBHOOK] Unhandled event type: ${event.type}`);
  }
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const customerId = session.customer as string;

  if (!customerId) {
    console.error('[WEBHOOK] No customer in checkout session');
    return;
  }

  console.log(`[WEBHOOK] Checkout completed for customer: ${customerId}, mode: ${session.mode}`);

  if (session.mode === 'subscription') {
    console.log('[WEBHOOK] Subscription checkout - syncing customer');
    await syncCustomerFromStripe(customerId);
  } else if (session.mode === 'payment' && session.payment_status === 'paid') {
    console.log('[WEBHOOK] One-time payment completed');
    try {
      const { error: orderError } = await supabase.from('stripe_orders').insert({
        checkout_session_id: session.id,
        payment_intent_id: session.payment_intent as string,
        customer_id: customerId,
        amount_subtotal: session.amount_subtotal,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        status: 'completed',
      });

      if (orderError) {
        console.error('[WEBHOOK] Error inserting order:', orderError);
      } else {
        console.log(`[WEBHOOK] Successfully processed one-time payment: ${session.id}`);
      }
    } catch (error) {
      console.error('[WEBHOOK] Error processing one-time payment:', error);
    }
  }
}

async function handleSubscriptionChange(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  if (!customerId) {
    console.error('[WEBHOOK] No customer in subscription event');
    return;
  }

  console.log(`[WEBHOOK] Subscription ${event.type} for customer: ${customerId}`);
  await syncCustomerFromStripe(customerId);
}

async function handleInvoicePaymentSucceeded(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerId = invoice.customer as string;

  if (!customerId) {
    console.error('[WEBHOOK] No customer in invoice event');
    return;
  }

  console.log(`[WEBHOOK] Invoice payment succeeded for customer: ${customerId}`);
  await syncCustomerFromStripe(customerId);
}

async function handleInvoicePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerId = invoice.customer as string;

  if (!customerId) {
    console.error('[WEBHOOK] No customer in failed invoice event');
    return;
  }

  console.log(`[WEBHOOK] Invoice payment failed for customer: ${customerId}`);
  // Still sync to update status
  await syncCustomerFromStripe(customerId);
}

function getTierFromPriceId(priceId: string): string {
  const tierMapping: Record<string, string> = {
    'price_1SxqxqHJtj9hmvRfoeIrvHDC': 'lite',
    'price_1SxqxiHJtj9hmvRfk91AktpL': 'lite',
    'price_1SxqxmHJtj9hmvRfHHkPAIFd': 'pro',
    'price_1SxqxeHJtj9hmvRfSoD4q1o3': 'pro',
  };

  return tierMapping[priceId] || 'free';
}

// based on the excellent https://github.com/t3dotgg/stripe-recommendations
async function syncCustomerFromStripe(customerId: string) {
  try {
    // fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    // TODO verify if needed
    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }

      // Look up the user_id from stripe_customers table
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('user_id')
        .eq('customer_id', customerId)
        .maybeSingle();

      if (customerError) {
        console.error('Error fetching customer data for tier downgrade:', customerError);
      } else if (customerData) {
        const { error: tierError } = await supabase
          .from('user_profiles')
          .update({ subscription_tier: 'free' })
          .eq('id', customerData.user_id);

        if (tierError) {
          console.error('Error updating user tier to free:', tierError);
        }
      }

      return;
    }

    // assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;

    // store subscription state
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: priceId,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }

    const isActive = subscription.status === 'active' || subscription.status === 'trialing';
    const tier = isActive ? getTierFromPriceId(priceId) : 'free';

    // Look up the user_id from stripe_customers table
    const { data: customerData, error: customerError } = await supabase
      .from('stripe_customers')
      .select('user_id')
      .eq('customer_id', customerId)
      .maybeSingle();

    if (customerError) {
      console.error('Error fetching customer data:', customerError);
    } else if (customerData) {
      const { error: tierError } = await supabase
        .from('user_profiles')
        .update({ subscription_tier: tier })
        .eq('id', customerData.user_id);

      if (tierError) {
        console.error('Error updating user tier:', tierError);
      } else {
        console.info(`Updated user ${customerData.user_id} to tier: ${tier}`);
      }
    } else {
      console.error(`No user found for customer ${customerId}`);
    }

    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}