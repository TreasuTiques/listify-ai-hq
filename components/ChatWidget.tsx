import React, { useEffect, useMemo, useRef, useState } from "react";

type Page = "homepage" | "builder" | "pricing";
type Msg = { role: "user" | "assistant"; content: string };

const suggestionsByPage: Record<Page, { label: string; message: string }[]> = {
  homepage: [
    { label: "What does this do?", message: "What does this actually do?" },
    { label: "Is this for resellers?", message: "Is this built for resellers like me?" },
    { label: "How is it different?", message: "How is this different from writing it myself?" },
    { label: "Best first test?", message: "What’s the best way to test this on a real item?" },
  ],
  builder: [
    { label: "Photo tips", message: "What makes a good photo for best results?" },
    { label: "Paste into eBay?", message: "Can I paste the output directly into eBay?" },
    { label: "Titles help", message: "How do you build good eBay titles?" },
    { label: "Batch workflow", message: "What’s the fastest workflow to list 20 items?" },
  ],
  pricing: [
    { label: "Which plan fits me?", message: "Which plan fits my listing volume?" },
    { label: "Worth it part-time?", message: "Is this worth it if I only list weekends?" },
    { label: "What do I get?", message: "What exactly changes between plans?" },
    { label: "Cancel anytime?", message: "Can I cancel anytime?" },
  ],
};

function inferPage(pathname: string): Page {
  const p = pathname.toLowerCase();
  if (p.includes("builder")) return "builder";
  if (p.includes("pricing")) return "pricing";
  return "homepage";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<Page>("homepage");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Yo — I’m your reseller buddy. Want to test this with a real item you’re listing today?",
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(inferPage(window.location.pathname || "/"));
  }, []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const suggestions = useMemo(() => suggestionsByPage[page], [page]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // ✅ STUB reply for now (Step 1 is UI only)
    const quickReply =
      page === "pricing"
        ? "Totally fair to check pricing. Quick question: how many items do you list per week?"
        : page === "builder"
        ? "Perfect. Start with 4 photos: front, back, label, any flaw. Want a quick checklist?"
        : "Here’s the vibe: photos in, clean title + HTML out. Want to test it on one item right now?";

    setTimeout(() => {
      setMessages([...next, { role: "assistant", content: quickReply }]);
      setLoading(false);
    }, 350);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#2563EB] text-white px-5 py-3 shadow-xl font-bold hover:bg-blue-700 transition"
          aria-label="Open chat"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-[92vw] sm:w-[420px] max-w-[420px] h-[70vh] sm:h-[560px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 leading-tight">Reseller Buddy</div>
              <div className="text-xs text-slate-500">Page: {page}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-slate-800 font-bold"
              aria-label="Close chat"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex gap-2 flex-wrap">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.message)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition"
                  type="button"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#2563EB] text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-900 rounded-2xl px-4 py-2 text-sm">
                  Typing…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-slate-200 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#2563EB] text-white px-4 py-2 font-bold hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
