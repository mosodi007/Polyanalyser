import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { User } from '@supabase/supabase-js';

interface HistoryPageProps {
  user?: User | null;
}

interface AnalysisHistory {
  id: string;
  market_id: string;
  market_title: string;
  recommendation: string;
  confidence_score: number;
  edge_percentage: number;
  created_at: string;
}

export function HistoryPage({ user }: HistoryPageProps) {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchHistory();
  }, [user, navigate]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('ai_analyses')
        .select('id, market_id, market_title, recommendation, confidence_score, edge_percentage, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;

      setHistory(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toUpperCase()) {
      case 'YES':
        return 'text-emerald-600 bg-emerald-50';
      case 'NO':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-amber-600 bg-amber-50';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation.toUpperCase()) {
      case 'YES':
        return <TrendingUp className="w-4 h-4" />;
      case 'NO':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Analysis History</h1>
          <p className="text-black/60">View your past market analyses</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-black/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">No Analysis Yet</h3>
            <p className="text-black/60 mb-6">
              Start analyzing markets to see your history here
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-xl transition-colors"
            >
              Explore Markets
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/search?q=${encodeURIComponent(item.market_title || '')}`)}
                className="w-full glass-white hover:shadow-lg transition-all rounded-xl p-5 border border-black/5 text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-black mb-2 line-clamp-2 group-hover:text-[#1552F0] transition-colors">
                      {item.market_title || 'Untitled Market'}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium ${getRecommendationColor(
                          item.recommendation
                        )}`}
                      >
                        {getRecommendationIcon(item.recommendation)}
                        {item.recommendation}
                      </span>

                      <span className="text-black/50">
                        Confidence: {Math.round(item.confidence_score)}%
                      </span>

                      {item.edge_percentage !== 0 && (
                        <span
                          className={`font-medium ${
                            item.edge_percentage > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {item.edge_percentage > 0 ? '+' : ''}
                          {item.edge_percentage.toFixed(1)}% edge
                        </span>
                      )}

                      <span className="text-black/40 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-black/30 group-hover:text-[#1552F0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
