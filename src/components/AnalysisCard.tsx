@@ .. @@
 import React, { useState } from 'react';
-import { Brain, TrendingUp, AlertTriangle, Clock, Target } from 'lucide-react';
+import { Brain, TrendingUp, AlertTriangle, Clock, Target, Lock } from 'lucide-react';
 import { generateAnalysis } from '../lib/openai';
 import { supabase } from '../lib/supabase';
 import { useAuth } from '../hooks/useAuth';
+import { useSubscription } from '../hooks/useSubscription';
+import { Link } from 'react-router-dom';
 import type { Market } from '../types/market';
 import type { Analysis } from '../types/analysis';
 
@@ .. @@
 export function AnalysisCard({ market }: AnalysisCardProps) {
   const [analysis, setAnalysis] = useState<Analysis | null>(null);
   const [loading, setLoading] = useState(false);
+  const [usageExceeded, setUsageExceeded] = useState(false);
   const { user } = useAuth();
+  const { subscription } = useSubscription();
 
   const handleAnalyze = async () => {
     if (!user) {
       alert('Please sign in to analyze markets');
       return;
     }
 
+    // Check usage limits
+    try {
+      const { data: usage } = await supabase.rpc('get_user_daily_usage', {
+        p_user_id: user.id
+      });
+
+      const { data: limit } = await supabase.rpc('get_user_tier_limit', {
+        p_user_id: user.id
+      });
+
+      if (limit !== -1 && usage >= limit) {
+        setUsageExceeded(true);
+        return;
+      }
+    } catch (error) {
+      console.error('Error checking usage:', error);
+    }
+
     setLoading(true);
     try {
       const aiAnalysis = await generateAnalysis(market);
@@ .. @@
         market_title: market.question,
         user_id: user.id
       });
 
+      // Increment usage count
+      await supabase.rpc('increment_user_usage', {
+        p_user_id: user.id
+      });
+
       if (error) throw error;
       setAnalysis(data);
     } catch (error) {
@@ .. @@
     }
   };
 
+  if (usageExceeded) {
+    return (
+      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
+        <div className="text-center py-8">
+          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
+          <h3 className="text-lg font-semibold text-gray-900 mb-2">
+            Daily Limit Reached
+          </h3>
+          <p className="text-gray-600 mb-4">
+            You've reached your daily analysis limit. Upgrade to continue analyzing markets.
+          </p>
+          <Link
+            to="/pricing"
+            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
+          >
+            Upgrade Plan
+          </Link>
+        </div>
+      </div>
+    );
+  }
+
   if (!analysis) {
     return (
       <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">