import React from 'react';
import { X } from 'lucide-react';
import { StripeProduct, formatPrice } from '../../stripe-config';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-cyan-50/50 pointer-events-none" />

        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Upgrade Your Plan</h2>
            <p className="text-sm text-gray-600">Switch to a higher tier with prorated billing</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform rotate-1" />
              <div className="relative bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Current</p>
                <p className="text-xl font-bold text-gray-900 capitalize">{currentPlan}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-gray-300 via-blue-500 to-gray-300" />
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl transform -rotate-1" />
              <div className="relative bg-white rounded-2xl p-5 border border-blue-200 shadow-lg">
                <p className="text-xs uppercase tracking-wider text-blue-600 mb-1">Upgrading to</p>
                <p className="text-xl font-bold text-gray-900">{newPlan.name}</p>
                <p className="text-sm text-gray-600 mt-2">{newPlan.description}</p>
              </div>
            </div>

            {proratedAmount !== undefined && proratedAmount > 0 && (
              <div className="relative mt-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-10" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Amount Due Today</p>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ${(proratedAmount / 100).toFixed(2)}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      Prorated difference for the remaining time in your billing period
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <p className="text-xs text-gray-700 leading-relaxed text-center">
                Your billing cycle stays the same. You only pay the difference between plans for the remaining period.
              </p>
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
              className="flex-1 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Upgrade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
