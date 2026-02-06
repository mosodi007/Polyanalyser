import { supabase } from '../lib/supabase';
import { PolymarketService } from './polymarket.service';
import { AIAnalysisService } from './ai.service';
import type { PolymarketMarket } from './polymarket.types';

export class DataSyncService {
  static async analyzeAndStoreMarket(market: PolymarketMarket, userId: string): Promise<void> {
    try {
      console.log('Analyzing market:', market.question);
      console.log('Market data:', { id: market.id, outcomePrices: market.outcomePrices });

      const analysis = await AIAnalysisService.analyzeMarket(market);

      if (!analysis) {
        console.error('Analysis returned null');
        throw new Error('Failed to generate analysis');
      }

      console.log('Analysis result:', {
        aiProbability: analysis.aiProbability,
        marketProbability: analysis.marketProbability,
        edgePercentage: analysis.edgePercentage,
      });

      if (typeof analysis.aiProbability !== 'number' || isNaN(analysis.aiProbability)) {
        console.error('Invalid AI probability:', analysis.aiProbability);
        throw new Error('Invalid AI probability value');
      }

      if (typeof analysis.marketProbability !== 'number' || isNaN(analysis.marketProbability)) {
        console.error('Invalid market probability:', analysis.marketProbability);
        throw new Error('Invalid market probability value');
      }

      if (typeof analysis.edgePercentage !== 'number' || isNaN(analysis.edgePercentage)) {
        console.error('Invalid edge percentage:', analysis.edgePercentage);
        throw new Error('Invalid edge percentage value');
      }

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 6);

      const insertData = {
        market_id: market.id,
        market_title: market.question,
        user_id: userId,
        ai_probability: analysis.aiProbability,
        market_probability: analysis.marketProbability,
        edge_percentage: analysis.edgePercentage,
        confidence_score: analysis.confidenceScore,
        recommendation: analysis.recommendation,
        reasoning: analysis.reasoning,
        research_data: analysis.researchData,
        risk_factors: analysis.riskFactors,
        expires_at: expiresAt.toISOString(),
      };

      console.log('Inserting data into database:', insertData);

      const { data, error } = await supabase
        .from('ai_analyses')
        .insert(insertData)
        .select();

      if (error) {
        console.error('Database error storing analysis:', error);
        throw error;
      }

      console.log('Analysis stored successfully:', data);
    } catch (error) {
      console.error('Error in analyzeAndStoreMarket:', error);
      throw error;
    }
  }

  static async getMarketAnalysis(marketId: string): Promise<{ data: any | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('ai_analyses')
        .select('*')
        .eq('market_id', marketId)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      return { data, error };
    } catch (error) {
      console.error('Error fetching market analysis:', error);
      return { data: null, error };
    }
  }

  static async getRecentAnalyses(limit = 20): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('ai_analyses')
        .select('*')
        .gt('expires_at', new Date().toISOString())
        .order('confidence_score', { ascending: false })
        .order('edge_percentage', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching analyses:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRecentAnalyses:', error);
      return [];
    }
  }
}
