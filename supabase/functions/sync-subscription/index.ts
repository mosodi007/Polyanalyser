import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);

    if (getUserError || !user) {
      return new Response(
        JSON.stringify({ error: 'Failed to authenticate user' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get customer ID for this user
    const { data: customerData, error: customerError } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (customerError || !customerData) {
      return new Response(
        JSON.stringify({
          error: 'No Stripe customer found',
          details: customerError?.message
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sync subscription from Stripe
    const result = await syncCustomerFromStripe(customerData.customer_id, user.id);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function getTierFromPriceId(priceId: string): string {
  const tierMapping: Record<string, string> = {
    'price_1Sxl8xHJtj9hmvRftM9cClgJ': 'lite',
    'price_1SxlCsHJtj9hmvRftE3jQIpY': 'lite',
    'price_1Sxl9qHJtj9hmvRfepiVyPpW': 'pro',
    'price_1SxlE7HJtj9hmvRfTdZBX7pU': 'pro',
  };

  return tierMapping[priceId] || 'free';
}

async function syncCustomerFromStripe(customerId: string, userId: string) {
  try {
    console.log(`[SYNC] Starting sync for customer: ${customerId}, user: ${userId}`);

    // Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    console.log(`[SYNC] Found ${subscriptions.data.length} subscriptions`);

    if (subscriptions.data.length === 0) {
      console.log('[SYNC] No subscriptions found, setting to free tier');

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
        console.error('[SYNC] Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }

      const { error: tierError } = await supabase
        .from('user_profiles')
        .update({ subscription_tier: 'free' })
        .eq('id', userId);

      if (tierError) {
        console.error('[SYNC] Error updating user tier to free:', tierError);
        throw tierError;
      }

      return {
        success: true,
        tier: 'free',
        message: 'No active subscription found, set to free tier'
      };
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;

    console.log(`[SYNC] Subscription status: ${subscription.status}, priceId: ${priceId}`);

    // Store subscription state
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
      console.error('[SYNC] Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }

    const isActive = subscription.status === 'active' || subscription.status === 'trialing';
    const tier = isActive ? getTierFromPriceId(priceId) : 'free';

    console.log(`[SYNC] Calculated tier: ${tier} (isActive: ${isActive})`);

    // Update user tier
    const { error: tierError } = await supabase
      .from('user_profiles')
      .update({ subscription_tier: tier })
      .eq('id', userId);

    if (tierError) {
      console.error('[SYNC] Error updating user tier:', tierError);
      throw tierError;
    }

    console.log(`[SYNC] Successfully updated user ${userId} to tier: ${tier}`);

    return {
      success: true,
      tier,
      subscription_status: subscription.status,
      subscription_id: subscription.id,
      price_id: priceId,
      message: 'Subscription synced successfully'
    };
  } catch (error) {
    console.error(`[SYNC] Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}
