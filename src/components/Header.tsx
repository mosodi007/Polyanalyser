import { LogIn, UserPlus } from 'lucide-react';

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function Header({ onRefresh, isRefreshing }: HeaderProps) {
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
            <button className="flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-2.5 text-black hover:text-[#1552F0] transition-colors">
              <span className="hidden sm:inline">Login</span>
            </button>
            <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-xl transition-all shadow-md border-2 border-[#1552F0]">
              <span className="hidden sm:inline">Sign up for free</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
