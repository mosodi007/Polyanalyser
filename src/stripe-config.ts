export type SubscriptionTier = 'free' | 'lite' | 'pro';

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
  tier: SubscriptionTier;
}

export interface TierLimits {
  tier: SubscriptionTier;
  dailyAnalyses: number;
  name: string;
  price: number;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_TviOtzZqPpeIMc',
    priceId: 'price_1SxqxqHJtj9hmvRfoeIrvHDC',
    name: 'Polyanalyser Lite Monthly',
    description: 'Essential AI-powered market analysis for casual traders',
    price: 9.99,
    currency: 'usd',
    mode: 'subscription',
    interval: 'month',
    tier: 'lite',
    features: [
      '50 AI analyses per day',
      'Basic AI market analysis',
      'Email alerts',
      'Basic performance tracking'
    ]
  },
  {
    id: 'prod_TviO1p9ZrGoOik',
    priceId: 'price_1SxqxiHJtj9hmvRfk91AktpL',
    name: 'Polyanalyser Lite Annually',
    description: 'Essential AI-powered market analysis for casual traders (Annual)',
    price: 95.90,
    currency: 'usd',
    mode: 'subscription',
    interval: 'year',
    tier: 'lite',
    features: [
      '50 AI analyses per day',
      'Basic AI market analysis',
      'Email alerts',
      'Basic performance tracking',
      '2 months free vs monthly'
    ]
  },
  {
    id: 'prod_TviOM1Q13sAsUv',
    priceId: 'price_1SxqxmHJtj9hmvRfHHkPAIFd',
    name: 'Polyanalyser Pro Monthly',
    description: 'Advanced AI analysis with premium features for serious traders',
    price: 49.00,
    currency: 'usd',
    mode: 'subscription',
    interval: 'month',
    tier: 'pro',
    features: [
      'Unlimited AI analyses',
      'Advanced AI market analysis',
      'Real-time alerts',
      'Advanced performance tracking',
      'Portfolio optimization',
      'Priority support'
    ]
  },
  {
    id: 'prod_TviORKHIPRGg67',
    priceId: 'price_1SxqxeHJtj9hmvRfSoD4q1o3',
    name: 'Polyanalyser Pro Annually',
    description: 'Advanced AI analysis with premium features for serious traders (Annual)',
    price: 470.00,
    currency: 'usd',
    mode: 'subscription',
    interval: 'year',
    tier: 'pro',
    features: [
      'Unlimited AI analyses',
      'Advanced AI market analysis',
      'Real-time alerts',
      'Advanced performance tracking',
      'Portfolio optimization',
      'Priority support',
      '2 months free vs monthly'
    ]
  }
];

export const tierLimits: Record<SubscriptionTier, TierLimits> = {
  free: {
    tier: 'free',
    dailyAnalyses: 5,
    name: 'Free',
    price: 0
  },
  lite: {
    tier: 'lite',
    dailyAnalyses: 50,
    name: 'Lite',
    price: 9.99
  },
  pro: {
    tier: 'pro',
    dailyAnalyses: -1, // -1 means unlimited
    name: 'Pro',
    price: 49.00
  }
};

export const freeTierFeatures = [
  '5 AI analyses per day',
  'Basic AI market analysis',
  'Email alerts',
  'Community support'
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getTierByPriceId(priceId: string): SubscriptionTier {
  const product = getProductByPriceId(priceId);
  return product?.tier || 'free';
}

export function getTierLimits(tier: SubscriptionTier): TierLimits {
  return tierLimits[tier];
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
}