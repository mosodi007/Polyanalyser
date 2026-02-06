import React, { useEffect, useState } from 'react';
import { Crown, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export function SubscriptionBadge() {
  const [tier, setTier] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserTier();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserTier = async () => {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('id', user?.id)
        .single();
      
      if (data) {
        setTier(data.subscription_tier);
      }
    } catch (error) {
      console.error('Error fetching user tier:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return null;
  }

  const getBadgeConfig = () => {
    switch (tier) {
      case 'lite':
        return {
          icon: Zap,
          text: 'Lite',
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'pro':
        return {
          icon: Crown,
          text: 'Pro',
          className: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      default:
        return {
          icon: null,
          text: 'Free',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {config.text}
    </div>
  );
}