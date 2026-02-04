import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: 'all' | 'active' | 'closed';
  onStatusChange: (status: 'all' | 'active' | 'closed') => void;
  resultCount: number;
}

export function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  resultCount,
}: FilterBarProps) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedStatus !== 'all';

  const clearFilters = () => {
    onCategoryChange('all');
    onStatusChange('all');
  };

  return (
    <div className="mb-6 glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-black/60" />
          <span className="text-sm font-medium text-black">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-black/60 hover:text-black transition-colors"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="category-filter" className="block text-xs font-medium text-black/70 mb-2">
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 text-sm glass rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1552F0]/50 transition-all text-black bg-white/50"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="status-filter" className="block text-xs font-medium text-black/70 mb-2">
            Status
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as 'all' | 'active' | 'closed')}
            className="w-full px-4 py-2 text-sm glass rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1552F0]/50 transition-all text-black bg-white/50"
          >
            <option value="all">All statuses</option>
            <option value="active">Active only</option>
            <option value="closed">Closed only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
