import React from 'react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planTier: string;
}

export function UpgradeSuccessModal({
  isOpen,
  onClose,
  planName,
  planTier,
}: UpgradeSuccessModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleStartAnalyzing = () => {
    onClose();
    navigate('/');
  };

  const handleViewAccount = () => {
    onClose();
    navigate('/account');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/50 to-emerald-50/50 pointer-events-none" />

        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Upgrade Successful!
            </h2>

            <p className="text-lg text-gray-600 mb-2">
              Welcome to{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {planName}
              </span>
            </p>

            <p className="text-sm text-gray-500 mb-8">
              Your account has been upgraded to <span className="font-semibold capitalize">{planTier}</span> tier
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              What's New
            </h3>
            <ul className="space-y-3 text-left">
              {planTier === 'pro' ? (
                <>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Unlimited AI market analyses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Advanced AI insights and predictions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Real-time market alerts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Portfolio optimization tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Priority support</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">50 AI analyses per day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Basic AI market analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Email alerts and notifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Performance tracking</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleStartAnalyzing}
              className="w-full flex justify-center items-center py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all"
            >
              Start Analyzing Markets
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              onClick={handleViewAccount}
              className="w-full flex justify-center items-center py-3.5 px-6 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-200 transition-all"
            >
              View Account Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
