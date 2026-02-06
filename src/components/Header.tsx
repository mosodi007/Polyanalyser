import { useState, useEffect, useRef } from 'react';
import { LogOut, ChevronDown, History, CreditCard, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSubscription } from '../hooks/useSubscription';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user?: User | null;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  minimal?: boolean;
}

export function Header({ user, onLoginClick, onSignupClick, minimal = false }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { tier } = useSubscription();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    if (user) {
      supabase
        .from('user_profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setFullName(data.full_name);
          }
        });
    } else {
      setFullName(null);
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
  };

  const handlePricingClick = () => {
    navigate('/pricing');
    setShowUserMenu(false);
  };

  const handleAccountClick = () => {
    navigate('/account');
    setShowUserMenu(false);
  };

  const displayName = fullName || user?.email || 'User';
  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0].toUpperCase() || 'U';

  const getTierBadgeStyle = () => {
    switch (tier) {
      case 'pro':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
import { Link, useLocation } from 'react-router-dom';
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default:
            className={`px-3 py-2 text-sm font-medium ${
              location.pathname === '/' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}
        return 'bg-gray-600 text-white';
    }
  };
  const location = useLocation();

            className={`px-3 py-2 text-sm font-medium ${
              location.pathname === '/dashboard' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}
    <header className={minimal ? "bg-white border-b border-black/5" : "bg-white/80 backdrop-blur-sm border-b border-black/5"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/pricing"
            className={`px-3 py-2 text-sm font-medium ${
              location.pathname === '/pricing' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}
          >
            Pricing
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <button
                onClick={() => navigate('/history')}
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-black/5 rounded-lg transition-all"
                >
                  <div className="w-7 h-7 bg-[#1552F0] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {initials}
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-black text-sm font-medium max-w-[150px] truncate">
                      {displayName}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${getTierBadgeStyle()}`}>
                      {tier.toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-black/50" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-black/10 overflow-hidden z-50">
                    <div className="p-1">
                      <button
                        onClick={handlePricingClick}
                        className="w-full flex gap-2 px-2 py-2 hover:bg-black/5 rounded-md transition-colors text-black text-sm font-medium"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pricing & Subscription
                      </button>
                      <button
                        onClick={handleAccountClick}
            <div className="flex items-center space-x-3">
              <SubscriptionBadge />
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.email}</span>
                )}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-1.5 text-sm text-black hover:text-[#1552F0] font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="px-4 py-1.5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white text-sm font-medium rounded-md transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
