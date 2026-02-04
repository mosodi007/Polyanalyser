export interface PolymarketMarket {
  id: string;
  question: string;
  description?: string;
  outcomes: string[];
  outcomePrices: string[];
  volume: string;
  active: boolean;
  closed: boolean;
  archived: boolean;
  new: boolean;
  featured: boolean;
  submitted_by: string;
  resolvedBy?: string;
  slug?: string;
  liquidity?: string;
  volume24hr?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  icon?: string;
  category?: string;
  tags?: string[];
  enableOrderBook?: boolean;
  orderPriceMinTickSize?: number;
  orderMinSize?: number;
  competitive?: number;
  groupItemTitle?: string;
  groupItemThreshold?: string;
  questionID?: string;
  marketType?: string;
  clobTokenIds?: string[];
  clearBookOnClose?: boolean;
  acceptingOrders?: boolean;
  spread?: number;
  bestBid?: string;
  bestAsk?: string;
}

export interface PolymarketEvent {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  creationDate?: string;
  markets: PolymarketMarket[];
  tags?: string[];
  category?: string;
  image?: string;
  icon?: string;
  enableOrderBook?: boolean;
  liquidity?: string;
  volume?: string;
}

export interface PolymarketPrice {
  market: string;
  price: number;
  timestamp: number;
}

export interface OrderbookSummary {
  market: string;
  asset_id: string;
  hash: string;
  bids: Array<{ price: string; size: string }>;
  asks: Array<{ price: string; size: string }>;
  spread?: number;
  timestamp: number;
}

export interface MarketPrice {
  token_id: string;
  price: number;
  timestamp?: number;
}
