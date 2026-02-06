import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Copy, RefreshCw, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';

export function StripeTestPage() {
  const { user } = useAuth();
  const { tier, subscription, refresh } = useSubscription();
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-webhook`;

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSyncNow = async () => {
    if (!user) return;

    setSyncing(true);
    setSyncResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setSyncResult({ error: 'Not authenticated' });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-subscription`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setSyncResult({ error: result.error || 'Sync failed' });
      } else {
        setSyncResult(result);
        await refresh();
      }
    } catch (error) {
      setSyncResult({ error: error instanceof Error ? error.message : 'Sync failed' });
    } finally {
      setSyncing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Please log in to view this page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stripe Integration Test</h1>
          <p className="mt-2 text-gray-600">
            Diagnostic information for testing Stripe payment integration
          </p>
        </div>

        {/* Webhook Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Webhook Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook Endpoint URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={webhookUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
                />
                <button
                  onClick={handleCopyWebhook}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Add this URL to your Stripe Dashboard under Developers → Webhooks
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Webhook Events
              </label>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  checkout.session.completed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  customer.subscription.created
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  customer.subscription.updated
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  customer.subscription.deleted
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  invoice.payment_succeeded
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  invoice.payment_failed
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Setup Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Go to Stripe Dashboard → Developers → Webhooks</li>
                <li>Click "Add endpoint"</li>
                <li>Paste the webhook URL above</li>
                <li>Select the events listed above</li>
                <li>Copy the webhook signing secret</li>
                <li>Set it as STRIPE_WEBHOOK_SECRET in your Supabase environment variables</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Current Subscription Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Subscription Status</h2>
            <button
              onClick={handleSyncNow}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Sync Now
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Tier
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold capitalize">{tier}</span>
                {tier === 'free' ? (
                  <XCircle className="h-5 w-5 text-gray-400" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Status
              </label>
              <span className="text-lg font-semibold">
                {subscription?.subscription_status || 'None'}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subscription ID
              </label>
              <span className="text-sm text-gray-600 font-mono">
                {subscription?.subscription_id || 'N/A'}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ID
              </label>
              <span className="text-sm text-gray-600 font-mono">
                {subscription?.price_id || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Sync Result */}
        {syncResult && (
          <div className={`rounded-lg border p-6 mb-6 ${
            syncResult.error
              ? 'bg-red-50 border-red-200'
              : 'bg-green-50 border-green-200'
          }`}>
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              {syncResult.error ? (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-900">Sync Failed</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-900">Sync Successful</span>
                </>
              )}
            </h2>
            <pre className="mt-2 text-sm overflow-auto bg-white p-3 rounded border">
              {JSON.stringify(syncResult, null, 2)}
            </pre>
          </div>
        )}

        {/* Test Card Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Card Information</h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <p className="text-sm text-yellow-800 font-medium mb-2">
              Use these test cards for testing payments:
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Successful Payment:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">4242 4242 4242 4242</code>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Requires Authentication:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">4000 0025 0000 3155</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Card Declined:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">4000 0000 0000 9995</code>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Use any future expiry date, any 3-digit CVC, and any postal code.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Pricing Page
          </Link>
        </div>
      </div>
    </div>
  );
}
