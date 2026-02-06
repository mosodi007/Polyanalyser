import React from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { getProductByPriceId, formatPrice } from '../../stripe-config';

export function SubscriptionStatus() {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || subscription.status === 'not_started') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <Crown className="h-6 w-6 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800">No Active Subscription</h3>
            <p className="text-yellow-700">Upgrade to access premium features</p>
          </div>
        </div>
      </div>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
  const isActive = subscription.status ? ['active', 'trialing'].includes(subscription.status) : false;

  return (
    <div className={`rounded-lg shadow p-6 ${
      isActive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Crown className={`h-6 w-6 mr-3 ${
            isActive ? 'text-green-600' : 'text-red-600'
          }`} />
          <div>
            <h3 className={`text-lg font-medium ${
              isActive ? 'text-green-800' : 'text-red-800'
            }`}>
              {product?.name || 'Subscription'}
            </h3>
            <p className={`text-sm ${
              isActive ? 'text-green-700' : 'text-red-700'
            }`}>
              Status: {subscription.status?.replace('_', ' ') || 'Unknown'}
            </p>
          </div>
        </div>

        {product && (
          <div className={`text-right text-sm ${
            isActive ? 'text-green-700' : 'text-red-700'
          }`}>
            <div className="font-medium">
              {formatPrice(product.price, product.currency)}
            </div>
            <div>per {product.interval}</div>
          </div>
        )}
      </div>

      {subscription.current_period_end && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on{' '}
            {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </span>
        </div>
      )}

      {subscription.payment_method_last4 && (
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <CreditCard className="h-4 w-4 mr-2" />
          <span>
            {subscription.payment_method_brand?.toUpperCase()} ending in {subscription.payment_method_last4}
          </span>
        </div>
      )}
    </div>
  );
}