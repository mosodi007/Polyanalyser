import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';

interface SubscriptionData {
  tier: string;
  status: string;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      // First get user profile for tier
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('id', user?.id)
        .single();

      // Then get Stripe subscription details if available
      const { data: stripeData } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      setSubscription({
        tier: profile?.subscription_tier || 'free',
        status: stripeData?.subscription_status || 'inactive',
        currentPeriodEnd: stripeData?.current_period_end,
        cancelAtPeriodEnd: stripeData?.cancel_at_period_end
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({
        tier: 'free',
        status: 'inactive'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    subscription,
    loading,
    refetch: fetchSubscription
  };
}