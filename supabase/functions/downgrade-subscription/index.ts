import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface DowngradeSubscriptionRequest {
  newPriceId?: string;
  cancelAtPeriodEnd?: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-12-18.acacia",
    });

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const { createClient } = await import("jsr:@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { newPriceId, cancelAtPeriodEnd }: DowngradeSubscriptionRequest = await req.json();

    const { data: customer, error: customerError } = await supabase
      .from("stripe_customers")
      .select("customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (customerError || !customer) {
      throw new Error("Stripe customer not found");
    }

    const { data: subscription, error: subscriptionError } = await supabase
      .from("stripe_subscriptions")
      .select("subscription_id")
      .eq("customer_id", customer.customer_id)
      .maybeSingle();

    if (subscriptionError || !subscription || !subscription.subscription_id) {
      throw new Error("No active subscription found");
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.subscription_id
    );

    if (stripeSubscription.status !== "active" && stripeSubscription.status !== "trialing") {
      throw new Error("Subscription is not active");
    }

    let updatedSubscription;

    if (cancelAtPeriodEnd) {
      updatedSubscription = await stripe.subscriptions.update(
        subscription.subscription_id,
        {
          cancel_at_period_end: true,
        }
      );
    } else if (newPriceId) {
      const currentItem = stripeSubscription.items.data[0];

      updatedSubscription = await stripe.subscriptions.update(
        subscription.subscription_id,
        {
          items: [
            {
              id: currentItem.id,
              price: newPriceId,
            },
          ],
          proration_behavior: "none",
          billing_cycle_anchor: "unchanged",
        }
      );
    } else {
      throw new Error("Either newPriceId or cancelAtPeriodEnd must be provided");
    }

    const effectiveDate = new Date(updatedSubscription.current_period_end * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return new Response(
      JSON.stringify({
        success: true,
        subscription: updatedSubscription,
        effectiveDate,
        message: cancelAtPeriodEnd
          ? `Your subscription will be canceled on ${effectiveDate}`
          : `Your subscription will be downgraded on ${effectiveDate}`,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Downgrade subscription error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
