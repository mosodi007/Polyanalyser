import React from 'react';
import { Check } from 'lucide-react';
import { StripeProduct, formatPrice } from '../../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  onSelect: (product: StripeProduct) => void;
  loading?: boolean;
  popular?: boolean;
}

export function PricingCard({ product, onSelect, loading = false, popular = false }: PricingCardProps) {
  const isAnnual = product.interval === 'year';
  const monthlyEquivalent = isAnnual ? product.price / 12 : product.price;

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
        <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-gray-600">{product.description}</p>
        
        <div className="mt-6">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="ml-1 text-xl text-gray-500">
              /{product.interval}
            </span>
          </div>
          {isAnnual && (
            <p className="mt-1 text-sm text-green-600">
              {formatPrice(monthlyEquivalent, product.currency)}/month when billed annually
            </p>
          )}
        </div>

        <button
          onClick={() => onSelect(product)}
          disabled={loading}
          className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            popular
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400'
              : 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400'
          } disabled:cursor-not-allowed`}
        >
          {loading ? 'Processing...' : 'Get Started'}
        </button>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4">What's included:</h4>
        <ul className="space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}