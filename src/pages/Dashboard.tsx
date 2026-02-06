import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Clock, Target, BarChart3 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';
import { WatchlistCard } from '../components/WatchlistCard';
import type { WatchlistItem } from '../types/watchlist';

export function Dashboard() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { subscription } = useSubscription();

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      fetchUsageData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch watchlist
      const { data: watchlistData } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user?.id);

      // Fetch recent analyses
      const { data: analysesData } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setWatchlist(watchlistData || []);
      setRecentAnalyses(analysesData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsageData = async () => {
    try {
      const { data: usage } = await supabase.rpc('get_user_daily_usage', {
        p_user_id: user?.id
      });

      const { data: limit } = await supabase.rpc('get_user_tier_limit', {
        p_user_id: user?.id
      });

      setDailyUsage(usage || 0);
      setDailyLimit(limit || 5);
    } catch (error) {
      console.error('Error fetching usage data:', error);
    }
  };

  const removeFromWatchlist = async (marketId: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user?.id)
        .eq('market_id', marketId);

      if (error) throw error;

      setWatchlist(prev => prev.filter(item => item.market_id !== marketId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const getUsageColor = () => {
    const percentage = dailyLimit === -1 ? 0 : (dailyUsage / dailyLimit) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Monitor your watchlist and track your analysis history
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Watchlist Items</p>
                  <p className="text-2xl font-bold text-gray-900">{watchlist.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent Analyses</p>
                  <p className="text-2xl font-bold text-gray-900">{recentAnalyses.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BarChart3 className={`h-8 w-8 ${getUsageColor()}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Daily Usage</p>
                  <p className={`text-2xl font-bold ${getUsageColor()}`}>
                    {dailyUsage}{dailyLimit === -1 ? '' : `/${dailyLimit}`}
                  </p>
                  {dailyLimit !== -1 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          dailyUsage >= dailyLimit * 0.9 ? 'bg-red-500' :
                          dailyUsage >= dailyLimit * 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((dailyUsage / dailyLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Watchlist Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Watchlist</h2>
            {watchlist.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No items in your watchlist yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Add markets to your watchlist to track them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.map((item) => (
                  <WatchlistCard
                    key={item.id}
                    item={item}
                    onRemove={removeFromWatchlist}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Analyses Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Analyses</h2>
            {recentAnalyses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No analyses yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start analyzing markets to see your history here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {analysis.market_title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Analyzed on {new Date(analysis.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(analysis.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}