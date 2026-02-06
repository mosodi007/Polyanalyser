export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'subscription' | 'payment';
  interval?: 'month' | 'year';
  features: string[];
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_TvcNbhPpOpfG0E',
    priceId: 'price_1Sxl8xHJtj9hmvRftM9cClgJ',
    name: 'Polyanalyser Lite Monthly',
    description: 'Essential AI-powered market analysis for casual traders',
    price: 9.99,
    currency: 'usd',
    mode: 'subscription',
    interval: 'month',
    features: [
      'Basic AI market analysis',
      'Up to 10 markets per day',
      'Email alerts',
      'Basic performance tracking'
    ]
  },
  {
    id: 'prod_TvcRG9pESdAScE',
    priceId: 'price_1SxlCsHJtj9hmvRftE3jQIpY',
    name: 'Polyanalyser Lite Annually',
    description: 'Essential AI-powered market analysis for casual traders (Annual)',
    price: 95.90,
    currency: 'usd',
    mode: 'subscription',
    interval: 'year',
    features: [
      'Basic AI market analysis',
      'Up to 10 markets per day',
      'Email alerts',
      'Basic performance tracking',
      '2 months free vs monthly'
    ]
  },
  {
    id: 'prod_TvcOiGvFdJU34Y',
    priceId: 'price_1Sxl9qHJtj9hmvRfepiVyPpW',
    name: 'Polyanalyser Pro Monthly',
    description: 'Advanced AI analysis with premium features for serious traders',
    price: 49.00,
    currency: 'usd',
    mode: 'subscription',
    interval: 'month',
    features: [
      'Advanced AI market analysis',
      'Unlimited markets',
      'Real-time alerts',
      'Advanced performance tracking',
      'Portfolio optimization',
      'Priority support'
    ]
  },
  {
    id: 'prod_TvcTQuhGDcVLjW',
    priceId: 'price_1SxlE7HJtj9hmvRfTdZBX7pU',
    name: 'Polyanalyser Pro Annually',
    description: 'Advanced AI analysis with premium features for serious traders (Annual)',
    price: 470.00,
    currency: 'usd',
    mode: 'subscription',
    interval: 'year',
    features: [
      'Advanced AI market analysis',
      'Unlimited markets',
      'Real-time alerts',
      'Advanced performance tracking',
      'Portfolio optimization',
      'Priority support',
      '2 months free vs monthly'
    ]
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
}