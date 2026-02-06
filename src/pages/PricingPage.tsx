import React from 'react';
import { PricingSection } from '../components/pricing/PricingSection';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your trading needs. Start free, upgrade when you're ready.
          </p>
        </div>
        <PricingSection />
      </div>
    </div>
  );
}