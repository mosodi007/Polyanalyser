import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PreviewUpgradeRequest {
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

    const { newPriceId }: PreviewUpgradeRequest = await req.json();

    if (!newPriceId) {
      throw new Error("newPriceId is required");
    }

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

    const currentItem = stripeSubscription.items.data[0];

    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      customer: customer.customer_id,
      subscription: subscription.subscription_id,
      subscription_items: [
        {
          id: currentItem.id,
          price: newPriceId,
        },
      ],
      subscription_proration_behavior: "always_invoice",
    });

    const immediateProrationLines = upcomingInvoice.lines.data.filter(
      line => line.proration === true
    );

    const proratedAmount = immediateProrationLines.reduce(
      (sum, line) => sum + line.amount,
      0
    );

    return new Response(
      JSON.stringify({
        success: true,
        proratedAmount,
        currency: upcomingInvoice.currency,
        lines: upcomingInvoice.lines.data.map(line => ({
          description: line.description,
          amount: line.amount,
          proration: line.proration,
        })),
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
    console.error("Preview upgrade error:", error);
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
