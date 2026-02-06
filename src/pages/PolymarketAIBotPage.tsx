import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Zap, Shield, BarChart3, Clock, RefreshCw, TrendingUp, CheckCircle } from 'lucide-react';

export function PolymarketAIBotPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PolyAnalyser - Polymarket AI Bot",
      "applicationCategory": "FinanceApplication",
      "description": "Automated AI bot for Polymarket analysis. Continuously monitors markets, analyzes opportunities, and provides intelligent trading recommendations.",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    const title = "Polymarket AI Bot - Automated Market Analysis & Trading Intelligence | PolyAnalyser";
    const description = "Advanced Polymarket AI bot that automatically analyzes prediction markets, identifies opportunities, and provides real-time trading recommendations. Automate your Polymarket strategy.";

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
      icon: Bot,
      title: "Automated Analysis",
      description: "AI bot automatically analyzes Polymarket markets based on your criteria, saving hours of manual research time every day."
    },
    {
      icon: Zap,
      title: "Real-Time Monitoring",
      description: "Continuous monitoring of market changes, odds movements, and new opportunities across all Polymarket categories."
    },
    {
      icon: TrendingUp,
      title: "Opportunity Detection",
      description: "Automatically identifies markets with potential edge where AI probability differs significantly from market odds."
    },
    {
      icon: BarChart3,
      title: "Smart Recommendations",
      description: "Receive intelligent trading recommendations based on AI analysis, confidence scores, and risk assessments."
    },
    {
      icon: Clock,
      title: "24/7 Operation",
      description: "AI bot works around the clock, never missing opportunities even when you're sleeping or away from your computer."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Built-in risk assessment for every opportunity, helping you avoid high-risk markets and focus on quality trades."
    }
  ];

  const capabilities = [
    "Analyze unlimited Polymarket markets automatically",
    "Monitor specific categories or keywords continuously",
    "Detect arbitrage opportunities across markets",
    "Track market sentiment and odds movements",
    "Identify undervalued prediction markets",
    "Alert on high-confidence trading opportunities",
    "Generate daily market analysis reports",
    "Filter markets by liquidity, volume, and time",
    "Track historical accuracy and performance",
    "Customize analysis parameters and preferences"
  ];

  const useCases = [
    {
      title: "Active Traders",
      description: "Monitor multiple Polymarket markets simultaneously and receive instant alerts when high-quality opportunities arise, allowing you to trade faster than competitors."
    },
    {
      title: "Research Analysts",
      description: "Automate market research across hundreds of Polymarket markets, identifying trends, patterns, and anomalies for comprehensive analysis reports."
    },
    {
      title: "Portfolio Managers",
      description: "Continuously monitor your Polymarket positions and related markets, receiving AI recommendations for portfolio optimization and risk management."
    },
    {
      title: "Arbitrage Seekers",
      description: "Automatically detect price discrepancies and edge opportunities across different Polymarket markets for potential arbitrage strategies."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/polyanalyser.png"
              alt="PolyAnalyser"
              className="w-16 h-16"
            />
            <Bot className="w-16 h-16 text-[#1552F0]" />
          </div>

          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            Polymarket AI Bot
          </h1>

          <p className="text-xl text-black/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Automated AI-powered bot that continuously monitors, analyzes, and identifies trading opportunities on Polymarket. Get intelligent recommendations delivered to you 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Activate AI Bot
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-black border border-black/20 hover:border-black/30 font-medium rounded-lg transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            AI Bot Features for Polymarket
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
            What the AI Bot Can Do
          </h2>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#1552F0] flex-shrink-0 mt-0.5" />
                <p className="text-black/80">{capability}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            How the Polymarket AI Bot Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg border border-black/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Configure Your Preferences
                  </h3>
                  <p className="text-black/70">
                    Set up your AI bot with specific criteria: preferred Polymarket categories, minimum liquidity thresholds, risk tolerance, and analysis frequency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Automated Market Scanning
                  </h3>
                  <p className="text-black/70">
                    The AI bot continuously scans Polymarket for new and updated markets matching your criteria, processing hundreds of markets automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    AI Analysis & Evaluation
                  </h3>
                  <p className="text-black/70">
                    For each market, the AI performs comprehensive analysis including probability calculation, edge detection, risk assessment, and confidence scoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Receive Smart Recommendations
                  </h3>
                  <p className="text-black/70">
                    Get instant notifications about high-quality opportunities via your dashboard, email, or mobile app with detailed analysis and actionable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Who Benefits from the Polymarket AI Bot?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-black/10 hover:border-black/20 transition-all hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold text-black mb-4">
                  {useCase.title}
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-black text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Use an AI Bot for Polymarket?
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <RefreshCw className="w-8 h-8 text-[#1552F0] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Never Miss Opportunities</h3>
                <p className="text-white/80">
                  Manual analysis means you can only monitor a handful of markets. The AI bot tracks hundreds of Polymarket markets simultaneously, ensuring you never miss high-quality opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-[#1552F0] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-white/80">
                  Analyzing Polymarket markets manually takes hours per day. The AI bot automates this process, delivering only the highest-quality opportunities directly to you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-[#1552F0] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Trade Faster</h3>
                <p className="text-white/80">
                  Speed matters in prediction markets. The AI bot identifies opportunities and alerts you instantly, giving you a competitive advantage over manual analysts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BarChart3 className="w-8 h-8 text-[#1552F0] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Better Decisions</h3>
                <p className="text-white/80">
                  AI analysis is consistent, data-driven, and free from emotional bias. Make better trading decisions based on comprehensive analysis and statistical modeling.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1552F0] to-[#0f3ec4] text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Activate Your Polymarket AI Bot Today
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join professional traders using AI automation to gain an unfair advantage on Polymarket. Start with 5 free automated analyses per day.
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
              View Plans
            </button>
          </div>
        </div>

        <div className="mt-16 prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-4">
            The Future of Polymarket Trading: AI Automation
          </h2>
          <p className="text-black/70 leading-relaxed mb-4">
            As Polymarket grows into a multi-billion dollar prediction market ecosystem, the advantage increasingly belongs to traders who can process information faster and more comprehensively than their competitors. Manual analysis simply cannot keep pace with the volume of markets and speed of information flow.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            AI bots represent the future of Polymarket trading. By automating market monitoring, analysis, and opportunity detection, traders can focus their time on decision-making and strategy rather than data gathering and manual calculations. This is the same evolution that transformed stock market trading, and it's now happening in prediction markets.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            PolyAnalyser's AI bot is specifically designed for Polymarket's unique characteristics. Unlike generic trading bots, our system understands prediction market dynamics, liquidity patterns, resolution processes, and market efficiency factors specific to Polymarket. This specialized knowledge translates to more accurate analysis and better trading recommendations.
          </p>
          <p className="text-black/70 leading-relaxed">
            Whether you're an active Polymarket trader looking to scale your operation, a research analyst studying prediction markets, or a portfolio manager seeking automation, the Polymarket AI bot provides the intelligence and efficiency needed to compete in today's fast-paced prediction market environment.
          </p>
        </div>
      </div>
    </div>
  );
}
