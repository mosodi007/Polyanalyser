interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function Header({ onRefresh, isRefreshing }: HeaderProps) {
  return (
    <header className="glass border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-3">
          <img src="/polyanalyser.png" alt="PolyAnalyser - AI-Powered Polymarket Analysis" className="w-10 h-10" />
          <div className="text-2xl font-bold tracking-tight text-black">
            Polyanalyser
          </div>
        </div>
      </div>
    </header>
  );
}
