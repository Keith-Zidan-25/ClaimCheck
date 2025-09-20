import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Info, Zap, Eye, Users } from 'lucide-react';

interface APIResult {
  credibilityScore: number;
  riskLevel: string;
  factChecks: { claim: string; status: string; confidence: number }[];
  sources: number;
  similarClaims: number;
}

const MisinformationDetector = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<APIResult | null>(null);

  const analyzeText = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockResult = {
      credibilityScore: Math.floor(Math.random() * 40) + 60,
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      factChecks: [
        { claim: "Climate data statistics", status: "verified", confidence: 0.92 },
        { claim: "Economic figures mentioned", status: "partially_verified", confidence: 0.78 },
      ],
      sources: 3,
      similarClaims: 12
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch(level) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Info className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">TruthGuard</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">API</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Detect
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Misinformation</span>
              <br />Instantly
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Powered by advanced AI, our platform analyzes text in real-time to identify potential misinformation, 
              verify claims, and provide credibility scores.
            </p>

            {/* Main Input Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste any text, article, or claim you want to fact-check here..."
                    className="w-full h-40 p-6 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                    disabled={isAnalyzing}
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {inputText.length}/5000
                  </div>
                </div>

                <button
                  onClick={analyzeText}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Analyze Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Results Section */}
              {result && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Credibility Score */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Credibility Score</h3>
                        <Zap className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{result.credibilityScore}%</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${result.credibilityScore }%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className={`rounded-2xl p-6 border ${getRiskColor(result.riskLevel)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Risk Level</h3>
                        {getRiskIcon(result.riskLevel)}
                      </div>
                      <div className="text-2xl font-bold capitalize">{result.riskLevel}</div>
                    </div>

                    {/* Sources Found */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Sources</h3>
                        <Eye className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{result.sources}</div>
                      <div className="text-sm text-gray-300">Verified sources found</div>
                    </div>
                  </div>

                  {/* Fact Checks */}
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      Fact Check Results
                    </h3>
                    <div className="space-y-3">
                      {result.factChecks.map((check, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-gray-300">{check.claim}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              check.status === 'verified' ? 'bg-green-100 text-green-800' :
                              check.status === 'partially_verified' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {check.status.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-400">{Math.floor(check.confidence * 100)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-white mb-4">How TruthGuard Works</h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our advanced AI system combines multiple verification techniques to provide accurate results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">AI Analysis</h4>
                <p className="text-gray-300 leading-relaxed">
                  Advanced natural language processing analyzes text patterns, context, and linguistic markers to identify potential misinformation.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">Source Verification</h4>
                <p className="text-gray-300 leading-relaxed">
                  Cross-references claims with trusted databases and fact-checking organizations to verify information accuracy.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">Real-time Results</h4>
                <p className="text-gray-300 leading-relaxed">
                  Get instant credibility scores and detailed analysis reports to make informed decisions about information reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">TruthGuard</span>
              </div>
              <div className="text-gray-400 text-sm">
                © 2025 TruthGuard. Fighting misinformation with AI.
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MisinformationDetector;