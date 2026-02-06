@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { TrendingUp, Brain, Target, ArrowRight, Search, Filter } from 'lucide-react';
+import { TrendingUp, Brain, Target, ArrowRight, Search, Filter, Crown } from 'lucide-react';
+import { Link } from 'react-router-dom';
 import { MarketCard } from '../components/MarketCard';
 import { fetchMarkets } from '../lib/polymarket';
 import type { Market } from '../types/market';
@@ .. @@
           <div className="text-center">
             <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
               AI-Powered
               <span className="text-indigo-600"> Polymarket</span>
               <br />
               Analysis
             </h1>
             <p className="mt-6 text-lg leading-8 text-gray-600">
               Get intelligent insights and predictions for Polymarket events using advanced AI analysis.
               Make informed decisions with real-time data and expert recommendations.
             </p>
             <div className="mt-10 flex items-center justify-center gap-x-6">
-              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
+              <Link
+                to="/pricing"
+                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
+              >
                 Get Started
-              </button>
+              </Link>
               <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                 Learn more <span aria-hidden="true">→</span>
               </a>
             </div>
           </div>
         </div>
       </div>

       {/* Features Section */}
       <div id="features" className="py-24 bg-white">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="mx-auto max-w-2xl lg:text-center">
             <h2 className="text-base font-semibold leading-7 text-indigo-600">Advanced Analytics</h2>
             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
               Everything you need to analyze prediction markets
             </p>
             <p className="mt-6 text-lg leading-8 text-gray-600">
               Our AI-powered platform provides comprehensive analysis tools to help you make better predictions
               and understand market dynamics.
             </p>
           </div>
           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
               <div className="flex flex-col">
                 <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                   <Brain className="h-5 w-5 flex-none text-indigo-600" />
                   AI Analysis
                 </dt>
                 <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                   <p className="flex-auto">
                     Advanced machine learning algorithms analyze market data, news, and trends to provide
                     intelligent predictions and recommendations.
                   </p>
                 </dd>
               </div>
               <div className="flex flex-col">
                 <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                   <TrendingUp className="h-5 w-5 flex-none text-indigo-600" />
                   Real-time Data
                 </dt>
                 <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                   <p className="flex-auto">
                     Access live market data, price movements, and trading volumes to stay ahead of
                     market changes and opportunities.
                   </p>
                 </dd>
               </div>
               <div className="flex flex-col">
                 <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                   <Target className="h-5 w-5 flex-none text-indigo-600" />
                   Smart Insights
                 </dt>
                 <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                   <p className="flex-auto">
                     Get actionable insights with confidence scores, risk assessments, and detailed
                     reasoning behind each recommendation.
                   </p>
                 </dd>
               </div>
             </dl>
           </div>
         </div>
       </div>

+      {/* Pricing Preview */}
+      <div className="py-24 bg-gray-50">
+        <div className="mx-auto max-w-7xl px-6 lg:px-8">
+          <div className="mx-auto max-w-2xl text-center">
+            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
+              Choose Your Plan
+            </h2>
+            <p className="mt-6 text-lg leading-8 text-gray-600">
+              Start with our free tier or upgrade for unlimited access to AI-powered analysis
+            </p>
+          </div>
+          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
+            {/* Free Tier */}
+            <div className="rounded-2xl border border-gray-200 bg-white p-8">
+              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
+              <p className="mt-4 text-sm text-gray-600">Perfect for getting started</p>
+              <p className="mt-6 flex items-baseline gap-x-1">
+                <span className="text-4xl font-bold tracking-tight text-gray-900">$0</span>
+                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
+              </p>
+              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
+                <li className="flex gap-x-3">
+                  <span>5 analyses per day</span>
+                </li>
+                <li className="flex gap-x-3">
+                  <span>Basic market data</span>
+                </li>
+                <li className="flex gap-x-3">
+                  <span>Personal watchlist</span>
+                </li>
+              </ul>
+            </div>
+
+            {/* Lite Tier */}
+            <div className="rounded-2xl border-2 border-indigo-500 bg-white p-8">
+              <div className="flex items-center justify-between">
+                <h3 className="text-lg font-semibold text-indigo-600">Lite</h3>
+                <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-600">
+                  Popular
+                </span>
+              </div>
+              <p className="mt-4 text-sm text-gray-600">For serious analysts</p>
+              <p className="mt-6 flex items-baseline gap-x-1">
+                <span className="text-4xl font-bold tracking-tight text-gray-900">$9.99</span>
+                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
+              </p>
+              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
+                <li className="flex gap-x-3">
+                  <span>50 analyses per day</span>
+                </li>
+                <li className="flex gap-x-3">
+                  <span>Real-time market data</span>
+                </li>
+                <li className="flex gap-x-3">
+                  <span>Advanced insights</span>
+                </li>
+              </ul>
+            </div>
+
+            {/* Pro Tier */}
+            <div className="rounded-2xl border border-gray-200 bg-white p-8">
+              <div className="flex items-center justify-between">
+                <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
+                <Crown className="h-5 w-5 text-purple-600" />
+              </div>
+              <p className="mt-4 text-sm text-gray-600">For professional traders</p>
+              <p className="mt-6 flex items-baseline gap-x-1">
+                <span className="text-4xl font-bold tracking-tight text-gray-900">$49</span>
+                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
+              </p>
+              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
+                <li className="flex gap-x-3">
+                  <span>Unlimited analyses</span>
+                </li>
+                <li className="flex gap-x-3">
+                  <span>Priority support</span>
+                </li>
+                <li className="flex gap-x-3">
+                  <span>Advanced analytics</span>
+                </li>
+              </ul>
+            </div>
+          </div>
+          <div className="mt-8 text-center">
+            <Link
+              to="/pricing"
+              className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
+            >
+              View All Plans
+              <ArrowRight className="ml-2 h-4 w-4" />
+            </Link>
+          </div>
+        </div>
+      </div>
+
       {/* Markets Section */}
       <div className="py-24 bg-white">