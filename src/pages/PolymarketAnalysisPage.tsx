import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Brain, Target, BarChart3, Shield, Zap, CheckCircle } from 'lucide-react';

export function PolymarketAnalysisPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Polymarket Analysis: AI-Powered Prediction Market Analytics",
      "description": "Comprehensive Polymarket analysis tool using AI to analyze prediction markets, identify trading opportunities, and provide data-driven insights for better trading decisions.",
      "author": {
        "@type": "Organization",
        "name": "PolyAnalyser"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PolyAnalyser",
        "logo": {
          "@type": "ImageObject",
          "url": "https://polyanalyser.com/polyanalyser.png"
        }
      },
      "datePublished": "2026-02-06",
      "dateModified": "2026-02-06"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    const title = "Polymarket Analysis Tool - AI-Powered Market Analytics | PolyAnalyser";
    const description = "Advanced Polymarket analysis with AI. Get real-time probability assessments, edge calculations, risk factors, and trading recommendations for any prediction market. Start analyzing now.";

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models trained specifically on Polymarket data to provide accurate probability assessments and market insights."
    },
    {
      icon: TrendingUp,
      title: "Edge Detection",
      description: "Automatically identify markets where AI probability differs from market odds, helping you find potential trading opportunities with statistical advantages."
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Comprehensive risk factor analysis for each market including liquidity concerns, information quality, time sensitivity, and market manipulation potential."
    },
    {
      icon: Zap,
      title: "Real-Time Data",
      description: "Live integration with Polymarket API ensures your analysis is always based on current market conditions, odds, volume, and liquidity."
    },
    {
      icon: BarChart3,
      title: "Historical Tracking",
      description: "Monitor your analysis history and accuracy over time. Learn from past predictions and refine your trading strategy with data-driven insights."
    },
    {
      icon: Target,
      title: "Actionable Recommendations",
      description: "Clear buy, sell, or wait recommendations with confidence scores and detailed reasoning. No guesswork - just data-driven guidance."
    }
  ];

  const benefits = [
    "Analyze Polymarket markets 10x faster than manual research",
    "Identify market inefficiencies with AI probability calculations",
    "Access comprehensive risk assessments for informed decisions",
    "Get real-time data from Polymarket API integration",
    "Track analysis history across all market categories",
    "Receive clear recommendations with confidence scores",
    "Understand market dynamics with detailed reasoning",
    "Make data-driven trading decisions with AI assistance"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/polyanalyser.png"
              alt="PolyAnalyser"
              className="w-16 h-16"
            />
          </div>

          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            Polymarket Analysis Tool
          </h1>

          <p className="text-xl text-black/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered Polymarket analysis platform. Get instant market insights, probability assessments, and data-driven trading recommendations for any prediction market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Start Analyzing Free
            </button>
            <button
              onClick={() => navigate('/search')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-black border border-black/20 hover:border-black/30 font-medium rounded-lg transition-all"
            >
              Try Demo
            </button>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Why Choose PolyAnalyser for Polymarket Analysis?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-black/10 hover:border-black/20 transition-all hover:shadow-md"
              >
                <feature.icon className="w-12 h-12 text-[#1552F0] mb-4" />
                <h3 className="text-xl font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-gradient-to-br from-[#1552F0]/5 to-[#1552F0]/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            What You Get with Polymarket Analysis
          </h2>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#1552F0] flex-shrink-0 mt-0.5" />
                <p className="text-black/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            How Polymarket Analysis Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Search Any Polymarket Market
                </h3>
                <p className="text-black/70">
                  Enter keywords or paste a Polymarket URL to find prediction markets across Politics, Crypto, Sports, Technology, and all other categories.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  AI Analyzes the Market
                </h3>
                <p className="text-black/70">
                  Our AI processes market data, news sources, historical patterns, and market dynamics to calculate probability assessments and identify potential edges.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Get Actionable Insights
                </h3>
                <p className="text-black/70">
                  Receive comprehensive analysis including AI probability, edge percentage, risk factors, confidence score, and clear recommendations for your trading decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Make Informed Decisions
                </h3>
                <p className="text-black/70">
                  Use the data-driven insights to guide your Polymarket trading strategy. Track your analysis history and refine your approach over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Analyzing Polymarket Markets Today
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join traders and analysts using PolyAnalyser to make smarter, data-driven decisions on Polymarket prediction markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 font-medium rounded-lg transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>

        <div className="mt-16 prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-4">
            Understanding Polymarket Analysis
          </h2>
          <p className="text-black/70 leading-relaxed mb-4">
            Polymarket analysis involves evaluating prediction markets to identify trading opportunities and make informed decisions. Traditional analysis requires manually reviewing news sources, market dynamics, historical data, and risk factors - a time-consuming process that can take hours per market.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            PolyAnalyser revolutionizes Polymarket analysis by using artificial intelligence to automate this process. Our AI models are specifically trained on Polymarket data and can analyze any market in under 30 seconds, providing comprehensive insights that would be difficult or impossible to obtain through manual analysis.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            The key to successful Polymarket trading is finding 'edge' - situations where the market odds differ from the true probability. Our AI calculates independent probability assessments based on available data and compares them to current market odds, highlighting potential opportunities where statistical advantages may exist.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            Every Polymarket analysis includes comprehensive risk assessment. We evaluate factors like information quality, liquidity concerns, time sensitivity, and potential manipulation risks. This helps you understand not just the opportunity, but also the potential downsides of any trading decision.
          </p>
          <p className="text-black/70 leading-relaxed">
            Whether you're analyzing Polymarket for political predictions, crypto market outcomes, sports events, or any other category, PolyAnalyser provides the tools and insights you need to make smarter, data-driven trading decisions on the world's largest prediction market platform.
          </p>
        </div>
      </div>
    </div>
  );
}
