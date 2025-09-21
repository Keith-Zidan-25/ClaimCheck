"use client"

import React from 'react';
import { Shield, MessageSquare, Image, Link, Eye, Users, Database, Search, Bot, CheckCircle, AlertTriangle, Cpu, Globe } from 'lucide-react';

const FactCheckingWorkflow = () => {
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
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">ClaimCheck Docs</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#workflow" className="text-gray-300 hover:text-white transition-colors">Workflow</a>
                <a href="#text-verification" className="text-gray-300 hover:text-white transition-colors">Text</a>
                <a href="#media-verification" className="text-gray-300 hover:text-white transition-colors">Media</a>
                <a href="#human-loop" className="text-gray-300 hover:text-white transition-colors">Human Loop</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Fact-Checking
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Workflow</span>
              <br />for WhatsApp Bots
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Building a bot capable of verifying information requires a layered and strategic approach. 
              The core functionality can be broken down into a series of steps, with different tools and techniques 
              applied depending on the type of information received.
            </p>
          </div>
        </section>

        {/* Core Workflow Section */}
        <section id="workflow" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6">The Core Workflow</h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A verification process typically follows this logical flow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">1. Receive User Input</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The bot receives a message, which could be text, an image, a video, or a link.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">2. Input Classification</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The system identifies the type of content it needs to verify.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">3. Apply Verification Logic</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Based on the content type, the bot routes the request to the appropriate verification module.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">4. Generate Response</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The bot compiles results into a clear, concise, and sourced response indicating truth, falsity, or uncertainty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Text-Based Claims Section */}
        <section id="text-verification" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-8">
                <MessageSquare className="w-8 h-8 text-purple-400 mr-4" />
                <h3 className="text-3xl font-bold text-white">Verifying Text-Based Claims</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                This is the most common form of misinformation. The process relies heavily on automated data retrieval and analysis.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* NLP Section */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center mb-4">
                      <Cpu className="w-6 h-6 text-blue-400 mr-3" />
                      <h4 className="text-xl font-semibold text-white">Natural Language Processing</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      The first step uses NLP to analyze the user&apos;s text and identify the central claim or factual assertion. 
                      For example, &quot;Did scientists discover a cure for the common cold?&quot; becomes the extracted claim: 
                      &quot;Scientists discovered a cure for the common cold.&quot;
                    </p>
                  </div>

                  {/* Database Lookups */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center mb-4">
                      <Database className="w-6 h-6 text-green-400 mr-3" />
                      <h4 className="text-xl font-semibold text-white">Database & API Lookups</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Once the claim is extracted, the bot queries reliable, pre-existing fact-checking databases and 
                      cross-references with multiple sources for comprehensive verification.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Key Sources */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-white mb-4">Key Sources</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <Shield className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-sm">International Fact-Checking Network (IFCN) Database</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm">Reputable Fact-Checking Organizations (PolitiFact, Snopes)</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Search className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-sm">Search Grounding with Real-time Web Results</span>
                      </div>
                    </div>
                  </div>

                  {/* Cross-Referencing */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center mb-4">
                      <Globe className="w-6 h-6 text-indigo-400 mr-3" />
                      <h4 className="text-xl font-semibold text-white">Cross-Referencing</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      The bot compares extracted claims to database results, looking for direct matches or claims 
                      that have been widely debunked or verified by multiple sources.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Verification Section */}
        <section id="media-verification" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images and Videos */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-6">
                  <Image className="w-8 h-8 text-purple-400 mr-4" />
                  <h3 className="text-2xl font-bold text-white">Verifying Images & Videos</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Visual content is often used to spread misinformation, especially when taken out of context.
                </p>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <Search className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="font-semibold text-white">Reverse Image Search</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Find where else the image has appeared online to detect context manipulation.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <Database className="w-5 h-5 text-green-400 mr-2" />
                      <h4 className="font-semibold text-white">Metadata Analysis</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Analyze EXIF data for device info, timestamps, and GPS coordinates to flag inconsistencies.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <Eye className="w-5 h-5 text-red-400 mr-2" />
                      <h4 className="font-semibold text-white">Deepfake Detection</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Advanced analysis of visual inconsistencies like unnatural blinking patterns and lighting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Links and URLs */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-6">
                  <Link className="w-8 h-8 text-blue-400 mr-4" />
                  <h3 className="text-2xl font-bold text-white">Analyzing Links & URLs</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Many messages contain links to misleading websites or articles that require careful analysis.
                </p>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-purple-400 mr-2" />
                      <h4 className="font-semibold text-white">Domain Reputation Check</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Quick verification against known malicious or low-reputation sites to block spam and phishing.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <Search className="w-5 h-5 text-indigo-400 mr-2" />
                      <h4 className="font-semibold text-white">Content Extraction</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Scrape and analyze page content for sensational keywords and headline accuracy.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                      <h4 className="font-semibold text-white">Keyword Analysis</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Check if headlines accurately represent article content and flag misleading language.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Human-in-the-Loop Section */}
        <section id="human-loop" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center mb-8">
                <Users className="w-12 h-12 text-purple-400 mr-4" />
                <h3 className="text-4xl font-bold text-white">The Human-in-the-Loop Model</h3>
              </div>
              
              <div className="max-w-4xl mx-auto text-center mb-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  It&apos;s crucial to understand that a fully automated system is not a perfect solution. 
                  The most effective fact-checking bots incorporate a human-in-the-loop model.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3" />
                    <h4 className="text-xl font-semibold text-white">When Human Review is Needed</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm">Complex or nuanced claims that require contextual understanding</span>
                    </div>
                    <div className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm">New forms of misinformation not seen in training data</span>
                    </div>
                    <div className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm">Claims where automated confidence is below threshold</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <Cpu className="w-6 h-6 text-green-400 mr-3" />
                    <h4 className="text-xl font-semibold text-white">Continuous Improvement</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Human reviewers provide essential feedback and data to train and improve the AI models over time, 
                    ensuring the bot&apos;s accuracy evolves with new forms of misinformation and maintains high standards 
                    of verification quality.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-500/30">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-white font-semibold">Key Benefit</span>
                </div>
                <p className="text-center text-gray-200 leading-relaxed">
                  This hybrid approach combines the speed and scale of automation with the nuanced judgment and 
                  contextual understanding that only human expertise can provide, creating a robust and reliable 
                  fact-checking system.
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
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">ClaimCheck Docs</span>
              </div>
              <div className="text-gray-400 text-sm">
                © 2025 ClaimCheck. Advanced fact-checking workflows for WhatsApp bots.
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

export default FactCheckingWorkflow;