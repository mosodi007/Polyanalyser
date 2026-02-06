import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from './PricingCard';
import { stripeProducts, StripeProduct, freeTierFeatures } from '../../stripe-config';
import { useAuth } from '../../hooks/useAuth';
import { createCheckoutSession } from '../../lib/stripe';
import { Check } from 'lucide-react';

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const { user } = useAuth();
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

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get AI-powered market analysis to make smarter trading decisions
          </p>
        </div>

        {message && (
          <div className={`mt-8 max-w-md mx-auto rounded-md p-4 ${
            message.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Free Tier */}
          <div className="relative rounded-2xl border-2 border-gray-200 bg-white p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <p className="mt-2 text-gray-600">Get started with AI-powered analysis</p>

              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="ml-1 text-xl text-gray-500">/month</span>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? '/' : '/signup')}
                className="mt-8 w-full py-3 px-6 rounded-lg font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800"
              >
                {user ? 'Get Started' : 'Sign Up Free'}
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-900 mb-4">What's included:</h4>
              <ul className="space-y-3">
                {freeTierFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lite Monthly */}
          <PricingCard
            product={liteProducts.find(p => p.interval === 'month')!}
            onSelect={handleSelectPlan}
            loading={loading === liteProducts.find(p => p.interval === 'month')?.priceId}
          />

          {/* Pro Monthly */}
          <PricingCard
            product={proProducts.find(p => p.interval === 'month')!}
            onSelect={handleSelectPlan}
            loading={loading === proProducts.find(p => p.interval === 'month')?.priceId}
            popular
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-2xl mx-auto">
          {/* Lite Annual */}
          <PricingCard
            product={liteProducts.find(p => p.interval === 'year')!}
            onSelect={handleSelectPlan}
            loading={loading === liteProducts.find(p => p.interval === 'year')?.priceId}
          />

          {/* Pro Annual */}
          <PricingCard
            product={proProducts.find(p => p.interval === 'year')!}
            onSelect={handleSelectPlan}
            loading={loading === proProducts.find(p => p.interval === 'year')?.priceId}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}