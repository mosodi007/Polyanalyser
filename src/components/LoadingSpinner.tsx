export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white/30"></div>
        <div className="w-16 h-16 rounded-full border-4 border-[#1552F0] border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="glass-white rounded-2xl p-8 animate-pulse">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex gap-3 mb-4">
            <div className="h-6 w-20 bg-black/10 rounded-full"></div>
            <div className="h-6 w-16 bg-black/10 rounded-full"></div>
          </div>
          <div className="h-8 bg-black/10 rounded w-3/4 mb-3"></div>
          <div className="h-8 bg-black/10 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-20 bg-black/5 rounded-2xl mb-6"></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="h-4 bg-black/10 rounded w-24 mb-3"></div>
          <div className="h-10 bg-black/10 rounded w-20"></div>
        </div>
        <div>
          <div className="h-4 bg-black/10 rounded w-24 mb-3"></div>
          <div className="h-10 bg-black/10 rounded w-20"></div>
        </div>
      </div>
      <div className="h-24 bg-black/5 rounded-2xl"></div>
    </div>
  );
}
