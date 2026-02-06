export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'subscription';
  interval: 'month' | 'year';
  tier: 'lite' | 'pro';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_TviOtzZqPpeIMc',
    priceId: 'price_1SxqxqHJtj9hmvRfoeIrvHDC',
    name: 'Polyanalyser Lite Monthly',
    description: 'Get 50 AI analyses per day with monthly billing',
    price: 9.99,
    currency: 'USD',
    mode: 'subscription',
    interval: 'month',
    tier: 'lite'
  },
  {
    id: 'prod_TviOM1Q13sAsUv',
    priceId: 'price_1SxqxmHJtj9hmvRfHHkPAIFd',
    name: 'Polyanalyser Pro Monthly',
    description: 'Get unlimited AI analyses with monthly billing',
    price: 49.00,
    currency: 'USD',
    mode: 'subscription',
    interval: 'month',
    tier: 'pro'
  },
  {
    id: 'prod_TviO1p9ZrGoOik',
    priceId: 'price_1SxqxiHJtj9hmvRfk91AktpL',
    name: 'Polyanalyser Lite Annually',
    description: 'Get 50 AI analyses per day with annual billing (2 months free)',
    price: 95.90,
    currency: 'USD',
    mode: 'subscription',
    interval: 'year',
    tier: 'lite'
  },
  {
    id: 'prod_TviORKHIPRGg67',
    priceId: 'price_1SxqxeHJtj9hmvRfSoD4q1o3',
    name: 'Polyanalyser Pro Annually',
    description: 'Get unlimited AI analyses with annual billing (2 months free)',
    price: 470.00,
    currency: 'USD',
    mode: 'subscription',
    interval: 'year',
    tier: 'pro'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};

export const getProductsByTier = (tier: 'lite' | 'pro'): StripeProduct[] => {
  return STRIPE_PRODUCTS.filter(product => product.tier === tier);
};