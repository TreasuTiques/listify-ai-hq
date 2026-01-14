import React, { useEffect, useMemo, useRef, useState } from "react";

type ChatIntent =
  | "WHAT_IT_DOES"
  | "IS_FOR_ME"
  | "HOW_DIFFERENT"
  | "BEST_FIRST_TEST"
  | "PRICING_CONCERN"
  | "JUST_BROWSING";

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

/* ---------------- INTENT LOGIC ---------------- */

function detectIntent(message: string): ChatIntent {
  const t = message.toLowerCase();

  if (t.includes("what does")) return "WHAT_IT_DOES";
  if (t.includes("for resellers") || t.includes("like me")) return "IS_FOR_ME";
  if (t.includes("different")) return "HOW_DIFFERENT";
  if (t.includes("best") || t.includes("test")) return "BEST_FIRST_TEST";
  if (t.includes("price") || t.includes("worth") || t.includes("cost")) return "PRICING_CONCERN";

  return "JUST_BROWSING";
}

/* ---------------- SILENT CONVERSION REPLIES ---------------- */

function getReply(intent: ChatIntent, page: Page): string {
  switch (intent) {
    case "WHAT_IT_DOES":
      return (
        "Quick breakdown: you drop photos in, I generate a clean title and HTML you can paste straight into eBay.\n\n" +
        "Most sellers test it on one item they already photographed and compare the results."
      );

    case "IS_FOR_ME":
      return (
        "If you list thrift, storage units, estate sales, or random finds — yeah, this was built for you.\n\n" +
        "It’s about speed and batching, not perfect studio listings."
      );

    case "HOW_DIFFERENT":
      return (
        "Most tools just write paragraphs.\n\n" +
        "This builds listings the way resellers actually post them: structured sections, readable, and fast to paste."
      );

    case "BEST_FIRST_TEST":
      return (
        "Best first test: grab one item you already have photos for.\n\n" +
        "Upload 4–6 photos, generate a listing, and compare it to your current one. That’s usually the ‘ohh okay’ moment."
      );

    case "PRICING_CONCERN":
      return (
        "Totally fair to ask.\n\n" +
        "Most sellers decide after testing one real item and seeing how much time it saves.\n\n" +
        "Out of curiosity — about how many items do you list in a typical week?"
      );

    default:
      if (page === "builder") {
        return (
          "You’re in the right spot.\n\n" +
          "Don’t overthink it — clear photos in, let the tool do the heavy lifting."
        );
      }

      if (page === "pricing") {
        return (
          "No rush here.\n\n" +
          "A lot of people land on a plan after they see how fast one listing comes together."
        );
      }

      return (
        "All good — happy to help.\n\n" +
        "What kind of items are you usually listing?"
      );
  }
}

/* ---------------- COMPONENT ---------------- */

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

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const intent = detectIntent(trimmed);
    const reply = getReply(intent, page);

    const next = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages([...next, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 350);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#2563EB] text-white px-5 py-3 shadow-xl font-bold hover:bg-blue-700 transition"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-[92vw] sm:w-[420px] h-[70vh] sm:h-[560px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <div>
              <div className="font-bold">Reseller Buddy</div>
              <div className="text-xs text-slate-500">Page: {page}</div>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="px-4 py-3 bg-slate-50 border-b">
            <div className="flex gap-2 flex-wrap">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.message)}
                  className="text-xs px-3 py-1.5 rounded-full border bg-white"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm max-w-[85%] ${
                    m.role === "user"
                      ? "bg-[#2563EB] text-white"
                      : "bg-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-slate-400">Typing…</div>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 border rounded-xl px-3 py-2 text-sm"
            />
            <button
              disabled={loading}
              className="bg-[#2563EB] text-white px-4 py-2 rounded-xl font-bold"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
