import { TrendingUp, TrendingDown, Clock, BarChart3, ExternalLink } from 'lucide-react';

interface MarketCardProps {
  market: {
    id: string;
    title: string;
    description?: string;
    category?: string;
    current_price: number;
    volume?: number;
    close_time?: string;
  };
  analysis?: {
    ai_probability: number;
    edge_percentage: number;
    confidence_score: number;
    recommendation: string;
    reasoning: string;
  };
  onClick?: () => void;
}

export function MarketCard({ market, analysis, onClick }: MarketCardProps) {
  const marketPrice = market.current_price || 0.5;
  const marketPercentage = (marketPrice * 100).toFixed(1);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Yes':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'No':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Uncertain':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getEdgeColor = (edge: number) => {
    if (edge > 15) return 'text-emerald-600';
    if (edge > 5) return 'text-emerald-500';
    if (edge < -15) return 'text-red-600';
    if (edge < -5) return 'text-red-500';
    return 'text-slate-600';
  };

  const formatVolume = (vol?: number) => {
    if (!vol) return 'N/A';
    if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}M`;
    if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`;
    return `$${vol.toFixed(0)}`;
  };

  const formatTimeRemaining = (closeTime?: string) => {
    if (!closeTime) return 'Unknown';
    const now = new Date();
    const close = new Date(closeTime);
    const diff = close.getTime() - now.getTime();

    if (diff < 0) return 'Closed';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {market.category && (
              <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-700 rounded">
                {market.category}
              </span>
            )}
            {analysis && (
              <span
                className={`text-xs font-semibold px-2 py-1 rounded border ${getRecommendationColor(analysis.recommendation)}`}
              >
                {analysis.recommendation}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {market.title}
          </h3>
        </div>
      </div>

      {market.description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {market.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Market Price</p>
          <p className="text-2xl font-bold text-slate-900">{marketPercentage}%</p>
        </div>
        {analysis && (
          <div>
            <p className="text-xs text-slate-500 mb-1">AI Probability</p>
            <p className="text-2xl font-bold text-slate-900">
              {(analysis.ai_probability * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>

      {analysis && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-600">Edge</span>
            <span className={`text-sm font-bold ${getEdgeColor(analysis.edge_percentage)}`}>
              {analysis.edge_percentage > 0 ? '+' : ''}
              {analysis.edge_percentage.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Confidence</span>
            <span className="text-sm font-semibold text-slate-900">
              {analysis.confidence_score.toFixed(0)}%
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <BarChart3 className="w-3 h-3" />
          <span>{formatVolume(market.volume)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatTimeRemaining(market.close_time)}</span>
        </div>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
