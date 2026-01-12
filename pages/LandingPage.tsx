import React, { useEffect, useState } from 'react';

/* ===============================
   TYPES
=============================== */
interface ChatMessage {
  sender: 'user' | 'support';
  text: string;
  time: string;
}

/* ===============================
   COMPONENT
=============================== */
const LandingPage: React.FC = () => {
  /* ---------- Chat ---------- */
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  /* ---------- Exit Intent ---------- */
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentEmail, setExitIntentEmail] = useState('');
  const [exitIntentSubmitted, setExitIntentSubmitted] = useState(false);

  /* ===============================
     EXIT INTENT (DESKTOP ONLY)
  =============================== */
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

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

    const time = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: chatMessage, time },
    ]);
    setChatMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'support',
          text:
            'Thanks for reaching out! I can help with pricing, features, or getting started.',
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
    <div className="bg-white selection:bg-blue-100 relative">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}
      <section className="relative pt-24 pb-32 bg-gradient-to-b from-white to-blue-50/60">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-5xl xl:text-6xl font-semibold text-slate-900 leading-tight mb-6">
              Create High-Converting eBay Listings from Photos —
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Instantly
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl mb-8">
              Upload product photos and generate SEO-ready titles and clean HTML
              descriptions built for real resellers.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition">
              Create My First Listing Free
            </button>
          </div>

          <div className="bg-white rounded-3xl border shadow-2xl p-4">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000"
              alt="Listing preview"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURES */}
      {/* ===================================================== */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            ['🧠', 'AI Product Vision', 'Detects brand and model from photos'],
            ['🏷', 'Cassini Titles', 'Keyword-aware buyer phrasing'],
            ['🧾', 'Clean HTML', 'Paste directly into eBay'],
            ['⚡', 'Batch Speed', 'List faster, source more'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="p-6 rounded-2xl border shadow-sm">
              <div className="text-2xl mb-2">{icon}</div>
              <h4 className="font-bold text-slate-900">{title}</h4>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Stop typing. Start selling.
          </h2>
          <p className="text-lg text-slate-500 mb-8">
            Your next listing is already in your camera roll.
          </p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition">
            Get Started Free
          </button>
        </div>
      </section>

      {/* ===================================================== */}
      {/* LIVE CHAT WIDGET */}
      {/* ===================================================== */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-6 py-4 shadow-2xl flex items-center gap-2 hover:scale-110 transition"
          >
            💬 <span className="font-bold">Questions? Chat with us</span>
          </button>
        ) : (
          <div className="bg-white w-[360px] h-[480px] rounded-2xl border shadow-2xl flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
              <span className="font-bold">Customer Success</span>
              <button onClick={() => setShowChat(false)}>✕</button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
              {chatMessages.length === 0 && (
                <p className="text-sm text-slate-500">👋 Ask us anything!</p>
              )}
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm px-4 py-2 rounded-2xl max-w-[80%] ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-white border text-slate-700'
                  }`}
                >
                  {m.text}
                  <div className="text-[10px] opacity-60 mt-1">{m.time}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="p-3 border-t flex gap-2">
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border text-sm"
              />
              <button className="bg-blue-600 text-white w-10 h-10 rounded-full">
                ➤
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* EXIT INTENT MODAL */}
      {/* ===================================================== */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 relative shadow-2xl">
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
                  Get our <strong>FREE Reseller Guide</strong> to higher-converting listings.
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
                  Sent to <strong>{exitIntentEmail}</strong>
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
