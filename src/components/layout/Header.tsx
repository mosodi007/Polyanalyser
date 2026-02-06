@@ .. @@
 import React from 'react';
-import { BarChart3, TrendingUp, Brain } from 'lucide-react';
+import { BarChart3, TrendingUp, Brain, User, LogOut } from 'lucide-react';
+import { Link } from 'react-router-dom';
+import { useAuth } from '../../hooks/useAuth';
 
 export function Header() {
+  const { user, signOut } = useAuth();
+
   return (
     <header className="bg-white shadow-sm border-b border-gray-200">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16">
-          <div className="flex items-center">
+          <Link to="/" className="flex items-center">
             <div className="flex items-center">
               <Brain className="h-8 w-8 text-indigo-600" />
               <span className="ml-2 text-xl font-bold text-gray-900">PolyAnalyser</span>
             </div>
-          </div>
+          </Link>
           
           <nav className="hidden md:flex space-x-8">
-            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
+            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
               Dashboard
-            </a>
-            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
+            </Link>
+            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
+              Pricing
+            </Link>
+            <Link to="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
               Markets
-            </a>
-            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
+            </Link>
+            <Link to="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
               Watchlist
-            </a>
-            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
+            </Link>
+            <Link to="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
               Analytics
-            </a>
+            </Link>
           </nav>
           
-          <div className="flex items-center space-x-4">
-            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
-              Get Started
-            </button>
+          <div className="flex items-center space-x-4">
+            {user ? (
+              <div className="flex items-center space-x-4">
+                <Link
+                  to="/account"
+                  className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
+                >
+                  <User className="h-4 w-4 mr-1" />
+                  Account
+                </Link>
+                <button
+                  onClick={signOut}
+                  className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
+                >
+                  <LogOut className="h-4 w-4 mr-1" />
+                  Sign Out
+                </button>
+              </div>
+            ) : (
+              <div className="flex items-center space-x-2">
+                <Link
+                  to="/login"
+                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
+                >
+                  Sign In
+                </Link>
+                <Link
+                  to="/signup"
+                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
+                >
+                  Get Started
+                </Link>
+              </div>
+            )}
           </div>
         </div>
       </div>