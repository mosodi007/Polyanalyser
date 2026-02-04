import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto glass-white rounded-2xl shadow-2xl border-2 border-black/10">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="w-6 h-6 text-[#1552F0]" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-black mb-2">Cookie Consent</h3>
              <p className="text-sm text-black/70 mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                By clicking "Accept All", you consent to our use of cookies. You can manage your preferences at any time.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2.5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-xl transition-all shadow-md border-2 border-[#1552F0]"
                >
                  Accept All
                </button>
                <button
                  onClick={declineCookies}
                  className="px-6 py-2.5 glass-strong text-black hover:bg-black/5 font-medium rounded-xl transition-all border-2 border-black/10"
                >
                  Decline
                </button>
                <a
                  href="/privacy"
                  className="px-6 py-2.5 text-[#1552F0] hover:underline font-medium rounded-xl transition-all flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>
            </div>

            <button
              onClick={declineCookies}
              className="flex-shrink-0 p-2 hover:bg-black/5 rounded-lg transition-colors"
              aria-label="Close cookie consent"
            >
              <X className="w-5 h-5 text-black/50" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
