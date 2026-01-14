import React, { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */

type ChatIntent =
  | "WHAT_IT_DOES"
  | "IS_FOR_ME"
  | "HOW_DIFFERENT"
  | "BEST_FIRST_TEST"
  | "PRICING_CONCERN"
  | "JUST_BROWSING";

type Page = "homepage" | "builder" | "pricing";
type Msg = { role: "user" | "assistant"; content: string };

type ConversationStage =
  | "INTRO"
  | "QUALIFIED"
  | "READY_TO_TEST"
  | "PRICING_AWARE";

type ResellerMemory = {
  listingVolume?: "LOW" | "MEDIUM" | "HIGH";
  sellerType?: "CASUAL" | "PART_TIME" | "FULL_TIME";
  stage?: ConversationStage;
  pricingTouches?: number;
  hasSeenPricingCTA?: boolean; // 👈 3.5C
};

/* ---------------- NAVIGATION ---------------- */

function navigateTo(dest: "builder" | "pricing") {
  if (dest === "builder") {
    window.location.href = "https://www.listifyaihq.com/#/builder";
  }
  if (dest === "pricing") {
    window.location.href = "https://www.listifyaihq.com/#/pricing";
  }
}

/* ---------------- ADAPTIVE CTA (3.5B) ---------------- */

function getAdaptiveCTA(memory: ResellerMemory) {
  if (memory.sellerType === "CASUAL") {
    return {
      primary: "Try one item (no commitment)",
      secondary: "See simple pricing",
    };
  }

  if (memory.sellerType === "PART_TIME") {
    return {
      primary: "Test a real item now",
      secondary: "See batch pricing",
    };
  }

  if (memory.sellerType === "FULL_TIME") {
    return {
      primary: "Run a real listing test",
      secondary: "View pro pricing",
    };
  }

  return {
    primary: "Try one item now",
    secondary: "See pricing",
  };
}

/* ---------------- HELPERS ---------------- */

function inferPage(pathname: string): Page {
  const p = pathname.toLowerCase();
  if (p.includes("builder")) return "builder";
  if (p.includes("pricing")) return "pricing";
  return "homepage";
}

function detectIntent(message: string): ChatIntent {
  const t = message.toLowerCase();

  if (
    t.includes("price") ||
    t.includes("pricing") ||
    t.includes("worth") ||
    t.includes("cost")
  )
    return "PRICING_CONCERN";

  if (t.includes("what does")) return "WHAT_IT_DOES";
  if (t.includes("for resellers") || t.includes("like me")) return "IS_FOR_ME";
  if (t.includes("different")) return "HOW_DIFFERENT";
  if (t.includes("best") || t.includes("test") || t.includes("try one"))
    return "BEST_FIRST_TEST";

  return "JUST_BROWSING";
}

/* ---------------- REPLIES (3.5C SAFE) ---------------- */

function getReply(intent: ChatIntent, memory: ResellerMemory): string {
  if (intent === "PRICING_CONCERN") {
    if (memory.hasSeenPricingCTA) {
      return "You’ve already got the options. Want help testing an item or tightening your workflow?";
    }

    if ((memory.pricingTouches ?? 0) >= 2) {
      return "Got it — sounds like pricing matters to you. Want me to show you the plans or help you test one item first?";
    }

    return "Most people decide after testing one real item. Want to try that or see plans?";
  }

  switch (intent) {
    case "WHAT_IT_DOES":
      return "Photos in → clean title + HTML out. Paste straight into eBay.";

    case "IS_FOR_ME":
      return "If you list thrift, storage units, or estate sales — yeah, this was built for you.";

    case "HOW_DIFFERENT":
      return "This builds listings the way resellers actually post them. Structured and fast.";

    case "BEST_FIRST_TEST":
      return "Best test: upload 4–6 photos from an item you already have.";

    default:
      return "All good. What kind of items are you usually listing?";
  }
}

/* ---------------- COMPONENT ---------------- */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<Page>("homepage");
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState<ResellerMemory>({
    stage: "INTRO",
    pricingTouches: 0,
  });

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
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const intent = detectIntent(trimmed);
    const t = trimmed.toLowerCase();
    const nextMemory: ResellerMemory = { ...memory };

    // Seller profiling
    if (t.includes("weekend") || t.includes("casual")) {
      nextMemory.sellerType = "CASUAL";
      nextMemory.listingVolume = "LOW";
    }

    if (t.includes("batch") || t.includes("storage") || t.includes("estate")) {
      nextMemory.sellerType = "PART_TIME";
      nextMemory.listingVolume = "MEDIUM";
    }

    if (t.includes("full time") || t.includes("daily")) {
      nextMemory.sellerType = "FULL_TIME";
      nextMemory.listingVolume = "HIGH";
    }

    // Pricing escalation
    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      nextMemory.stage = "PRICING_AWARE";

      if ((nextMemory.pricingTouches ?? 0) >= 2) {
        nextMemory.hasSeenPricingCTA = true;
      }
    }

    setMemory(nextMemory);

    const reply = getReply(intent, nextMemory);

    const nextMsgs = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMsgs);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages([...nextMsgs, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 300);
  }

  const showPricingActions = memory.hasSeenPricingCTA;
  const cta = getAdaptiveCTA(memory);

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#2563EB] text-white px-5 py-3 shadow-xl font-bold"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-[420px] h-[560px] bg-white border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b flex justify-between">
            <div className="font-bold">Reseller Buddy</div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-auto px-4 py-4 space-y-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : ""}`}
              >
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

            {showPricingActions && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigateTo("builder")}
                  className="flex-1 border rounded-xl px-3 py-2 text-sm font-bold"
                >
                  {cta.primary}
                </button>
                <button
                  onClick={() => navigateTo("pricing")}
                  className="flex-1 bg-[#2563EB] text-white rounded-xl px-3 py-2 text-sm font-bold"
                >
                  {cta.secondary}
                </button>
              </div>
            )}

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
            <button className="bg-[#2563EB] text-white px-4 py-2 rounded-xl font-bold">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
