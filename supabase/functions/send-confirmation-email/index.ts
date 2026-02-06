import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  email: string;
  token: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, token }: EmailRequest = await req.json();

    if (!email || !token) {
      return new Response(
        JSON.stringify({ error: "Email and token are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const verificationUrl = `${Deno.env.get("SITE_URL") || "https://polyanalyser.com"}/verify-email?token=${token}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6;">
          <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <div style="background: #1552F0; padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Welcome to PolyAnalyser!</h1>
            </div>

            <div style="padding: 40px 30px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 22px; font-weight: 600;">Confirm Your Email Address</h2>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.8; margin: 20px 0;">
                Thank you for signing up! We're excited to have you on board. To complete your registration and start analyzing Polymarket data, please confirm your email address.
              </p>

              <div style="text-align: center; margin: 35px 0;">
                <a href="${verificationUrl}" style="display: inline-block; background: #1552F0; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(21, 82, 240, 0.3);">
                  Confirm Your Email
                </a>
              </div>

              <div style="background: #f9fafb; border-left: 4px solid #1552F0; padding: 16px 20px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong style="color: #111827;">Quick Start:</strong> Once verified, you'll have immediate access to AI-powered market analysis and insights.
                </p>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0;">
                Or copy and paste this link into your browser:<br>
                <a href="${verificationUrl}" style="color: #1552F0; word-break: break-all; text-decoration: none;">${verificationUrl}</a>
              </p>

              <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin: 0;">
                  If you didn't create an account with PolyAnalyser, you can safely ignore this email.
                </p>
              </div>
            </div>

            <div style="background: #f9fafb; text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">© 2026 PolyAnalyser. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PolyAnalyser <verify@polyanalyser.com>",
        to: [email],
        subject: "Confirm Your Email - PolyAnalyser",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to send email"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
