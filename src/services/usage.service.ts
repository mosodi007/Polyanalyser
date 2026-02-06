import { supabase } from '../lib/supabase';
import { SubscriptionTier, getTierLimits } from '../stripe-config';

export interface UsageData {
  tier: SubscriptionTier;
  dailyLimit: number;
  usedToday: number;
  remainingToday: number;
  isUnlimited: boolean;
  canAnalyze: boolean;
}

export class UsageService {
  static async getUserTier(userId: string): Promise<SubscriptionTier> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) throw profileError;

      const tier = (profile?.subscription_tier as SubscriptionTier) || 'free';
      return tier;
    } catch (error) {
      console.error('Error fetching user tier:', error);
      return 'free';
    }
  }

  static async getDailyUsage(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_daily_usage', { p_user_id: userId });

      if (error) throw error;

      return data || 0;
    } catch (error) {
      console.error('Error fetching daily usage:', error);
      return 0;
    }
  }

  static async incrementUsage(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .rpc('increment_user_usage', { p_user_id: userId });

      if (error) throw error;

      return data || 0;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      throw error;
    }
  }

  static async getUsageData(userId: string): Promise<UsageData> {
    try {
      const [tier, usedToday] = await Promise.all([
        this.getUserTier(userId),
        this.getDailyUsage(userId)
      ]);

      const limits = getTierLimits(tier);
      const dailyLimit = limits.dailyAnalyses;
      const isUnlimited = dailyLimit === -1;
      const remainingToday = isUnlimited ? -1 : Math.max(0, dailyLimit - usedToday);
      const canAnalyze = isUnlimited || usedToday < dailyLimit;

      return {
        tier,
        dailyLimit,
        usedToday,
        remainingToday,
        isUnlimited,
        canAnalyze
      };
    } catch (error) {
      console.error('Error fetching usage data:', error);
      return {
        tier: 'free',
        dailyLimit: 5,
        usedToday: 0,
        remainingToday: 5,
        isUnlimited: false,
        canAnalyze: true
      };
    }
  }

  static async checkCanAnalyze(userId: string): Promise<{ canAnalyze: boolean; message?: string; usage?: UsageData }> {
    try {
      const usage = await this.getUsageData(userId);

      if (!usage.canAnalyze) {
        const tierName = getTierLimits(usage.tier).name;
        return {
          canAnalyze: false,
          message: `You've reached your daily limit of ${usage.dailyLimit} analyses on the ${tierName} plan. Upgrade to analyze more markets!`,
          usage
        };
      }

      return { canAnalyze: true, usage };
    } catch (error) {
      console.error('Error checking usage:', error);
      return {
        canAnalyze: false,
        message: 'Unable to verify usage limits. Please try again.'
      };
    }
  }

  static formatUsageDisplay(usage: UsageData): string {
    if (usage.isUnlimited) {
      return `${usage.usedToday} analyses today`;
    }
    return `${usage.usedToday} of ${usage.dailyLimit} analyses used today`;
  }
}
