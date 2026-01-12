import React, { useEffect, useState } from 'react';

interface ChatMessage {
  sender: 'user' | 'support';
  text: string;
  time: string;
}

const LandingPage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentEmail, setExitIntentEmail] = useState('');
  const [exitIntentSubmitted, setExitIntentSubmitted] = useState(false);

  /* ===============================
     EXIT INTENT LOGIC
  =============================== */
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);
    return () => document.removeEventListener('mouseout', handleMouseLeave);
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

    const userMsg: ChatMessage = {
      sender: 'user',
      text: chatMessage,
      time: timeStr,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'support',
          text:
            'Thanks for reaching out! Let me know what you’d like to know about pricing, features, or getting started.',
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
    <div className="relative">

      {/* ===============================
         LIVE CHAT WIDGET
      =============================== */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition p-4 sm:px-6 flex items-center gap-3"
          >
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              1
            </span>
            💬 <span className="hidden sm:inline font-bold">Questions? Chat with us</span>
          </button>
        ) : (
          <div className="bg-white w-[380px] max-w-[calc(100vw-3rem)] h-[500px] rounded-2xl shadow-2xl border flex flex-col">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
              <div>
                <div className="font-bold">Customer Success</div>
                <div className="text-xs text-blue-100">Replies in minutes</div>
              </div>
              <button onClick={() => setShowChat(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {chatMessages.length === 0 && (
                <p className="text-sm text-slate-500">
                  👋 Hi! Ask us anything about Listify AI.
                </p>
              )}

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-700 border'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] opacity-60 mt-1">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleChatSubmit} className="p-3 border-t flex gap-2">
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border text-sm"
              />
              <button className="bg-blue-600 text-white rounded-full w-10 h-10">
                ➤
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ===============================
         EXIT INTENT MODAL
      =============================== */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100"
            >
              ✕
            </button>

            {!exitIntentSubmitted ? (
              <>
                <h3 className="text-3xl font-bold mb-3">
                  🎁 Before you go…
                </h3>
                <p className="text-slate-600 mb-6">
                  Get our <strong>FREE Reseller Guide</strong> to higher-converting eBay listings.
                </p>

                <form onSubmit={handleExitIntentSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={exitIntentEmail}
                    onChange={(e) => setExitIntentEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 rounded-xl border"
                  />
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                    Send Me the Guide
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-3">Check your email ✅</h3>
                <p className="text-slate-600">
                  Guide sent to <strong>{exitIntentEmail}</strong>
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
