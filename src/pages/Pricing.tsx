import React, { useState, useEffect } from 'react';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { PricingCard } from '../components/PricingCard';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export function Pricing() {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [currentTier, setCurrentTier] = useState<string>('free');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserTier();
    }
  }, [user]);

  const fetchUserTier = async () => {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('id', user?.id)
        .single();
      
      if (data) {
        setCurrentTier(data.subscription_tier);
      }
    } catch (error) {
      console.error('Error fetching user tier:', error);
    }
  };

  const filteredProducts = STRIPE_PRODUCTS.filter(product => product.interval === billingInterval);
  const liteProduct = filteredProducts.find(p => p.tier === 'lite');
  const proProduct = filteredProducts.find(p => p.tier === 'pro');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock the power of AI-driven Polymarket analysis
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${billingInterval === 'month' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingInterval(billingInterval === 'month' ? 'year' : 'month')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingInterval === 'year' ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingInterval === 'year' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${billingInterval === 'year' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annually
            </span>
            {billingInterval === 'year' && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Free Tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Get started with basic analysis</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-gray-200 mr-3"></div>
                <span className="text-gray-700">5 analyses per day</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-gray-200 mr-3"></div>
                <span className="text-gray-700">Basic market data</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-gray-200 mr-3"></div>
                <span className="text-gray-700">Personal watchlist</span>
              </div>
            </div>

            <button
              disabled={currentTier === 'free'}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                currentTier === 'free'
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {currentTier === 'free' ? 'Current Plan' : 'Get Started'}
            </button>
          </div>

          {/* Paid Plans */}
          {liteProduct && (
            <PricingCard 
              product={liteProduct} 
              popular={billingInterval === 'month'}
              currentTier={currentTier}
            />
          )}
          {proProduct && (
            <PricingCard 
              product={proProduct} 
              popular={billingInterval === 'year'}
              currentTier={currentTier}
            />
          )}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens when I reach my daily limit?
              </h3>
              <p className="text-gray-600">
                Once you reach your daily analysis limit, you'll need to wait until the next day or upgrade to a higher tier to continue analyzing markets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to your plan's features until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's the difference between Lite and Pro?
              </h3>
              <p className="text-gray-600">
                Lite gives you 50 analyses per day, while Pro offers unlimited analyses plus priority support and advanced analytics features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}