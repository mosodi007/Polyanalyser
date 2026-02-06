import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Target, LineChart, Clock, Award, Calculator, Lightbulb } from 'lucide-react';

export function PolymarketPredictionToolPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PolyAnalyser - Polymarket Prediction Tool",
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "AI-powered Polymarket prediction tool that analyzes prediction markets and provides probability assessments, edge calculations, and trading recommendations.",
      "operatingSystem": "Web",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "150"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    const title = "Polymarket Prediction Tool - AI-Powered Market Forecasting | PolyAnalyser";
    const description = "Advanced Polymarket prediction tool using AI to forecast market outcomes. Get probability assessments, confidence scores, and data-driven predictions for any Polymarket market.";

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
      title: "AI Probability Calculations",
      description: "Advanced machine learning models calculate independent probability assessments for Polymarket outcomes based on comprehensive data analysis."
    },
    {
      icon: Calculator,
      title: "Edge Percentage Detection",
      description: "Automatically compare AI probability vs market odds to identify prediction opportunities with statistical advantages."
    },
    {
      icon: Target,
      title: "Confidence Scoring",
      description: "Every prediction includes a confidence score from 0-100, helping you understand the reliability of the AI assessment."
    },
    {
      icon: Clock,
      title: "Real-Time Predictions",
      description: "Predictions update based on latest market data, news events, and changing market conditions via live Polymarket API integration."
    },
    {
      icon: Lightbulb,
      title: "Detailed Reasoning",
      description: "Understand why the AI makes each prediction with comprehensive explanations of the factors influencing the assessment."
    },
    {
      icon: Award,
      title: "Accuracy Tracking",
      description: "Monitor prediction accuracy over time across different market categories to refine your trading strategy."
    }
  ];

  const howItWorks = [
    {
      step: "Data Collection",
      description: "Our AI gathers data from Polymarket API, news sources, historical market patterns, and relevant events."
    },
    {
      step: "Analysis Processing",
      description: "Machine learning models analyze market dynamics, sentiment, liquidity, and historical outcomes."
    },
    {
      step: "Probability Calculation",
      description: "AI calculates independent probability assessment based on comprehensive data evaluation."
    },
    {
      step: "Edge Identification",
      description: "Compare AI probability to market odds to identify potential trading opportunities."
    },
    {
      step: "Prediction Output",
      description: "Receive clear probability assessment with confidence score, reasoning, and recommendations."
    }
  ];

  const useCases = [
    {
      icon: LineChart,
      title: "Trading Strategy",
      description: "Use predictions to identify undervalued or overvalued markets on Polymarket for potential trading opportunities."
    },
    {
      icon: Target,
      title: "Risk Assessment",
      description: "Evaluate prediction confidence scores to understand risk levels before placing trades on Polymarket."
    },
    {
      icon: Sparkles,
      title: "Research & Analysis",
      description: "Leverage AI predictions for market research, trend analysis, and understanding market sentiment."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1552F0]/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#1552F0]" />
            <span className="text-sm font-medium text-[#1552F0]">AI-Powered Predictions</span>
          </div>

          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            Polymarket Prediction Tool
          </h1>

          <p className="text-xl text-black/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to predict Polymarket outcomes. Get data-driven probability assessments, confidence scores, and actionable insights for smarter trading decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Start Predicting Free
            </button>
            <button
              onClick={() => navigate('/search')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-black border border-black/20 hover:border-black/30 font-medium rounded-lg transition-all"
            >
              See Demo
            </button>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Powerful Prediction Features
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

        <div className="mb-20 bg-gradient-to-br from-black to-gray-900 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How Polymarket Prediction Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1552F0] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.step}
                  </h3>
                  <p className="text-white/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Use Cases for Polymarket Predictions
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-black/10 hover:border-black/20 transition-all hover:shadow-md text-center"
              >
                <useCase.icon className="w-16 h-16 text-[#1552F0] mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-black mb-3">
                  {useCase.title}
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-[#1552F0]/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              What Makes Our Prediction Tool Different?
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Polymarket-Specific Training
                </h3>
                <p className="text-black/70">
                  Unlike generic prediction tools, our AI is specifically trained on Polymarket data, understanding the unique dynamics of prediction markets including liquidity patterns, trader behavior, and market efficiency.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Transparent Methodology
                </h3>
                <p className="text-black/70">
                  Every prediction includes detailed reasoning explaining the factors that influenced the AI assessment. You're never left wondering why the AI made a specific prediction.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Confidence-Based Approach
                </h3>
                <p className="text-black/70">
                  Not all predictions are equal. Our confidence scoring helps you understand when the AI has strong conviction versus when uncertainty is high, allowing for better risk management.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Continuous Learning
                </h3>
                <p className="text-black/70">
                  Our AI models continuously learn from new market outcomes, improving prediction accuracy over time and adapting to changing market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Making Better Polymarket Predictions
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of traders using AI-powered predictions to gain an edge on Polymarket. Get started free with 5 predictions per day.
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
            Understanding Polymarket Prediction Markets
          </h2>
          <p className="text-black/70 leading-relaxed mb-4">
            Polymarket is the world's largest prediction market platform, allowing users to trade on the outcomes of real-world events across politics, crypto, sports, technology, and more. Making accurate predictions on Polymarket requires analyzing vast amounts of information including news events, historical data, market sentiment, and trading dynamics.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            Our Polymarket prediction tool uses artificial intelligence to automate this analysis process. The AI processes data from multiple sources, identifies patterns, calculates probabilities, and provides clear predictions with confidence scores - all in under 30 seconds per market.
          </p>
          <p className="text-black/70 leading-relaxed mb-4">
            The key advantage of AI-powered predictions is the ability to process information at scale. While human analysts can evaluate a handful of markets per day, our tool can analyze hundreds of Polymarket markets, identifying opportunities across all categories and market types.
          </p>
          <p className="text-black/70 leading-relaxed">
            Whether you're predicting political election outcomes, cryptocurrency price movements, sporting event results, or technology adoption trends, PolyAnalyser provides the AI-powered prediction tools you need to make informed trading decisions on Polymarket.
          </p>
        </div>
      </div>
    </div>
  );
}
