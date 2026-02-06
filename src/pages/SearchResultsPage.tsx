import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, DollarSign, Users, Sparkles, ChevronLeft } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MarketDetail } from '../components/MarketDetail';
import { DataSyncService } from '../services/data-sync.service';
import { PolymarketService } from '../services/polymarket.service';
import type { User } from '@supabase/supabase-js';

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

interface SearchResultsPageProps {
  user?: User | null;
  onLoginClick?: () => void;
}

export function SearchResultsPage({ user, onLoginClick }: SearchResultsPageProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const statusParam = searchParams.get('status') || 'all';

  const [searchQuery, setSearchQuery] = useState(query);
  const [searching, setSearching] = useState(false);
  const [analyzingMarketId, setAnalyzingMarketId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<{ market: Market; analysis?: Analysis } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'closed'>(statusParam as any);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setSearching(true);
    setError(null);
    setSearchResults([]);

    try {
      const markets = await PolymarketService.searchMarkets(searchTerm);

      if (markets.length === 0) {
        setError(`No markets found for "${searchTerm}".`);
      } else {
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
        setSearchResults(formattedMarkets);
      }
    } catch (err) {
      setError('Failed to search markets. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAnalyze = async (market: Market) => {
    if (!user) {
      onLoginClick?.();
      return;
    }

    setAnalyzingMarketId(market.id);
    setError(null);

    try {
      const fullMarket = await PolymarketService.fetchMarketByConditionId(market.id);
      if (!fullMarket) {
        setError('Failed to fetch market details');
        return;
      }

      await DataSyncService.analyzeAndStoreMarket(fullMarket);
      const { data, error: dbError } = await DataSyncService.getMarketAnalysis(market.id);

      if (dbError) {
        setError(`Database error: ${dbError.message}`);
        return;
      }

      if (data) {
        setSelectedMarket({ market, analysis: data });
      } else {
        setError('Analysis completed but no results found.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze market.');
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

  const updateFilters = (category: string, status: string) => {
    const params = new URLSearchParams();
    params.set('q', query);
    if (category !== 'all') params.set('category', category);
    if (status !== 'all') params.set('status', status);
    navigate(`/search?${params.toString()}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-black/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-black hover:text-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <img
                src="/polyanalyser.png"
                alt="PolyAnalyser"
                className="w-6 h-6"
              />
              <span className="text-xl font-bold">PolyAnalyser</span>
            </button>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-black/40" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search prediction markets..."
                  className="w-full pl-12 pr-4 py-2.5 text-sm bg-white rounded-full border border-black/20 hover:border-black/30 focus:border-[#1552F0] focus:outline-none focus:shadow-md transition-all text-black placeholder-black/40"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {!searching && searchResults.length > 0 && categories.length > 0 && (
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24">
                <h3 className="text-sm font-medium text-black/70 mb-3 px-3">Filters</h3>

                <div className="mb-6">
                  <h4 className="text-xs font-medium text-black/50 mb-2 px-3 uppercase tracking-wide">Status</h4>
                  <div className="space-y-1">
                    {(['all', 'active', 'closed'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          updateFilters(selectedCategory, status);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedStatus === status
                            ? 'bg-[#1552F0]/10 text-[#1552F0] font-medium'
                            : 'text-black/70 hover:bg-black/5'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-black/50 mb-2 px-3 uppercase tracking-wide">Category</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        updateFilters('all', selectedStatus);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-[#1552F0]/10 text-[#1552F0] font-medium'
                          : 'text-black/70 hover:bg-black/5'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          updateFilters(category, selectedStatus);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#1552F0]/10 text-[#1552F0] font-medium'
                            : 'text-black/70 hover:bg-black/5'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          <main className="flex-1">
            {!searching && searchResults.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-black/60">
                  About {filteredResults.length.toLocaleString()} results for <span className="font-medium">"{query}"</span>
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-black/80 border border-red-100 text-sm">
                {error}
              </div>
            )}

            {searching && (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            )}

            {!searching && filteredResults.length > 0 && (
              <div className="space-y-6">
                {filteredResults.map((market) => (
                  <article
                    key={market.id}
                    className="bg-white rounded-lg p-5 hover:shadow-md transition-shadow border border-black/5"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {market.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-black/5 text-black/60">
                          {market.category}
                        </span>
                      )}
                      {market.closed && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                          Closed
                        </span>
                      )}
                      {market.active && !market.closed && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-2 font-normal">
                      {market.title}
                    </h2>

                    {market.description && (
                      <p className="text-sm text-black/70 mb-3 line-clamp-2">
                        {market.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-black/60">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span className="font-medium text-black">{formatPrice(market.current_price)}</span>
                          <span>Yes</span>
                        </div>

                        {market.volume && market.volume > 0 && (
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>{formatVolume(market.volume)} vol</span>
                          </div>
                        )}

                        {market.liquidity && market.liquidity > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span>{formatVolume(market.liquidity)} liq</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleAnalyze(market)}
                        disabled={analyzingMarketId === market.id}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1552F0] hover:bg-[#0f3ec4] text-white text-sm font-medium rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {analyzingMarketId === market.id ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Analyze'
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!searching && searchResults.length > 0 && filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-black/60 text-base">No markets match your filters</p>
                <p className="text-black/50 text-sm mt-2">Try adjusting your filter settings</p>
              </div>
            )}

            {!searching && searchResults.length === 0 && !error && (
              <div className="text-center py-20">
                <p className="text-black/60 text-lg">
                  No results found for "{query}"
                </p>
                <p className="text-black/50 text-sm mt-2">
                  Try different keywords or check the spelling
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

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
