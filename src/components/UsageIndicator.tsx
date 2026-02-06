import { Activity, Zap, TrendingUp } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { Link } from 'react-router-dom';
import { getTierLimits } from '../stripe-config';

export function UsageIndicator() {
  const { tier, usage, loading } = useSubscription();

  if (loading || !usage) {
    return null;
  }

  const tierInfo = getTierLimits(tier);
  const percentage = usage.isUnlimited
    ? 100
    : Math.round((usage.usedToday / usage.dailyLimit) * 100);

  const getProgressColor = () => {
    if (usage.isUnlimited) return 'bg-[#1552F0]';
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-[#1552F0]';
  };

  const getTierIcon = () => {
    switch (tier) {
      case 'pro':
        return <Zap className="w-4 h-4" />;
      case 'lite':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getTierBadgeColor = () => {
    switch (tier) {
      case 'pro':
        return 'bg-[#000]';
      case 'lite':
        return 'bg-[#1552F0]';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`${getTierBadgeColor()} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5`}>
            {getTierIcon()}
            {tierInfo.name}
          </div>
        </div>
        {tier === 'free' && usage.remainingToday <= 2 && (
          <Link
            to="/pricing"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Upgrade
          </Link>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Daily Analyses</span>
          <span className="font-semibold text-gray-900">
            {usage.isUnlimited ? (
              <>
                <span className="text-[#1552F0]">{usage.usedToday}</span> today
              </>
            ) : (
              <>
                <span className={usage.remainingToday === 0 ? 'text-red-600' : 'text-[#1552F0]'}>
                  {usage.usedToday}
                </span>
                <span className="text-gray-400"> / {usage.dailyLimit}</span>
              </>
            )}
          </span>
        </div>

        {!usage.isUnlimited && (
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        )}

        {!usage.isUnlimited && (
          <div className="text-xs text-gray-500 text-center">
            {usage.remainingToday > 0 ? (
              <span>{usage.remainingToday} analyses remaining today</span>
            ) : (
              <span className="text-red-600 font-medium">Daily limit reached</span>
            )}
          </div>
        )}

        {usage.isUnlimited && (
          <div className="text-xs text-center text-[#1552F0] font-medium">
            Unlimited analyses
          </div>
        )}
      </div>

      {!usage.canAnalyze && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <Link
            to="/pricing"
            className="block w-full bg-[#1552F0] text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-[#0d3cb8] transition-all"
          >
            Upgrade for More Analyses
          </Link>
        </div>
      )}
    </div>
  );
}
