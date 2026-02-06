import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/polyanalyser.png"
              alt="PolyAnalyser"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>
          <h1 className="text-6xl sm:text-6xl font-bold text-black mb-4 tracking-tight">
            PolyAnalyser
          </h1>
          <p className="text-lg text-black/60">
            Search prediction markets, get instant accurate AI analysis, and make data-driven trading decisions on Polymarket with advanced market intelligence and probability assessments
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-black/40 group-focus-within:text-black/60 transition-colors" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Copy and paste from Polymarket..."
              className="w-full pl-14 pr-6 py-4 text-base bg-white rounded-full border border-black/10 hover:border-black/20 focus:border-[#1552F0] focus:outline-none focus:shadow-lg transition-all text-black placeholder-black/40"
              autoFocus
            />
          </div>
          <div className="flex justify-center gap-3 mt-8">
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="px-6 py-3 bg-white hover:bg-gray-50 text-black/80 text-sm font-medium rounded-md border border-black/10 hover:border-black/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
            >
              Search Markets
            </button>
          </div>
        </form>

        <div className="mt-16 text-center">
          <p className="text-sm text-black/50 mb-4">Popular searches</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Trump', 'Bitcoin', 'AI', 'Climate', 'Elon Musk'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  navigate(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="px-4 py-2 text-sm text-black/60 hover:text-black bg-white rounded-full border border-black/10 hover:border-black/20 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
