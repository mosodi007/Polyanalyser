import React from 'react';
import { PricingSection } from '../components/pricing/PricingSection';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Pricing Plans</h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your trading needs
          </p>
        </div>
        <PricingSection />
      </div>
    </div>
  );
}