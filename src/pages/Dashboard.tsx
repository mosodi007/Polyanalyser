@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { TrendingUp, Eye, Clock, Target } from 'lucide-react';
+import { TrendingUp, Eye, Clock, Target, BarChart3 } from 'lucide-react';
 import { useAuth } from '../hooks/useAuth';
+import { useSubscription } from '../hooks/useSubscription';
 import { supabase } from '../lib/supabase';
 import { WatchlistCard } from '../components/WatchlistCard';
 import type { WatchlistItem } from '../types/watchlist';
@@ .. @@
 export function Dashboard() {
   const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
   const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
+  const [dailyUsage, setDailyUsage] = useState(0);
+  const [dailyLimit, setDailyLimit] = useState(5);
   const [loading, setLoading] = useState(true);
   const { user } = useAuth();
+  const { subscription } = useSubscription();
 
   useEffect(() => {
     if (user) {
       fetchDashboardData();
+      fetchUsageData();
     }
   }, [user]);
 
@@ .. @@
     }
   };
 
+  const fetchUsageData = async () => {
+    try {
+      const { data: usage } = await supabase.rpc('get_user_daily_usage', {
+        p_user_id: user?.id
+      });
+
+      const { data: limit } = await supabase.rpc('get_user_tier_limit', {
+        p_user_id: user?.id
+      });
+
+      setDailyUsage(usage || 0);
+      setDailyLimit(limit || 5);
+    } catch (error) {
+      console.error('Error fetching usage data:', error);
+    }
+  };
+
   const removeFromWatchlist = async (marketId: string) => {
     try {
       const { error } = await supabase
@@ .. @@
     }
   };
 
+  const getUsageColor = () => {
+    const percentage = dailyLimit === -1 ? 0 : (dailyUsage / dailyLimit) * 100;
+    if (percentage >= 90) return 'text-red-600';
+    if (percentage >= 70) return 'text-yellow-600';
+    return 'text-green-600';
+  };
+
   if (loading) {
     return (
       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
@@ .. @@
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-8">
             <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
             <p className="mt-2 text-gray-600">
               Monitor your watchlist and track your analysis history
             </p>
           </div>
 
           {/* Stats Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-white rounded-lg shadow p-6">
               <div className="flex items-center">
                 <Eye className="h-8 w-8 text-indigo-600" />
                 <div className="ml-4">
                   <p className="text-sm font-medium text-gray-600">Watchlist Items</p>
                   <p className="text-2xl font-bold text-gray-900">{watchlist.length}</p>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow p-6">
               <div className="flex items-center">
                 <Target className="h-8 w-8 text-green-600" />
                 <div className="ml-4">
                   <p className="text-sm font-medium text-gray-600">Recent Analyses</p>
                   <p className="text-2xl font-bold text-gray-900">{recentAnalyses.length}</p>
                 </div>
               </div>
             </div>
+            <div className="bg-white rounded-lg shadow p-6">
+              <div className="flex items-center">
+                <BarChart3 className={`h-8 w-8 ${getUsageColor()}`} />
+                <div className="ml-4">
+                  <p className="text-sm font-medium text-gray-600">Daily Usage</p>
+                  <p className={`text-2xl font-bold ${getUsageColor()}`}>
+                    {dailyUsage}{dailyLimit === -1 ? '' : `/${dailyLimit}`}
+                  </p>
+                  {dailyLimit !== -1 && (
+                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
+                      <div
+                        className={`h-2 rounded-full ${
+                          dailyUsage >= dailyLimit * 0.9 ? 'bg-red-500' :
+                          dailyUsage >= dailyLimit * 0.7 ? 'bg-yellow-500' : 'bg-green-500'
+                        }`}
+                        style={{ width: `${Math.min((dailyUsage / dailyLimit) * 100, 100)}%` }}
+                      ></div>
+                    </div>
+                  )}
+                </div>
+              </div>
+            </div>
           </div>
 
           {/* Watchlist Section */}