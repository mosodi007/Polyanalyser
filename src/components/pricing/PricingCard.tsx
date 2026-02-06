import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { StripeProduct, formatPrice } from '../../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  onSelect: (product: StripeProduct) => void;
  loading?: boolean;
  popular?: boolean;
  isCurrentTier?: boolean;
}

export function PricingCard({ product, onSelect, loading = false, popular = false, isCurrentTier = false }: PricingCardProps) {
  const isAnnual = product.interval === 'year';
  const monthlyEquivalent = isAnnual ? product.price / 12 : product.price;

  const tierName = product.name.includes('Lite') ? 'Lite' : 'Pro';

  return (
    <div className={`relative rounded-2xl border-2 p-8 transition-all ${
      isCurrentTier
        ? 'border-slate-400 bg-white'
        : popular
        ? 'border-blue-600 bg-white shadow-xl scale-105 hover:shadow-2xl'
        : 'border-gray-200 bg-white shadow-sm hover:shadow-lg'
    }`}>
      {isCurrentTier ? (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-slate-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
            Current Plan
          </span>
        </div>
      ) : popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">{tierName}</h3>
        <p className="mt-2 text-sm text-gray-600 min-h-[40px]">{product.description}</p>

        <div className="mt-8">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold text-gray-900">
              {formatPrice(isAnnual ? monthlyEquivalent : product.price, product.currency)}
            </span>
            <span className="ml-2 text-lg text-gray-500">
              /month
            </span>
          </div>
          {isAnnual && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Billed {formatPrice(product.price, product.currency)} annually
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => onSelect(product)}
          disabled={loading || isCurrentTier}
          className={`mt-8 w-full py-3.5 px-6 rounded-lg font-semibold transition-all ${
            isCurrentTier
              ? 'bg-green-500 text-white cursor-default'
              : popular
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg disabled:from-blue-400 disabled:to-cyan-400'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md disabled:bg-gray-400'
          } disabled:cursor-not-allowed`}
        >
          {loading ? 'Processing...' : isCurrentTier ? 'Current Plan' : 'Get Started'}
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <ul className="space-y-4">
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