import { X, TrendingUp, AlertTriangle, ExternalLink, Brain } from 'lucide-react';

interface MarketDetailProps {
  market: {
    id: string;
    title: string;
    description?: string;
    category?: string;
    current_price: number;
    volume?: number;
    liquidity?: number;
    close_time?: string;
    event_slug?: string;
    slug?: string;
  };
  analysis?: {
    ai_probability: number;
    market_probability: number;
    edge_percentage: number;
    confidence_score: number;
    recommendation: string;
    reasoning: string;
    research_data: any;
    risk_factors?: string[];
  };
  onClose: () => void;
}

export function MarketDetail({ market, analysis, onClose }: MarketDetailProps) {
  const marketPercentage = (market.current_price * 100).toFixed(2);

  const getRecommendationStyle = (rec: string) => {
    switch (rec) {
      case 'Yes':
        return 'bg-emerald-500/20 text-black border border-emerald-500/30';
      case 'No':
        return 'bg-red-500/20 text-black border border-red-500/30';
      case 'Uncertain':
        return 'bg-amber-500/20 text-black border border-amber-500/30';
      default:
        return 'glass text-black';
    }
  };

  const polymarketUrl = market.event_slug
    ? `https://polymarket.com/event/${market.event_slug}`
    : market.slug
    ? `https://polymarket.com/event/${market.slug}`
    : `https://polymarket.com`;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="glass-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass-white border-b border-black/10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between z-10 rounded-t-2xl sm:rounded-t-3xl">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black">Market Analysis</h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-black/5 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {market.category && (
                <span className="text-xs font-medium px-3 sm:px-4 py-1 sm:py-1.5 glass text-black rounded-full">
                  {market.category}
                </span>
              )}
              {analysis && (
                <span
                  className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full ${getRecommendationStyle(analysis.recommendation)}`}
                >
                  {analysis.recommendation}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-black mb-3 sm:mb-4">{market.title}</h3>
            {market.description && (
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-semibold">{market.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-black/60 font-medium mb-1 sm:mb-2">Market Price</p>
              <p className="text-3xl sm:text-4xl font-semibold text-black">{marketPercentage}%</p>
              <p className="text-xs text-black/50 mt-1 sm:mt-2 font-semibold">Current YES price</p>
            </div>

            {analysis && (
              <>
                <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-black/60 font-medium mb-1 sm:mb-2">AI Probability</p>
                  <p className="text-3xl sm:text-4xl font-semibold text-black">
                    {(analysis.ai_probability * 100).toFixed(2)}%
                  </p>
                  <p className="text-xs text-black/50 mt-1 sm:mt-2 font-semibold">AI-assessed odds</p>
                </div>

                <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-black/60 font-medium mb-1 sm:mb-2">Edge</p>
                  <p className="text-3xl sm:text-4xl font-semibold text-black">
                    {analysis.edge_percentage > 0 ? '+' : ''}
                    {analysis.edge_percentage.toFixed(2)}%
                  </p>
                  <p className="text-xs text-black/50 mt-1 sm:mt-2 font-semibold">Confidence: {analysis.confidence_score.toFixed(0)}%</p>
                </div>
              </>
            )}
          </div>

          {analysis && (
            <>
              <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <h4 className="text-base sm:text-lg lg:text-xl font-normal text-black">AI Analysis</h4>
                </div>
                <p className="text-sm sm:text-base text-black/80 leading-relaxed font-semibold">{analysis.reasoning}</p>
              </div>

              <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-4 sm:mb-6">
                  <div>
                    <p className="text-black/60 text-xs sm:text-sm font-medium mb-2 sm:mb-3">AI Prediction</p>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`text-3xl sm:text-4xl lg:text-5xl font-semibold ${
                        analysis.ai_probability >= 0.5 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {analysis.ai_probability >= 0.5 ? 'YES' : 'NO'}
                      </span>
                      <span className="text-2xl sm:text-3xl font-semibold text-black/70">
                        {(analysis.ai_probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-black/60 text-xs sm:text-sm font-medium mb-2 sm:mb-3">Confidence Level</p>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1552F0]">
                        {Math.round(analysis.confidence_score)}
                      </span>
                      <span className="text-xl sm:text-2xl text-black/50 pb-0.5 sm:pb-1 font-semibold">/100</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-black/10">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-black/60 font-semibold">Edge vs Market</span>
                    <span className={`font-medium text-base sm:text-lg ${
                      analysis.edge_percentage > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {analysis.edge_percentage > 0 ? '+' : ''}{analysis.edge_percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {analysis.research_data?.keyFactors && analysis.research_data.keyFactors.length > 0 && (
                <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    <h4 className="text-base sm:text-lg font-normal text-black">Key Factors</h4>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {analysis.research_data.keyFactors.map((factor: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-black/80">
                        <span className="text-black/40 mt-1">•</span>
                        <span className="font-semibold">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.risk_factors && analysis.risk_factors.length > 0 && (
                <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    <h4 className="text-base sm:text-lg font-normal text-black">Risk Factors</h4>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {analysis.risk_factors.map((risk: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-black/80">
                        <span className="text-amber-600 mt-1">⚠</span>
                        <span className="font-semibold">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-black/60 mb-1 sm:mb-2 font-semibold text-xs sm:text-sm">Volume</p>
              <p className="font-normal text-black text-base sm:text-lg lg:text-xl">
                ${(market.volume || 0).toLocaleString()}
              </p>
            </div>
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-black/60 mb-1 sm:mb-2 font-semibold text-xs sm:text-sm">Liquidity</p>
              <p className="font-normal text-black text-base sm:text-lg lg:text-xl">
                ${(market.liquidity || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <a
            href={polymarketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 sm:gap-3 w-full py-3 sm:py-4 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-xl sm:rounded-2xl transition-all shadow-lg text-sm sm:text-base"
          >
            <span>View on Polymarket</span>
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
