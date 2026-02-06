import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, CreditCard, ArrowLeft, Activity, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
import { UsageService } from '../services/usage.service';
import { getTierLimits } from '../stripe-config';

export function AccountPage() {
  const { user, signOut } = useAuth();
  const { tier, usage, loading: subscriptionLoading } = useSubscription();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please sign in</h2>
          <Link to="/login" className="mt-4 text-[#1552F0] hover:text-[#0d3cb8]">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  const tierInfo = getTierLimits(tier);
  const usagePercentage = usage?.isUnlimited
    ? 100
    : usage
    ? Math.round((usage.usedToday / usage.dailyLimit) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-[#1552F0] hover:text-[#0d3cb8]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account and subscription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-gray-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 text-sm text-gray-900">{user.email}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">User ID</label>
                  <div className="mt-1 text-sm text-gray-500 font-mono">{user.id}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <div className="mt-1 text-sm text-gray-900">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Subscription</h2>
              </div>

              <SubscriptionStatus />

              <div className="mt-6">
                <Link
                  to="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1552F0] hover:bg-[#0d3cb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1552F0]"
                >
                  View All Plans
                </Link>
              </div>
            </div>

            {/* Usage Statistics Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <Activity className="h-6 w-6 text-gray-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Usage Statistics</h2>
              </div>

              {subscriptionLoading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Current Plan</span>
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {tierInfo.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Daily Analyses</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {usage?.isUnlimited ? (
                          'Unlimited'
                        ) : (
                          `${usage?.usedToday || 0} / ${usage?.dailyLimit || 0}`
                        )}
                      </span>
                    </div>
                  </div>

                  {!usage?.isUnlimited && (
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Usage Today</span>
                        <span>{usagePercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            usagePercentage >= 100
                              ? 'bg-red-500'
                              : usagePercentage >= 80
                              ? 'bg-orange-500'
                              : 'bg-[#1552F0]'
                          }`}
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 text-center">
                        {usage?.remainingToday || 0} analyses remaining today
                      </p>
                    </div>
                  )}

                  {usage?.isUnlimited && (
                    <div className="bg-blue-50 rounded-lg p-4 text-center border-l-4 border-[#1552F0]">
                      <TrendingUp className="h-8 w-8 text-[#1552F0] mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">
                        {usage.usedToday} analyses today
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Unlimited analyses available
                      </p>
                    </div>
                  )}

                  {tier === 'free' && usage && !usage.canAnalyze && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-800 font-medium">
                        You've reached your daily limit
                      </p>
                      <Link
                        to="/pricing"
                        className="mt-2 inline-flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Upgrade to analyze more markets
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-gray-400 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/pricing"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Upgrade Plan
                </Link>
                
                <button
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}