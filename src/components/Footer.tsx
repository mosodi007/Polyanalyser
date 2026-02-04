export function Footer() {
  return (
    <footer className="glass border-t border-black/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <p className="text-sm text-black/60">
            By using Polyanalyser, you agree to our{' '}
            <a href="/terms" className="text-[#1552F0] hover:underline font-medium">
              Terms
            </a>{' '}
            and have read our{' '}
            <a href="/privacy" className="text-[#1552F0] hover:underline font-medium">
              Privacy Policy
            </a>
            . See{' '}
            <button className="text-[#1552F0] hover:underline font-medium">
              Cookie Preferences
            </button>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
