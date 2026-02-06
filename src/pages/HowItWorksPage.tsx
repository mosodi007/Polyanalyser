import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Brain, LineChart, Shield, Zap, Target, BookOpen, Code } from 'lucide-react';

export function HowItWorksPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How PolyAnalyser Analyzes Polymarket Markets",
      "description": "Complete methodology explaining how PolyAnalyser uses AI to analyze Polymarket prediction markets and provide trading recommendations.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Data Collection",
          "text": "Gather market data from Polymarket API including current odds, volume, liquidity, and historical data."
        },
        {
          "@type": "HowToStep",
          "name": "Information Analysis",
          "text": "Analyze news sources, social media sentiment, and relevant events using natural language processing."
        },
        {
          "@type": "HowToStep",
          "name": "Probability Calculation",
          "text": "Calculate independent probability assessment using machine learning models trained on historical Polymarket data."
        },
        {
          "@type": "HowToStep",
          "name": "Edge Detection",
          "text": "Compare AI probability to market odds to identify potential trading opportunities with statistical advantages."
        },
        {
          "@type": "HowToStep",
          "name": "Risk Assessment",
          "text": "Evaluate risk factors including information quality, liquidity, time sensitivity, and market manipulation potential."
        },
        {
          "@type": "HowToStep",
          "name": "Generate Recommendations",
          "text": "Provide clear trading recommendations with confidence scores and detailed reasoning."
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    const title = "How It Works - PolyAnalyser Methodology for Polymarket Analysis";
    const description = "Learn how PolyAnalyser's AI analyzes Polymarket prediction markets. Detailed explanation of our methodology, data sources, algorithms, and recommendation process.";

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const methodology = [
    {
      icon: Database,
      title: "1. Data Collection",
      description: "We start by gathering comprehensive data from multiple sources:",
      details: [
        "Polymarket API: Current odds, volume, liquidity, open interest, historical data",
        "News Sources: Real-time news articles from trusted sources related to the market topic",
        "Social Media: Sentiment analysis from Twitter, Reddit, and other platforms",
        "Historical Data: Past market outcomes, resolution data, and trader behavior patterns",
        "Related Markets: Analysis of similar or correlated Polymarket markets"
      ]
    },
    {
      icon: Brain,
      title: "2. AI Analysis",
      description: "Our machine learning models process the data to understand market dynamics:",
      details: [
        "Natural Language Processing: Extract insights from news articles and social media",
        "Sentiment Analysis: Gauge market sentiment and public opinion",
        "Pattern Recognition: Identify historical patterns and correlations",
        "Market Dynamics: Understand liquidity flows, trader behavior, and odds movements",
        "Event Impact: Assess how recent events affect outcome probabilities"
      ]
    },
    {
      icon: LineChart,
      title: "3. Probability Calculation",
      description: "We calculate an independent probability assessment:",
      details: [
        "Baseline Probability: Initial assessment based on available information",
        "Confidence Weighting: Adjust based on information quality and reliability",
        "Historical Calibration: Apply learnings from past market resolutions",
        "Uncertainty Quantification: Calculate confidence intervals and ranges",
        "Final Probability: Output probability assessment with confidence score (0-100)"
      ]
    },
    {
      icon: Target,
      title: "4. Edge Detection",
      description: "We compare our probability to market odds to identify opportunities:",
      details: [
        "Probability Gap: Calculate difference between AI probability and market odds",
        "Edge Percentage: Determine statistical advantage (positive or negative edge)",
        "Significance Testing: Ensure the difference is statistically meaningful",
        "Expected Value: Calculate potential expected value of trading the market",
        "Opportunity Rating: Classify markets by opportunity quality (strong/moderate/weak)"
      ]
    },
    {
      icon: Shield,
      title: "5. Risk Assessment",
      description: "Comprehensive risk analysis identifies potential concerns:",
      details: [
        "Information Quality: Assess reliability and completeness of available data",
        "Liquidity Risk: Evaluate market depth and ability to enter/exit positions",
        "Time Sensitivity: Analyze how quickly circumstances might change",
        "Resolution Risk: Consider potential issues with market resolution",
        "Manipulation Risk: Identify signs of potential market manipulation",
        "Overall Risk Score: Combined risk assessment (Low/Medium/High)"
      ]
    },
    {
      icon: Zap,
      title: "6. Recommendation Generation",
      description: "We provide clear, actionable recommendations:",
      details: [
        "Trade Direction: Clear recommendation (Buy Yes, Buy No, Wait, Avoid)",
        "Confidence Score: Overall confidence in the analysis (0-100)",
        "Reasoning: Detailed explanation of factors influencing the recommendation",
        "Key Insights: Highlight the most important findings",
        "Risk Warnings: Surface any significant concerns or risks",
        "Position Sizing: Suggest appropriate position size based on confidence and risk"
      ]
    }
  ];

  const principles = [
    {
      icon: BookOpen,
      title: "Transparency",
      description: "Every analysis includes detailed reasoning explaining why the AI made its assessment. You're never left wondering how we reached a conclusion."
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "Our models are trained on historical Polymarket data and continuously improve based on market outcomes. We track and display our historical accuracy."
    },
    {
      icon: Shield,
      title: "Risk Awareness",
      description: "We never present opportunities without highlighting risks. Every analysis includes comprehensive risk assessment and warnings."
    },
    {
      icon: Code,
      title: "Data-Driven",
      description: "All recommendations are based on data and statistical modeling, not gut feelings or biases. We let the data guide the analysis."
    }
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
            How It Works
          </h1>

          <p className="text-xl text-black/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive look at how PolyAnalyser uses artificial intelligence to analyze Polymarket prediction markets and generate actionable trading recommendations.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Our Analysis Methodology
          </h2>

          <div className="space-y-12">
            {methodology.map((step, index) => (
              <div key={index} className="bg-white rounded-lg border border-black/10 p-8 hover:shadow-lg transition-all">
                <div className="flex items-start gap-6">
                  <step.icon className="w-12 h-12 text-[#1552F0] flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-black mb-3">
                      {step.title}
                    </h3>
                    <p className="text-black/70 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1552F0] mt-2 flex-shrink-0" />
                          <span className="text-black/70">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-gradient-to-br from-[#1552F0]/5 to-[#1552F0]/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            Our Core Principles
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-start gap-4">
                <principle.icon className="w-10 h-10 text-[#1552F0] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-black/70">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            Understanding the Output
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg border border-black/10 p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                AI Probability
              </h3>
              <p className="text-black/70 mb-3">
                Our independent probability assessment (0-100%) for the "Yes" outcome. This represents what we believe the true probability is based on our analysis.
              </p>
              <p className="text-black/70">
                Example: AI Probability = 65% means we believe there's a 65% chance the "Yes" outcome will occur.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Market Probability
              </h3>
              <p className="text-black/70 mb-3">
                The current market odds on Polymarket converted to probability. This represents what the market (collective traders) believes.
              </p>
              <p className="text-black/70">
                Example: Market Probability = 55% means the market is pricing in a 55% chance of "Yes".
              </p>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Edge Percentage
              </h3>
              <p className="text-black/70 mb-3">
                The difference between AI probability and market probability, representing potential statistical advantage.
              </p>
              <p className="text-black/70">
                Example: Edge = +10% means the AI believes the market is underpricing the outcome by 10 percentage points, representing a potential opportunity.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Confidence Score
              </h3>
              <p className="text-black/70 mb-3">
                How confident we are in our analysis (0-100), based on information quality, data completeness, and model certainty.
              </p>
              <p className="text-black/70">
                90-100: Very High Confidence | 70-89: High Confidence | 50-69: Medium Confidence | Below 50: Low Confidence
              </p>
            </div>

            <div className="bg-white rounded-lg border border-black/10 p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Recommendation
              </h3>
              <p className="text-black/70 mb-3">
                Clear trading recommendation based on edge, confidence, and risk assessment:
              </p>
              <ul className="space-y-2 text-black/70">
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Strong Buy:</span>
                  <span>Large positive edge with high confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Buy:</span>
                  <span>Positive edge with reasonable confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Hold/Wait:</span>
                  <span>Minimal edge or moderate confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Avoid:</span>
                  <span>Negative edge or high risk factors identified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-20 bg-black text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Important Disclaimers
          </h2>

          <div className="max-w-4xl mx-auto space-y-4 text-white/80">
            <p className="leading-relaxed">
              <strong className="text-white">Not Financial Advice:</strong> PolyAnalyser provides analytical tools and insights. All analysis is for informational purposes only and should not be considered financial, investment, or trading advice.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">No Guarantees:</strong> Prediction markets are inherently uncertain. Our AI analysis does not guarantee profitable outcomes. Past accuracy does not guarantee future performance.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Do Your Own Research:</strong> While our AI provides comprehensive analysis, you should always conduct your own research and make independent trading decisions based on your risk tolerance and circumstances.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Risk Warning:</strong> Trading on prediction markets involves risk. You can lose money. Only trade with funds you can afford to lose.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Continuous Improvement:</strong> Our AI models continuously learn and improve. Analysis quality and accuracy may vary across different market types and conditions.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1552F0] to-[#0f3ec4] text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience AI-Powered Polymarket Analysis?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            See our methodology in action. Analyze any Polymarket market and get comprehensive AI-powered insights in under 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/search')}
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 font-medium rounded-lg transition-all"
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
