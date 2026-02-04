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

  const polymarketUrl = `https://polymarket.com`;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass-white border-b border-black/10 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
          <h2 className="text-2xl font-semibold text-black">Market Analysis</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {market.category && (
                <span className="text-xs font-medium px-4 py-1.5 glass text-black rounded-full">
                  {market.category}
                </span>
              )}
              {analysis && (
                <span
                  className={`text-sm font-medium px-4 py-1.5 rounded-full ${getRecommendationStyle(analysis.recommendation)}`}
                >
                  {analysis.recommendation}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-normal text-black mb-4">{market.title}</h3>
            {market.description && (
              <p className="text-black/70 leading-relaxed font-semibold">{market.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-black/60 font-medium mb-2">Market Price</p>
              <p className="text-4xl font-semibold text-black">{marketPercentage}%</p>
              <p className="text-xs text-black/50 mt-2 font-semibold">Current YES price</p>
            </div>

            {analysis && (
              <>
                <div className="glass rounded-2xl p-6">
                  <p className="text-sm text-black/60 font-medium mb-2">AI Probability</p>
                  <p className="text-4xl font-semibold text-black">
                    {(analysis.ai_probability * 100).toFixed(2)}%
                  </p>
                  <p className="text-xs text-black/50 mt-2 font-semibold">AI-assessed odds</p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <p className="text-sm text-black/60 font-medium mb-2">Edge</p>
                  <p className="text-4xl font-semibold text-black">
                    {analysis.edge_percentage > 0 ? '+' : ''}
                    {analysis.edge_percentage.toFixed(2)}%
                  </p>
                  <p className="text-xs text-black/50 mt-2 font-semibold">Confidence: {analysis.confidence_score.toFixed(0)}%</p>
                </div>
              </>
            )}
          </div>

          {analysis && (
            <>
              <div className="glass-strong rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-xl font-normal text-black">AI Analysis</h4>
                </div>
                <p className="text-black/80 leading-relaxed font-semibold">{analysis.reasoning}</p>
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-black/60 text-sm font-medium mb-3">AI Prediction</p>
                    <div className="flex items-center gap-4">
                      <span className={`text-5xl font-semibold ${
                        analysis.ai_probability >= 0.5 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {analysis.ai_probability >= 0.5 ? 'YES' : 'NO'}
                      </span>
                      <span className="text-3xl font-semibold text-black/70">
                        {(analysis.ai_probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-black/60 text-sm font-medium mb-3">Confidence Level</p>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-semibold text-[#1552F0]">
                        {Math.round(analysis.confidence_score)}
                      </span>
                      <span className="text-2xl text-black/50 pb-1 font-semibold">/100</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-black/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-black/60 font-semibold">Edge vs Market</span>
                    <span className={`font-medium text-lg ${
                      analysis.edge_percentage > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {analysis.edge_percentage > 0 ? '+' : ''}{analysis.edge_percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {analysis.research_data?.keyFactors && analysis.research_data.keyFactors.length > 0 && (
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-black" />
                    <h4 className="text-lg font-normal text-black">Key Factors</h4>
                  </div>
                  <ul className="space-y-3">
                    {analysis.research_data.keyFactors.map((factor: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-black/80">
                        <span className="text-black/40 mt-1">•</span>
                        <span className="font-semibold">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.risk_factors && analysis.risk_factors.length > 0 && (
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-black" />
                    <h4 className="text-lg font-normal text-black">Risk Factors</h4>
                  </div>
                  <ul className="space-y-3">
                    {analysis.risk_factors.map((risk: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-black/80">
                        <span className="text-amber-600 mt-1">⚠</span>
                        <span className="font-semibold">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <p className="text-black/60 mb-2 font-semibold text-sm">Volume</p>
              <p className="font-normal text-black text-xl">
                ${(market.volume || 0).toLocaleString()}
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="text-black/60 mb-2 font-semibold text-sm">Liquidity</p>
              <p className="font-normal text-black text-xl">
                ${(market.liquidity || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <a
            href={polymarketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-2xl transition-all shadow-lg"
          >
            <span>View on Polymarket</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
