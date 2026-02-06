import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { StripeProduct } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';

interface PricingCardProps {
  product: StripeProduct;
  popular?: boolean;
  currentTier?: string;
}

export function PricingCard({ product, popular = false, currentTier }: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth';
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.priceId,
          userId: user.id,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPlan = currentTier === product.tier;
  const monthlyPrice = product.interval === 'year' ? (product.price / 12).toFixed(2) : product.price.toFixed(2);

  return (
    <div className={`relative rounded-2xl border-2 p-8 ${
      popular 
        ? 'border-indigo-500 bg-indigo-50' 
        : 'border-gray-200 bg-white'
    }`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {product.tier === 'lite' ? 'Lite' : 'Pro'}
        </h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">${monthlyPrice}</span>
          <span className="text-gray-600">/month</span>
          {product.interval === 'year' && (
            <div className="text-sm text-green-600 font-medium">
              Billed annually (${product.price}/year)
            </div>
          )}
        </div>
        <p className="text-gray-600 mb-6">{product.description}</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-gray-700">
            {product.tier === 'lite' ? '50 analyses per day' : 'Unlimited analyses'}
          </span>
        </div>
        <div className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-gray-700">AI-powered market analysis</span>
        </div>
        <div className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-gray-700">Real-time market data</span>
        </div>
        <div className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-gray-700">Personal watchlist</span>
        </div>
        {product.tier === 'pro' && (
          <>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">Priority support</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-gray-700">Advanced analytics</span>
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading || isCurrentPlan}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isCurrentPlan
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : popular
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Processing...
          </div>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : (
          `Subscribe to ${product.tier === 'lite' ? 'Lite' : 'Pro'}`
        )}
      </button>
    </div>
  );
}