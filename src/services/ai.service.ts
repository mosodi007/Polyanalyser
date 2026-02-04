import type { PolymarketMarket } from './polymarket.types';

export interface AIAnalysis {
  aiProbability: number;
  marketProbability: number;
  edgePercentage: number;
  confidenceScore: number;
  recommendation: 'Yes' | 'No' | 'Uncertain';
  reasoning: string;
  researchData: {
    sources: string[];
    keyFactors: string[];
    sentiment: string;
  };
  riskFactors: string[];
}

export class AIAnalysisService {
  private static OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  static async analyzeMarket(market: PolymarketMarket): Promise<AIAnalysis | null> {
    if (!this.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, using mock analysis');
      return this.generateMockAnalysis(market);
    }

    console.log('Starting AI analysis for market:', market.question);

    try {
      const marketPrice = parseFloat(market.outcomePrices?.[0] || '0.5');

      const prompt = this.buildAnalysisPrompt(market, marketPrice);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are an expert prediction market analyst. Analyze markets objectively and provide probability assessments based on available information, historical data, and logical reasoning. Return your analysis in JSON format.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        console.log('Falling back to mock analysis');
        return this.generateMockAnalysis(market);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const analysis = JSON.parse(content);

      console.log('AI analysis completed successfully');
      return this.formatAnalysis(analysis, marketPrice);
    } catch (error) {
      console.error('Error analyzing market:', error);
      console.log('Falling back to mock analysis');
      return this.generateMockAnalysis(market);
    }
  }

  private static buildAnalysisPrompt(market: PolymarketMarket, marketPrice: number): string {
    return `
Analyze this prediction market and provide a detailed assessment:

Market Question: ${market.question}
Description: ${market.description || 'No description provided'}
Current Market Price (YES): ${(marketPrice * 100).toFixed(2)}%
Category: ${market.category || 'Unknown'}
Volume: ${market.volume || 'Unknown'}

Please provide your analysis in the following JSON format:
{
  "aiProbability": <number between 0 and 1>,
  "confidenceScore": <number between 0 and 100>,
  "reasoning": "<detailed explanation of your assessment>",
  "keyFactors": ["<factor 1>", "<factor 2>", ...],
  "sentiment": "<positive/negative/neutral>",
  "riskFactors": ["<risk 1>", "<risk 2>", ...],
  "sources": ["<relevant source 1>", "<relevant source 2>", ...]
}

Consider:
1. Historical precedents and base rates
2. Current events and trends
3. Time horizon until resolution
4. Information quality and availability
5. Market efficiency and potential biases
6. External factors that could influence the outcome

Be objective and realistic. If you're uncertain, reflect that in your confidence score.
`;
  }

  private static formatAnalysis(rawAnalysis: any, marketPrice: number): AIAnalysis {
    const aiProbability = rawAnalysis.aiProbability || 0.5;

    if (isNaN(marketPrice) || marketPrice < 0 || marketPrice > 1) {
      console.warn('Invalid market price in formatAnalysis, using default 0.5');
      marketPrice = 0.5;
    }

    const edgePercentage = ((aiProbability - marketPrice) / marketPrice) * 100;

    let recommendation: AIAnalysis['recommendation'] = 'Uncertain';
    if (Math.abs(edgePercentage) < 5) {
      recommendation = 'Uncertain';
    } else if (edgePercentage > 10) {
      recommendation = 'Yes';
    } else if (edgePercentage < -10) {
      recommendation = 'No';
    }

    console.log('Formatted analysis:', {
      aiProbability,
      marketProbability: marketPrice,
      edgePercentage,
    });

    return {
      aiProbability,
      marketProbability: marketPrice,
      edgePercentage,
      confidenceScore: rawAnalysis.confidenceScore || 50,
      recommendation,
      reasoning: rawAnalysis.reasoning || 'Analysis unavailable',
      researchData: {
        keyFactors: rawAnalysis.keyFactors || [],
        sentiment: rawAnalysis.sentiment || 'neutral',
        sources: rawAnalysis.sources || [],
      },
      riskFactors: rawAnalysis.riskFactors || [],
    };
  }

  private static generateMockAnalysis(market: PolymarketMarket): AIAnalysis {
    let marketPrice = parseFloat(market.outcomePrices?.[0] || '0.5');

    if (isNaN(marketPrice) || marketPrice < 0 || marketPrice > 1) {
      console.warn('Invalid market price detected, using default 0.5');
      marketPrice = 0.5;
    }

    console.log('Generating mock analysis with market price:', marketPrice);

    const variance = (Math.random() - 0.5) * 0.2;
    const aiProbability = Math.max(0.1, Math.min(0.9, marketPrice + variance));
    const edgePercentage = ((aiProbability - marketPrice) / marketPrice) * 100;

    let recommendation: AIAnalysis['recommendation'] = 'Uncertain';
    if (Math.abs(edgePercentage) < 5) {
      recommendation = 'Uncertain';
    } else if (edgePercentage > 10) {
      recommendation = 'Yes';
    } else if (edgePercentage < -10) {
      recommendation = 'No';
    }

    return {
      aiProbability,
      marketProbability: marketPrice,
      edgePercentage,
      confidenceScore: Math.floor(Math.random() * 30) + 40,
      recommendation,
      reasoning: `Mock analysis for ${market.question}. Configure OpenAI API key for real AI analysis.`,
      researchData: {
        keyFactors: ['Historical data', 'Market trends', 'Current sentiment'],
        sentiment: 'neutral',
        sources: ['Mock data - configure OpenAI for real analysis'],
      },
      riskFactors: ['Limited data available', 'High uncertainty', 'Market volatility'],
    };
  }

  static async batchAnalyzeMarkets(markets: PolymarketMarket[]): Promise<Map<string, AIAnalysis>> {
    const analyses = new Map<string, AIAnalysis>();

    // Analyze markets in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < markets.length; i += batchSize) {
      const batch = markets.slice(i, i + batchSize);
      const batchPromises = batch.map(market =>
        this.analyzeMarket(market).then(analysis => ({
          id: market.id,
          analysis,
        }))
      );

      const results = await Promise.all(batchPromises);
      results.forEach(({ id, analysis }) => {
        if (analysis) {
          analyses.set(id, analysis);
        }
      });

      // Small delay between batches
      if (i + batchSize < markets.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return analyses;
  }
}
