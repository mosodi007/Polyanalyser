import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export function Success() {
  const [searchParams] = useSearchParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSubscriptionDetails();
    }
  }, [user]);

  const fetchSubscriptionDetails = async () => {
    try {
      const { data } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();
      
      setSubscriptionDetails(data);
    } catch (error) {
      console.error('Error fetching subscription details:', error);
    } finally {
      setLoading(false);
    }
  };

  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for subscribing to PolyAnalyser
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Subscription Details
          </h3>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : subscriptionDetails ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-gray-900">
                  {subscriptionDetails.price_id?.includes('lite') ? 'Lite' : 'Pro'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {subscriptionDetails.subscription_status}
                </span>
              </div>
              {subscriptionDetails.current_period_end && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Next billing:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(subscriptionDetails.current_period_end * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">
              Your subscription is being processed. You should receive a confirmation email shortly.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          <Link
            to="/"
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {sessionId && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Session ID: {sessionId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}