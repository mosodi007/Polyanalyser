import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from './PricingCard';
import { stripeProducts, StripeProduct, freeTierFeatures } from '../../stripe-config';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';
import { createCheckoutSession } from '../../lib/stripe';
import { Check } from 'lucide-react';

type BillingInterval = 'month' | 'year';

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('year');
  const { user } = useAuth();
  const { tier } = useSubscription();
  const navigate = useNavigate();

  const handleSelectPlan = async (product: StripeProduct) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(product.priceId);
    setMessage(null);

    try {
      const { url } = await createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to start checkout process'
      });
    } finally {
      setLoading(null);
    }
  };

  // Group products by tier
  const liteProducts = stripeProducts.filter(p => p.name.includes('Lite'));
  const proProducts = stripeProducts.filter(p => p.name.includes('Pro'));

  // Get products for selected interval
  const selectedLite = liteProducts.find(p => p.interval === billingInterval);
  const selectedPro = proProducts.find(p => p.interval === billingInterval);

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Get AI-powered market analysis to make smarter trading decisions
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative bg-gray-100 rounded-full p-1 inline-flex items-center gap-1">
            <button
              onClick={() => setBillingInterval('month')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                billingInterval === 'month'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                billingInterval === 'year'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Savings Badge */}
        {billingInterval === 'year' && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Save up to 20% with annual billing
            </span>
          </div>
        )}

        {message && (
          <div className={`mt-8 max-w-md mx-auto rounded-lg p-4 ${
            message.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Free Tier */}
          <div className={`relative rounded-2xl border-2 bg-white p-8 shadow-sm transition-all ${
            tier === 'free'
              ? 'border-green-500 ring-4 ring-green-100'
              : 'border-gray-200 hover:shadow-md'
          }`}>
            {tier === 'free' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                  Current Plan
                </span>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <p className="mt-2 text-sm text-gray-600">Get started with AI-powered analysis</p>

              <div className="mt-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="ml-2 text-lg text-gray-500">/month</span>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? '/' : '/signup')}
                disabled={tier === 'free'}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  tier === 'free'
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-200'
                }`}
              >
                {tier === 'free' ? 'Current Plan' : user ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>

            <div className="mt-8">
              <ul className="space-y-4">
                {freeTierFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lite Plan */}
          {selectedLite && (
            <PricingCard
              product={selectedLite}
              onSelect={handleSelectPlan}
              loading={loading === selectedLite.priceId}
              isCurrentTier={tier === 'lite'}
            />
          )}

          {/* Pro Plan */}
          {selectedPro && (
            <PricingCard
              product={selectedPro}
              onSelect={handleSelectPlan}
              loading={loading === selectedPro.priceId}
              popular
              isCurrentTier={tier === 'pro'}
            />
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All paid plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}