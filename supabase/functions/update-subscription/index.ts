import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface UpdateSubscriptionRequest {
  newPriceId: string;
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

    const { newPriceId }: UpdateSubscriptionRequest = await req.json();

    if (!newPriceId) {
      throw new Error("newPriceId is required");
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("stripe_customer_id, stripe_subscription_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      throw new Error("Profile not found");
    }

    if (!profile.stripe_subscription_id) {
      throw new Error("No active subscription found");
    }

    const subscription = await stripe.subscriptions.retrieve(
      profile.stripe_subscription_id
    );

    if (subscription.status !== "active" && subscription.status !== "trialing") {
      throw new Error("Subscription is not active");
    }

    const currentItem = subscription.items.data[0];

    const updatedSubscription = await stripe.subscriptions.update(
      profile.stripe_subscription_id,
      {
        items: [
          {
            id: currentItem.id,
            price: newPriceId,
          },
        ],
        proration_behavior: "create_prorations",
      }
    );

    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      customer: profile.stripe_customer_id,
      subscription: profile.stripe_subscription_id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        subscription: updatedSubscription,
        upcomingInvoice: {
          amount_due: upcomingInvoice.amount_due,
          currency: upcomingInvoice.currency,
          lines: upcomingInvoice.lines.data.map(line => ({
            description: line.description,
            amount: line.amount,
            proration: line.proration,
          })),
        },
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
    console.error("Update subscription error:", error);
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
