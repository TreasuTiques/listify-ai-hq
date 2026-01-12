import React, { useEffect, useState } from 'react';

interface ChatMessage {
  sender: 'user' | 'support';
  text: string;
  time: string;
}

const LandingPage: React.FC = () => {
  /* ===============================
     CHAT STATE
  =============================== */
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  /* ===============================
     EXIT INTENT STATE
  =============================== */
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentEmail, setExitIntentEmail] = useState('');
  const [exitIntentSubmitted, setExitIntentSubmitted] = useState(false);

  /* ===============================
     EXIT INTENT (DESKTOP ONLY)
  =============================== */
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [showExitIntent]);

  /* ===============================
     CHAT SUBMIT
  =============================== */
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: chatMessage, time: timeStr },
    ]);

    setChatMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'support',
          text:
            'Thanks for reaching out! Happy to help with pricing, features, or getting started.',
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          }),
        },
      ]);
    }, 1200);
  };

  /* ===============================
     EXIT INTENT SUBMIT
  =============================== */
  const handleExitIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitIntentEmail) return;
    setExitIntentSubmitted(true);
  };

  return (
    <div className="bg-white selection:bg-blue-100">

      {/* ===================================================== */}
      {/* YOUR ORIGINAL LANDING PAGE CONTENT LIVES ABOVE HERE */}
      {/* (UNCHANGED — header, hero, features, etc.) */}
      {/* ===================================================== */}


      {/* ===================================================== */}
      {/* LIVE CHAT WIDGET */}
      {/* ===================================================== */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all p-4 sm:px-6 sm:py-4 flex items-center gap-3"
          >
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              1
            </span>
            💬 <span className="hidden sm:inline font-bold">Questions? Chat with us!</span>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200 w-[380px] max-w-[calc(100vw-3rem)] flex flex-col h-[500px]">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div>
                <div className="font-bold">Customer Success</div>
                <div className="text-xs text-blue-100">Typically replies in minutes</div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.length === 0 && (
                <div className="text-sm text-slate-600">
                  👋 Hey there! Ask us anything.
                </div>
              )}

              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-2xl p-3 text-sm max-w-[80%] ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border text-slate-700'
                    }`}
                  >
                    {msg.text}
                    <div className="text-xs opacity-60 mt-1">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleChatSubmit} className="p-4 border-t flex gap-2">
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border"
              />
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white">
                ➤
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* EXIT INTENT POPUP */}
      {/* ===================================================== */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 sm:p-12 relative shadow-2xl">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100"
            >
              ✕
            </button>

            {!exitIntentSubmitted ? (
              <>
                <h3 className="text-3xl font-bold mb-4">
                  🎁 Wait! Before You Go…
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  Get our <strong>FREE Reseller’s Guide</strong> to maximizing eBay conversions.
                </p>

                <form onSubmit={handleExitIntentSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={exitIntentEmail}
                    onChange={(e) => setExitIntentEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-2xl border-2"
                  />
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
                    Send Me the Free Guide
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-3xl font-bold mb-3">Check Your Email ✅</h3>
                <p className="text-lg text-slate-600">
                  We sent the guide to <strong>{exitIntentEmail}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
