export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      markets: {
        Row: {
          id: string
          slug: string | null
          title: string
          description: string | null
          category: string | null
          close_time: string | null
          end_date: string | null
          current_price: number | null
          volume: number | null
          liquidity: number | null
          tags: Json
          metadata: Json
          active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          slug?: string | null
          title: string
          description?: string | null
          category?: string | null
          close_time?: string | null
          end_date?: string | null
          current_price?: number | null
          volume?: number | null
          liquidity?: number | null
          tags?: Json
          metadata?: Json
          active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string | null
          title?: string
          description?: string | null
          category?: string | null
          close_time?: string | null
          end_date?: string | null
          current_price?: number | null
          volume?: number | null
          liquidity?: number | null
          tags?: Json
          metadata?: Json
          active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      market_prices: {
        Row: {
          id: string
          market_id: string
          price: number
          bid: number | null
          ask: number | null
          spread: number | null
          timestamp: string
          created_at: string | null
        }
        Insert: {
          id?: string
          market_id: string
          price: number
          bid?: number | null
          ask?: number | null
          spread?: number | null
          timestamp?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          market_id?: string
          price?: number
          bid?: number | null
          ask?: number | null
          spread?: number | null
          timestamp?: string
          created_at?: string | null
        }
      }
      ai_analyses: {
        Row: {
          id: string
          market_id: string
          ai_probability: number
          market_probability: number
          edge_percentage: number
          confidence_score: number | null
          recommendation: string | null
          reasoning: string
          research_data: Json
          risk_factors: string[] | null
          created_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          market_id: string
          ai_probability: number
          market_probability: number
          edge_percentage: number
          confidence_score?: number | null
          recommendation?: string | null
          reasoning: string
          research_data?: Json
          risk_factors?: string[] | null
          created_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          market_id?: string
          ai_probability?: number
          market_probability?: number
          edge_percentage?: number
          confidence_score?: number | null
          recommendation?: string | null
          reasoning?: string
          research_data?: Json
          risk_factors?: string[] | null
          created_at?: string | null
          expires_at?: string | null
        }
      }
      user_watchlist: {
        Row: {
          id: string
          user_id: string
          market_id: string
          notes: string | null
          alert_threshold: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          market_id: string
          notes?: string | null
          alert_threshold?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          market_id?: string
          notes?: string | null
          alert_threshold?: number | null
          created_at?: string | null
        }
      }
      analysis_performance: {
        Row: {
          id: string
          analysis_id: string | null
          market_id: string
          predicted_outcome: string | null
          actual_outcome: string | null
          prediction_correct: boolean | null
          profit_loss: number | null
          resolution_date: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          analysis_id?: string | null
          market_id: string
          predicted_outcome?: string | null
          actual_outcome?: string | null
          prediction_correct?: boolean | null
          profit_loss?: number | null
          resolution_date?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          analysis_id?: string | null
          market_id?: string
          predicted_outcome?: string | null
          actual_outcome?: string | null
          prediction_correct?: boolean | null
          profit_loss?: number | null
          resolution_date?: string | null
          created_at?: string | null
        }
      }
    }
  }
}
