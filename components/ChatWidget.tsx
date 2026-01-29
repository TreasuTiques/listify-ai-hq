import React, { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */
type Msg = { role: "user" | "assistant"; content: string };

/* ---------------- ANALYTICS ---------------- */
function track(event: string, props: Record<string, any> = {}) {
  if ((window as any).analytics?.track) {
    (window as any).analytics.track(event, props);
  }
}

/* ---------------- NAVIGATION ---------------- */
function navigateTo(dest: "builder" | "pricing") {
  track("navigate", { dest });
  window.location.hash = dest === "builder" ? "/builder" : "/pricing";
}

/* ---------------- COMPONENT ---------------- */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (open) track("chat_opened");
  }, [open]);

  async function send(text: string) {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Call API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text,
          history: messages.slice(-6) 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error Code: ${response.status} (${data.error || 'Unknown'})`);
      }

      const reply = typeof data?.reply === "string" ? data.reply : "Connection success, but empty reply.";

      // 3. Add AI Reply
      const aiMsg: Msg = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, aiMsg]);

    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: `DEBUG ERROR: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] font-sans">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>Chat with Buddy</span>
        </button>
      )}

      {open && (
        <div className="w-[380px] h-[550px] bg-white border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <span className="font-bold">Reseller Buddy</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:text-gray-200 font-bold text-xl">×</button>
          </div>

          {/* Chat Area */}
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center mt-10 text-gray-500">
                <p>👋 Hi! I'm your AI Reseller Buddy.</p>
                <p className="text-sm mt-2">Ask me anything about listing, pricing, or "death piles".</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border text-gray-800 rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-4 py-2 rounded-2xl rounded-bl-none text-gray-500 text-sm animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="px-4 pt-2 flex gap-2">
             <button onClick={() => navigateTo("builder")} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-bold hover:bg-blue-200 transition">
               📸 Try one item
             </button>
             <button onClick={() => navigateTo("pricing")} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
               💲 Pricing
             </button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 bg-white border-t flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              // FIX: Added 'text-slate-900' to force text to be dark/visible against the light gray background
              // Also added 'placeholder:text-slate-500' for better visibility
              className="flex-1 bg-gray-100 text-slate-900 placeholder:text-slate-500 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
