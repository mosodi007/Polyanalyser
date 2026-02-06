import { supabase } from './supabase';

interface CreateCheckoutSessionParams {
  priceId: string;
  mode: 'subscription' | 'payment';
  successUrl: string;
  cancelUrl: string;
}

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export async function createCheckoutSession(params: CreateCheckoutSessionParams): Promise<CheckoutSessionResponse> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      price_id: params.priceId,
      mode: params.mode,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create checkout session';
    try {
      const error = await response.json();
      errorMessage = error.error || errorMessage;
    } catch {
      errorMessage = `Server error (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

interface UpdateSubscriptionResponse {
  success: boolean;
  subscription: any;
  upcomingInvoice?: {
    amount_due: number;
    currency: string;
    lines: Array<{
      description: string;
      amount: number;
      proration: boolean;
    }>;
  };
  error?: string;
}

export async function updateSubscription(newPriceId: string): Promise<UpdateSubscriptionResponse> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      newPriceId,
    }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to update subscription';
    try {
      const error = await response.json();
      errorMessage = error.error || errorMessage;
    } catch {
      errorMessage = `Server error (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to update subscription');
  }

  return result;
}

interface PreviewUpgradeResponse {
  success: boolean;
  proratedAmount: number;
  currency: string;
  lines: Array<{
    description: string;
    amount: number;
    proration: boolean;
  }>;
  error?: string;
}

export async function previewUpgrade(newPriceId: string): Promise<PreviewUpgradeResponse> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/preview-upgrade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      newPriceId,
    }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to preview upgrade';
    try {
      const error = await response.json();
      errorMessage = error.error || errorMessage;
    } catch {
      errorMessage = `Server error (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to preview upgrade');
  }

  return result;
}