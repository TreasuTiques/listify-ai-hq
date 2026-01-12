</div>
      </section>

      {/* LIVE CHAT WIDGET - NEW #4 */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-110 p-4 sm:px-6 sm:py-4 flex items-center gap-3"
          >
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              1
            </span>
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="hidden sm:inline font-bold">Questions? Chat with us!</span>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200 w-[380px] max-w-[calc(100vw-3rem)] flex flex-col" style={{ height: '500px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    CS
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600"></span>
                </div>
                <div>
                  <div className="font-bold">Customer Success</div>
                  <div className="text-xs text-blue-100">Typically replies in minutes</div>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {/* Welcome message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  CS
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    <p className="text-sm text-slate-700">
                      👋 Hey there! I'm here to help. Have questions about pricing, features, or how Listify AI works?
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 ml-1">Just now</div>
                </div>
              </div>

              {/* Dynamic messages */}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.sender === 'support' && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      CS
                    </div>
                  )}
                  <div className="flex-1">
                    <div className={`rounded-2xl p-3 shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm ml-auto max-w-[80%]' 
                        : 'bg-white text-slate-700 rounded-tl-sm'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <div className={`text-xs text-slate-400 mt-1 ${msg.sender === 'user' ? 'text-right mr-1' : 'ml-1'}`}>
                      {msg.time}
                    </div>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0 flex items-center justify-center text-slate-600 text-xs font-bold">
                      You
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            {chatMessages.length === 0 && (
              <div className="px-4 py-3 border-t border-slate-200 bg-white">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick questions:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      setChatMessages([{ sender: 'user', text: 'Can I try it free?', time: timeStr }]);
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, {
                          sender: 'support',
                          text: 'Absolutely! Our free tier gives you 25 AI listings per month with no credit card required. Perfect for testing it out!',
                          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        }]);
                      }, 1500);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition"
                  >
                    🎁 Free trial
                  </button>
                  <button
                    onClick={() => {
                      const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      setChatMessages([{ sender: 'user', text: 'What categories work best?', time: timeStr }]);
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, {
                          sender: 'support',
                          text: 'Our AI works great across all categories! It excels with vintage tech, collectibles, electronics, and media. The more specific your photos, the better the results.',
                          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        }]);
                      }, 1500);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition"
                  >
                    📦 Categories
                  </button>
                </div>
              </div>
            )}

            <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:border-blue-500 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* EXIT INTENT POPUP - #3 ADDED */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 sm:p-12 relative shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600 font-bold"
            >
              ✕
            </button>

            {!exitIntentSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mb-4">
                    <span className="text-4xl">🎁</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Wait! Before You Go...</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Get our <strong className="text-blue-600">FREE Reseller's Guide</strong> to maximizing eBay listing conversions
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 flex-shrink-0 text-lg">✓</span>
                      <span><strong>15 proven title formulas</strong> that get clicks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 flex-shrink-0 text-lg">✓</span>
                      <span><strong>Photo tips</strong> from top sellers</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 flex-shrink-0 text-lg">✓</span>
                      <span><strong>SEO checklist</strong> for Cassini algorithm</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 flex-shrink-0 text-lg">✓</span>
                      <span><strong>Exclusive access</strong> to beta features</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleExitIntentSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={exitIntentEmail}
                      onChange={(e) => setExitIntentEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  >
                    Send Me the Free Guide
                  </button>
                  <p className="text-xs text-center text-slate-500">
                    No spam. Unsubscribe anytime. We respect your inbox.
                  </p>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-center gap-2 text-sm text-slate-600">
                  <span className="text-green-500">🔒</span>
                  <span>Join 5,000+ resellers getting our weekly tips</span>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h3 className="text-3xl font-bold text-[#0F172A] mb-3">Check Your Email!</h3>
                <p className="text-lg text-slate-600 mb-8">
                  We just sent the Reseller's Guide to <strong>{exitIntentEmail}</strong>
                </p>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;LocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      setChatMessages([{ sender: 'user', text: 'How does pricing work?', time: timeStr }]);
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, {
                          sender: 'support',
                          text: 'Great question! We have a free tier (25 listings/mo) and paid plans starting at $24/mo for 400 listings. All plans include our core AI features!',
                          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        }]);
                      }, 1500);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition"
                  >
                    💰 Pricing
                  </button>
                  <button
                    onClick={() => {
                      const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      setChatMessages([{ sender: 'user', text: 'Can I try it free?', time: timeStr }]);
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, {
                          sender: 'support',
                          text: 'Absolutely! Our free tier gives you 25 AI listings per month with no credit card required. Perfect for testing it out!',
                          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        }]);
                      }, 1500);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition"
                  >
                    🎁 Free trial
                  </button>
                  <button
                    onClick={() => {
                      const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      setChatMessages([{ sender: 'user', text: 'What categories work best?', time: timeStr }]);
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, {
                          sender: 'support',
                          text: 'Our AI works great across all categories! It excels with vintage tech, collectibles, electronics, and media. The more specific your photos, the better the results.',
                          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        }]);
                      }, 1500);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition"
                  >
                    📦 Categories
                  </button>
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:border-blue-500 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* EXIT INTENT POPUP - NEW #3 */}
