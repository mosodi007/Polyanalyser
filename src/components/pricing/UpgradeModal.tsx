import React from 'react';
import { X, TrendingUp, Check } from 'lucide-react';
import { StripeProduct } from '../../stripe-config';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentPlan: string;
  newPlan: StripeProduct;
  proratedAmount?: number;
  loading?: boolean;
}

export function UpgradeModal({
  isOpen,
  onClose,
  onConfirm,
  currentPlan,
  newPlan,
  proratedAmount,
  loading = false,
}: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Upgrade Plan</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Current Plan</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{currentPlan}</p>
            </div>

            <div className="flex justify-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm text-blue-600 mb-2">New Plan</p>
              <p className="text-lg font-semibold text-gray-900">{newPlan.name}</p>
              <p className="text-sm text-gray-600 mt-1">{newPlan.description}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 font-medium mb-3">What's included:</p>
              <ul className="space-y-2">
                {newPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {proratedAmount !== undefined && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Prorated Amount</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${(proratedAmount / 100).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  You'll be charged the difference between your current plan and the new plan for the remaining billing period.
                </p>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-xs text-blue-700">
                <strong>How it works:</strong> You'll only pay the difference between your current plan and the new plan for the remaining time in your billing period. Your billing cycle stays the same.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Upgrade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
