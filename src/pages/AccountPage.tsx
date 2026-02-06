import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, CreditCard, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';

export function AccountPage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please sign in</h2>
          <Link to="/login" className="mt-4 text-indigo-600 hover:text-indigo-500">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View All Plans
                </Link>
              </div>
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