import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Clock, Target, Lock } from 'lucide-react';
import { generateAnalysis } from '../lib/openai';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { Link } from 'react-router-dom';
import type { Market } from '../types/market';
import type { Analysis } from '../types/analysis';

interface AnalysisCardProps {
  market: Market;
}

export function AnalysisCard({ market }: AnalysisCardProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [usageExceeded, setUsageExceeded] = useState(false);
  const { user } = useAuth();
  const { subscription } = useSubscription();

  const handleAnalyze = async () => {
    if (!user) {
      alert('Please sign in to analyze markets');
      return;
    }

    // Check usage limits
    try {
      const { data: usage } = await supabase.rpc('get_user_daily_usage', {
        p_user_id: user.id
      });

      const { data: limit } = await supabase.rpc('get_user_tier_limit', {
        p_user_id: user.id
      });

      if (limit !== -1 && usage >= limit) {
        setUsageExceeded(true);
        return;
      }
    } catch (error) {
      console.error('Error checking usage:', error);
    }

    setLoading(true);
    try {
      const aiAnalysis = await generateAnalysis(market);
      
      const { data, error } = await supabase
        .from('analyses')
        .insert({
          ...aiAnalysis,
          market_id: market.id,
          market_title: market.question,
          user_id: user.id
        })
        .select()
        .single();

      // Increment usage count
      await supabase.rpc('increment_user_usage', {
        p_user_id: user.id
      });

      if (error) throw error;
      setAnalysis(data);
    } catch (error) {
      console.error('Error generating analysis:', error);
      alert('Failed to generate analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (usageExceeded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="text-center py-8">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Daily Limit Reached
          </h3>
          <p className="text-gray-600 mb-4">
            You've reached your daily analysis limit. Upgrade to continue analyzing markets.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="text-center py-8">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Market Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Get detailed insights and predictions for this market using advanced AI analysis.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Market
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-indigo-600" />
          AI Analysis
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {new Date(analysis.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            <span className="font-medium text-gray-900">Prediction</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            analysis.prediction === 'YES' 
              ? 'bg-green-100 text-green-800' 
              : analysis.prediction === 'NO'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {analysis.prediction}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            <span className="font-medium text-gray-900">Confidence</span>
          </div>
          <div className="flex items-center">
            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${analysis.confidence}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-900">{analysis.confidence}%</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Analysis Summary</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{analysis.reasoning}</p>
        </div>

        {analysis.risk_factors && analysis.risk_factors.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600" />
              Risk Factors
            </h4>
            <ul className="space-y-1">
              {analysis.risk_factors.map((risk, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.key_factors && analysis.key_factors.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Factors</h4>
            <ul className="space-y-1">
              {analysis.key_factors.map((factor, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}