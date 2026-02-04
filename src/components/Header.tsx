import { useState, useEffect, useRef } from 'react';
import { LogIn, UserPlus, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user?: User | null;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export function Header({ user, onLoginClick, onSignupClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
  };

  return (
    <header className="glass border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/polyanalyser.png" alt="PolyAnalyser - AI-Powered Polymarket Analysis" className="w-8 h-8 sm:w-10 sm:h-10" />
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-black">
              Polyanalyser
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 glass-strong hover:bg-black/5 rounded-xl transition-all border-2 border-black/10"
                >
                  <div className="w-8 h-8 bg-[#1552F0] rounded-full flex items-center justify-center text-white font-semibold">
                    {user.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline text-black font-medium max-w-[150px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown className="w-4 h-4 text-black/50" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass-white rounded-xl shadow-2xl border-2 border-black/10 overflow-hidden z-50">
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 rounded-lg transition-colors text-red-600 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-black hover:text-[#1552F0] font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
                <button
                  onClick={onSignupClick}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-xl transition-all shadow-md border-2 border-[#1552F0]"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
