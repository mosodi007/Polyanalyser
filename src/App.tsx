import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MarketDetail } from './components/MarketDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { FilterBar } from './components/FilterBar';
import { DataSyncService } from './services/data-sync.service';
import { PolymarketService } from './services/polymarket.service';
import { Search, TrendingUp, DollarSign, Users, Sparkles } from 'lucide-react';

interface Market {
  id: string;
  title: string;
  description?: string;
  category?: string;
  current_price: number;
  volume?: number;
  liquidity?: number;
  close_time?: string;
  active?: boolean;
  closed?: boolean;
}

interface Analysis {
  id: string;
  market_id: string;
  ai_probability: number;
  market_probability: number;
  edge_percentage: number;
  confidence_score: number;
  recommendation: string;
  reasoning: string;
  research_data: any;
  risk_factors?: string[];
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [analyzingMarketId, setAnalyzingMarketId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<{ market: Market; analysis?: Analysis } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'closed'>('all');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    console.log('🔍 Starting search for:', searchQuery);
    setSearching(true);
    setError(null);
    setSearchResults([]);
    setSelectedCategory('all');
    setSelectedStatus('all');

    try {
      console.log('📞 Calling PolymarketService.searchMarkets...');
      const markets = await PolymarketService.searchMarkets(searchQuery);
      console.log('✅ Search returned', markets.length, 'markets');

      if (markets.length === 0) {
        console.warn('⚠️ No markets found');
        setError(`No markets found for "${searchQuery}". Try different keywords or check the exact market name on Polymarket.`);
      } else {
        console.log('🔄 Formatting markets...');
        const formattedMarkets: Market[] = markets.map(m => ({
          id: m.id,
          title: m.question,
          description: m.description,
          category: PolymarketService.getCategoryFromMarket(m),
          current_price: PolymarketService.extractYesPriceFromMarket(m),
          volume: parseFloat(m.volume || '0'),
          liquidity: parseFloat(m.liquidity || '0'),
          close_time: m.endDate,
          active: m.active,
          closed: m.closed,
        }));
        console.log('✅ Formatted', formattedMarkets.length, 'markets for display');
        setSearchResults(formattedMarkets);
      }
    } catch (err) {
      console.error('❌ Search error:', err);
      setError('Failed to search markets. Please try again.');
    } finally {
      setSearching(false);
      console.log('🏁 Search complete');
    }
  };

