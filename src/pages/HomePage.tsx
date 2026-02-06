import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is PolyAnalyser and how does it work with Polymarket?",
    answer: "PolyAnalyser is an AI-powered analytics platform that analyzes Polymarket prediction markets in real-time. It uses advanced machine learning algorithms to calculate probabilities, identify market inefficiencies, and provide data-driven trading recommendations. Simply search for any Polymarket market, click 'Analyze', and get instant insights including probability assessments, edge percentages, risk factors, and actionable recommendations."
  },
  {
    question: "How accurate are PolyAnalyser's Polymarket predictions?",
    answer: "PolyAnalyser uses state-of-the-art AI models trained on historical Polymarket data, news sources, and market behavior patterns. Our analysis provides probability assessments with confidence scores, helping you identify when our AI calculation differs from the market odds. We focus on finding 'edge' - situations where there's a statistical advantage - rather than making absolute predictions."
  },
  {
    question: "Is PolyAnalyser better than analyzing Polymarket markets manually?",
    answer: "Yes. PolyAnalyser processes vast amounts of data in seconds that would take hours to analyze manually. Our AI evaluates news sentiment, historical patterns, market dynamics, liquidity, and risk factors simultaneously. You get comprehensive analysis including probability calculations, edge identification, risk assessment, and clear recommendations - all in under 30 seconds per market."
  },
  {
    question: "What Polymarket markets can I analyze with PolyAnalyser?",
    answer: "You can analyze any active or closed Polymarket prediction market across all categories: Politics, Crypto, Sports, Technology, Business, Science, Pop Culture, and more. Our AI is trained to understand diverse market types and provides relevant analysis for each category, adapting its approach based on the market's characteristics."
  },
  {
    question: "How much does PolyAnalyser cost for Polymarket analysis?",
    answer: "PolyAnalyser offers three tiers: Free (5 analyses per day), Pro ($9.99/month for 50 analyses per day), and Premium ($29.99/month for unlimited analyses). All tiers include full AI analysis with probability assessments, edge calculations, risk factors, and recommendations. Pro and Premium users get priority analysis speed and access to advanced features."
  },
  {
    question: "Can PolyAnalyser help me make money on Polymarket?",
    answer: "PolyAnalyser provides data-driven insights to help you make informed trading decisions on Polymarket. Our AI identifies markets where there may be a statistical edge between our calculated probability and the market odds. However, prediction markets involve risk, and past performance doesn't guarantee future results. We provide tools and analysis - you make the final trading decisions."
  },
  {
    question: "Does PolyAnalyser integrate with the Polymarket API?",
    answer: "Yes. PolyAnalyser integrates directly with the Polymarket API to fetch real-time market data including current odds, volume, liquidity, and market status. Our analysis is always based on the latest available data, ensuring you get up-to-date insights for your trading decisions."
  },
  {
    question: "What makes PolyAnalyser different from other Polymarket tools?",
    answer: "PolyAnalyser combines multiple advantages: (1) Advanced AI models specifically trained for Polymarket analysis, (2) Real-time probability calculations comparing AI vs market odds, (3) Comprehensive risk factor identification, (4) Clear actionable recommendations with confidence scores, (5) Fast analysis (under 30 seconds), (6) Simple interface requiring no technical knowledge, and (7) Historical tracking to monitor accuracy over time."
  }
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

      <div className="w-full max-w-4xl mx-auto px-4 mt-24 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-3">
            Frequently Asked Questions About Polymarket Analysis
          </h2>
          <p className="text-black/60">
            Everything you need to know about using PolyAnalyser for Polymarket prediction markets
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-black/10 overflow-hidden transition-all hover:border-black/20"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-black/5 transition-colors"
              >
                <h3 className="text-base font-medium text-black">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-black/60 transition-transform flex-shrink-0 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-black/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}
