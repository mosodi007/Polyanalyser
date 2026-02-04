import type { PolymarketMarket, OrderbookSummary, MarketPrice } from './polymarket.types';

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/polymarket-proxy`;

export class PolymarketService {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_DURATION = 30000; // 30 seconds

  private static getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T;
    }
    return null;
  }

  private static setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static async fetchMarkets(params?: {
    limit?: number;
    offset?: number;
    active?: boolean;
    closed?: boolean;
    archived?: boolean;
  }): Promise<PolymarketMarket[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('limit', (params?.limit || 50).toString());
      if (params?.offset) queryParams.set('offset', params.offset.toString());
      queryParams.set('closed', 'false');
      queryParams.set('order', 'id');
      queryParams.set('ascending', 'false');

      const cacheKey = `events:${queryParams.toString()}`;
      const cached = this.getCached<PolymarketMarket[]>(cacheKey);
      if (cached) {
        console.log('Returning cached markets, count:', cached.length);
        return cached;
      }

      console.log('🔄 Fetching markets from API...');
      console.log('📊 Query params:', queryParams.toString());
      console.log('🌐 Edge function URL:', EDGE_FUNCTION_URL);

      const url = `${EDGE_FUNCTION_URL}?endpoint=events&params=${encodeURIComponent(queryParams.toString())}`;
      console.log('📡 Full URL:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }

      const events = await response.json();
      console.log('📦 Received response type:', Array.isArray(events) ? 'array' : typeof events);
      console.log('📦 Events count:', Array.isArray(events) ? events.length : 'N/A');

      if (Array.isArray(events) && events.length > 0) {
        console.log('📝 Sample event:', {
          id: events[0].id,
          title: events[0].title,
          marketsCount: events[0].markets?.length || 0,
        });
      }

      const markets: PolymarketMarket[] = [];
      for (const event of events) {
        if (event.markets && Array.isArray(event.markets)) {
          for (const market of event.markets) {
            markets.push({
              ...market,
              event_slug: event.slug,
              event_title: event.title,
            });
          }
        }
      }

      console.log('Extracted markets from events, count:', markets.length);
      this.setCache(cacheKey, markets);

      return markets;
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  }

  static async fetchMarketByConditionId(conditionId: string): Promise<PolymarketMarket | null> {
    try {
      const cacheKey = `market:${conditionId}`;
      const cached = this.getCached<PolymarketMarket>(cacheKey);
      if (cached) {
        console.log('Returning cached market:', cached.question);
        return cached;
      }

      console.log('Fetching fresh market data for:', conditionId);
      const url = `${EDGE_FUNCTION_URL}?endpoint=market&id=${encodeURIComponent(conditionId)}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Market fetch error:', errorText);
        throw new Error(`Failed to fetch market: ${response.statusText}`);
      }

      const market: PolymarketMarket = await response.json();
      console.log('Fetched market from API:', {
        id: market.id,
        question: market.question,
        outcomePrices: market.outcomePrices,
        bestBid: market.bestBid,
        bestAsk: market.bestAsk,
        clobTokenIds: market.clobTokenIds,
      });

      if (!market.outcomePrices || market.outcomePrices.length === 0) {
        console.warn('Market has no outcomePrices, attempting to fetch from orderbook');
        if (market.clobTokenIds && market.clobTokenIds.length > 0) {
          const orderbook = await this.fetchOrderbook(market.clobTokenIds[0]);
          if (orderbook && orderbook.bids.length > 0 && orderbook.asks.length > 0) {
            const bestBid = parseFloat(orderbook.bids[0].price);
            const bestAsk = parseFloat(orderbook.asks[0].price);
            const midPrice = (bestBid + bestAsk) / 2;
            market.outcomePrices = [midPrice.toString()];
            market.bestBid = bestBid.toString();
            market.bestAsk = bestAsk.toString();
            console.log('Updated market with orderbook data:', {
              midPrice,
              bestBid,
              bestAsk,
            });
          }
        }
      }

      this.setCache(cacheKey, market);

      return market;
    } catch (error) {
      console.error('Error fetching market:', error);
      return null;
    }
  }

  static async fetchOrderbook(tokenId: string): Promise<OrderbookSummary | null> {
    try {
      const url = `${EDGE_FUNCTION_URL}?endpoint=orderbook&token_id=${encodeURIComponent(tokenId)}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orderbook: ${response.statusText}`);
      }

      const orderbook: OrderbookSummary = await response.json();

      // Calculate spread if bids and asks exist
      if (orderbook.bids.length > 0 && orderbook.asks.length > 0) {
        const bestBid = parseFloat(orderbook.bids[0].price);
        const bestAsk = parseFloat(orderbook.asks[0].price);
        orderbook.spread = bestAsk - bestBid;
      }

      return orderbook;
    } catch (error) {
      console.error('Error fetching orderbook:', error);
      return null;
    }
  }

  static async fetchMarketPrices(tokenIds: string[]): Promise<MarketPrice[]> {
    try {
      const prices: MarketPrice[] = [];

      for (const tokenId of tokenIds) {
        const orderbook = await this.fetchOrderbook(tokenId);
        if (orderbook && orderbook.bids.length > 0 && orderbook.asks.length > 0) {
          const bestBid = parseFloat(orderbook.bids[0].price);
          const bestAsk = parseFloat(orderbook.asks[0].price);
          const midPrice = (bestBid + bestAsk) / 2;

          prices.push({
            token_id: tokenId,
            price: midPrice,
            timestamp: Date.now(),
          });
        }
      }

      return prices;
    } catch (error) {
      console.error('Error fetching market prices:', error);
      return [];
    }
  }

  static async searchMarkets(query: string): Promise<PolymarketMarket[]> {
    try {
      console.log('🔍 Searching markets for query:', query);
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        console.warn('⚠️ Empty search query');
        return [];
      }

      // Use the text-based search API endpoint
      const cacheKey = `search:${trimmedQuery.toLowerCase()}`;
      const cached = this.getCached<PolymarketMarket[]>(cacheKey);
      if (cached) {
        console.log('✅ Returning cached search results, count:', cached.length);
        return cached;
      }

      const queryParams = new URLSearchParams();
      queryParams.set('q', trimmedQuery);
      queryParams.set('limit_per_type', '50');
      queryParams.set('keep_closed_markets', '1');

      const url = `${EDGE_FUNCTION_URL}?endpoint=search&${queryParams.toString()}`;
      console.log('📡 Searching via:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Search API error:', response.status, errorText);
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const searchResults = await response.json();
      console.log('📦 Search API response structure:', {
        hasEvents: !!searchResults.events,
        eventsCount: searchResults.events?.length || 0,
        hasTags: !!searchResults.tags,
        hasProfiles: !!searchResults.profiles,
      });

      // Extract markets from events
      const markets: PolymarketMarket[] = [];
      if (searchResults.events && Array.isArray(searchResults.events)) {
        for (const event of searchResults.events) {
          if (event.markets && Array.isArray(event.markets)) {
            for (const market of event.markets) {
              markets.push({
                ...market,
                event_slug: event.slug,
                event_title: event.title,
              });
            }
          }
        }
      }

      console.log(`✅ Search found ${markets.length} markets`);

      // Cache the results
      this.setCache(cacheKey, markets);

      return markets;
    } catch (error) {
      console.error('❌ Error searching markets:', error);
      return [];
    }
  }

  static extractYesPriceFromMarket(market: PolymarketMarket): number {
    try {
      console.log('Extracting price from market:', {
        question: market.question,
        outcomePrices: market.outcomePrices,
        bestBid: market.bestBid,
        bestAsk: market.bestAsk,
      });

      if (market.outcomePrices && market.outcomePrices.length > 0) {
        const price = parseFloat(market.outcomePrices[0]);
        if (!isNaN(price) && price >= 0 && price <= 1) {
          console.log('Using outcomePrices[0]:', price);
          return price;
        }
      }

      if (market.bestBid && market.bestAsk) {
        const bid = parseFloat(market.bestBid);
        const ask = parseFloat(market.bestAsk);
        if (!isNaN(bid) && !isNaN(ask)) {
          const midPrice = (bid + ask) / 2;
          if (midPrice >= 0 && midPrice <= 1) {
            console.log('Using mid price from bid/ask:', midPrice);
            return midPrice;
          }
        }
      }

      console.warn('No valid price found, using default 0.5');
      return 0.5;
    } catch (error) {
      console.error('Error extracting price:', error);
      return 0.5;
    }
  }

  static getCategoryFromMarket(market: PolymarketMarket): string {
    if (market.category) return market.category;

    // Try to infer category from tags or question
    const question = market.question.toLowerCase();
    if (question.includes('trump') || question.includes('biden') ||
        question.includes('election') || question.includes('president')) {
      return 'Politics';
    }
    if (question.includes('bitcoin') || question.includes('crypto') ||
        question.includes('eth')) {
      return 'Crypto';
    }
    if (question.includes('sports') || question.includes('nfl') ||
        question.includes('nba')) {
      return 'Sports';
    }

    return 'Other';
  }
}
