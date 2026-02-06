import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { StripeProduct, freeTierFeatures } from '../../stripe-config';

interface DowngradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentPlan: string;
  newPlan: StripeProduct | 'free';
  loading?: boolean;
  effectiveDate?: string;
}

export function DowngradeModal({
  isOpen,
  onClose,
  onConfirm,
  currentPlan,
  newPlan,
  loading = false,
  effectiveDate,
}: DowngradeModalProps) {
  if (!isOpen) return null;

  const newPlanName = newPlan === 'free' ? 'Free' : newPlan.name;
  const newPlanTier = newPlan === 'free' ? 'free' : newPlan.tier;
  const newPlanFeatures = newPlan === 'free' ? freeTierFeatures : newPlan.features;

  const lostFeatures = currentPlan === 'pro' && newPlanTier === 'lite'
    ? [
        'Unlimited AI analyses (reduced to 50/day)',
        'Advanced AI insights',
        'Portfolio optimization tools',
        'Priority support'
      ]
    : currentPlan === 'pro' && newPlanTier === 'free'
    ? [
        'Unlimited AI analyses (reduced to 5/day)',
        'Advanced AI insights',
        'Real-time market alerts',
        'Portfolio optimization tools',
        'Priority support'
      ]
    : [
        '50 AI analyses per day (reduced to 5/day)',
        'Email alerts',
        'Performance tracking'
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white/50 to-red-50/50 pointer-events-none" />

        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg mb-4">
              <AlertTriangle className="h-9 w-9 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirm Downgrade</h2>
            <p className="text-sm text-gray-600">Review the changes to your subscription</p>
          </div>

          <div className="space-y-5 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform rotate-1" />
              <div className="relative bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Current</p>
                <p className="text-xl font-bold text-gray-900 capitalize">{currentPlan}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-gray-300 via-orange-500 to-gray-300" />
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl transform -rotate-1 opacity-20" />
              <div className="relative bg-white rounded-2xl p-5 border border-orange-200 shadow-lg">
                <p className="text-xs uppercase tracking-wider text-orange-600 mb-1">Downgrading to</p>
                <p className="text-xl font-bold text-gray-900">{newPlanName}</p>
              </div>
            </div>

            {effectiveDate && (
              <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">Effective Date:</span> {effectiveDate}
                </p>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  You'll keep your current features until then
                </p>
              </div>
            )}

            <div className="bg-orange-50/50 backdrop-blur-sm rounded-xl p-5 border border-orange-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
                Features You'll Lose
              </h3>
              <ul className="space-y-2">
                {lostFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-5 border border-green-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                What You'll Keep
              </h3>
              <ul className="space-y-2">
                {newPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Downgrade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
