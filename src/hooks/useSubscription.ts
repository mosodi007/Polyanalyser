import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { UsageService, UsageData } from '../services/usage.service';
import { SubscriptionTier, getTierByPriceId } from '../stripe-config';

interface Subscription {
  customer_id: string;
  subscription_id: string | null;
  status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setTier('free');
      setUsage(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // First, get the Stripe customer_id for this user
      const { data: customerData } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user.id)
        .maybeSingle();

      let activeSub: Subscription | null = null;

      if (customerData?.customer_id) {
        // Then fetch subscription using the Stripe customer_id
        const { data: subscriptionData, error: subError } = await supabase
          .from('stripe_subscriptions')
          .select('*')
          .eq('customer_id', customerData.customer_id)
          .in('status', ['active', 'trialing'])
          .maybeSingle();

        if (subError && subError.code !== 'PGRST116') {
          console.error('Error fetching subscription:', subError);
        }

        activeSub = subscriptionData as unknown as Subscription | null;
      }

      setSubscription(activeSub);

      const currentTier = activeSub?.price_id
        ? getTierByPriceId(activeSub.price_id)
        : 'free';

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData?.subscription_tier !== currentTier) {
        await supabase
          .from('user_profiles')
          .update({ subscription_tier: currentTier })
          .eq('id', user.id);
      }

      const usageData = await UsageService.getUsageData(user.id);
      setUsage(usageData);
      setTier(usageData.tier);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsage = async () => {
    if (!user) return;

    try {
      const usageData = await UsageService.getUsageData(user.id);
      setUsage(usageData);
      setTier(usageData.tier);
    } catch (error) {
      console.error('Error refreshing usage:', error);
    }
  };

  const refresh = async () => {
    await fetchSubscription();
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  return {
    subscription,
    tier,
    usage,
    loading,
    refresh,
    refreshUsage,
    hasActiveSubscription: subscription !== null,
    isFreeTier: tier === 'free',
    isLiteTier: tier === 'lite',
    isProTier: tier === 'pro',
  };
}