  const handleAnalyze = async (market: Market) => {
    setAnalyzingMarketId(market.id);
    setError(null);

    try {
      console.log('Fetching full market details...');
      const fullMarket = await PolymarketService.fetchMarketByConditionId(market.id);
      if (!fullMarket) {
        setError('Failed to fetch market details');
        return;
      }

      console.log('Starting AI analysis...');
      await DataSyncService.analyzeAndStoreMarket(fullMarket);

      console.log('Fetching stored analysis...');
      const { data, error: dbError } = await DataSyncService.getMarketAnalysis(market.id);

      if (dbError) {
        console.error('Database error:', dbError);
        setError(`Database error: ${dbError.message}`);
        return;
      }

      if (data) {
        console.log('Analysis found, displaying results');
        setSelectedMarket({ market, analysis: data });
      } else {
        console.warn('No analysis data returned from database');
        setError('Analysis completed but no results found. Check the browser console for details.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze market. Check the browser console for details.');
    } finally {
      setAnalyzingMarketId(null);
    }
  };

  const formatPrice = (price: number) => {
    return `${(price * 100).toFixed(1)}%`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`;
    }
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    searchResults.forEach((market) => {
      if (market.category) {
        uniqueCategories.add(market.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [searchResults]);

  const filteredResults = useMemo(() => {
    return searchResults.filter((market) => {
      const categoryMatch =
        selectedCategory === 'all' || market.category === selectedCategory;

      const statusMatch =
        selectedStatus === 'all' ||
        (selectedStatus === 'active' && market.active && !market.closed) ||
        (selectedStatus === 'closed' && market.closed);

      return categoryMatch && statusMatch;
    });
  }, [searchResults, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4 tracking-tight">
            AI-Powered Polymarket Analysis
          </h1>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto font-semibold px-4">
            Search prediction markets, get instant AI analysis, and make data-driven trading decisions on Polymarket with advanced market intelligence and probability assessments
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 sm:mb-12" role="search" aria-label="Search prediction markets">
          <div className="relative flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-black/40" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search markets..."
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 sm:py-5 text-base sm:text-lg glass-strong rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1552F0]/50 transition-all text-black placeholder-black/50"
                disabled={searching}
                aria-label="Search for prediction markets"
              />
            </div>
            <button
              type="submit"
              disabled={searching || !searchQuery.trim()}
              className="w-full sm:w-auto px-8 py-4 sm:py-5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit search"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {!searching && searchResults.length === 0 && !error && !searchQuery && (
          <div className="mb-8 sm:mb-12 p-6 sm:p-8 glass-strong rounded-2xl">
            <h3 className="text-sm font-medium text-black mb-3">Search Tips</h3>
            <ul className="text-sm text-black/70 space-y-2">
              <li>• Copy market titles from Polymarket for exact matches</li>
              <li>• Use specific keywords like "Starship Flight Test 12"</li>
              <li>• Search includes both active and closed markets</li>
            </ul>
          </div>
        )}

        {error && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 glass-strong rounded-2xl text-black border-red-500/30 text-sm sm:text-base">
            {error}
          </div>
        )}

        {searching && (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {!searching && searchResults.length > 0 && (
          <>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              resultCount={filteredResults.length}
            />

            {filteredResults.length === 0 ? (
              <div className="text-center py-8 sm:py-12 glass-strong rounded-2xl">
                <p className="text-black/60 text-base sm:text-lg">No markets match your filters</p>
                <p className="text-black/50 text-xs sm:text-sm mt-2">Try adjusting your filter settings</p>
              </div>
            ) : (
              <section className="space-y-3 sm:space-y-4" aria-label="Search results" role="region">
                {filteredResults.map((market) => (
              <article
                key={market.id}
                className="glass-white rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all"
                itemScope
                itemType="https://schema.org/Product"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {market.category && (
                        <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-medium glass text-black/70">
                          {market.category}
                        </span>
                      )}
                      {market.closed && (
                        <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-medium bg-red-500/20 text-black border border-red-500/30">
                          Closed
                        </span>
                      )}
                      {market.active && !market.closed && (
                        <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-black border border-emerald-500/30">
                          Active
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl lg:text-2xl font-normal text-black mb-2 sm:mb-3" itemProp="name">
                      {market.title}
                    </h2>

                    {market.description && (
                      <p className="text-sm sm:text-base text-black/60 mb-4 sm:mb-6 line-clamp-2" itemProp="description">
                        {market.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-black/50" />
                        <span className="font-medium text-black">
                          {formatPrice(market.current_price)}
                        </span>
                        <span className="text-black/50">Yes</span>
                      </div>

                      {market.volume && market.volume > 0 && (
                        <div className="flex items-center gap-2 text-black/60">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-light">{formatVolume(market.volume)} volume</span>
                        </div>
                      )}

                      {market.liquidity && market.liquidity > 0 && (
                        <div className="flex items-center gap-2 text-black/60">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{formatVolume(market.liquidity)} liquidity</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAnalyze(market)}
                    disabled={analyzingMarketId === market.id}
                    className="relative flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[140px] px-6 sm:px-8 py-3 sm:py-4 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg overflow-hidden"
                  >
                    {analyzingMarketId === market.id && (
                      <div className="absolute inset-0 bg-white/20">
                        <div className="h-full bg-white/30 animate-pulse" style={{ animation: 'progress 2s ease-in-out infinite' }}></div>
                      </div>
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {analyzingMarketId === market.id ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze'
                      )}
                    </span>
                  </button>
                </div>
              </article>
                ))}
              </section>
            )}
          </>
        )}

        {!searching && searchResults.length === 0 && !error && searchQuery && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 glass rounded-full mb-6">
              <Search className="w-10 h-10 text-black/40" />
            </div>
            <p className="text-black/60 text-lg">
              Enter a search term to find prediction markets
            </p>
          </div>
        )}
      </main>

      {selectedMarket && (
        <MarketDetail
          market={selectedMarket.market}
          analysis={selectedMarket.analysis}
          onClose={() => setSelectedMarket(null)}
        />
      )}
    </div>
  );
}

export default App;
