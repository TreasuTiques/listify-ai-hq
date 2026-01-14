import React, { useEffect, useMemo, useRef, useState } from "react";

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
  hasSeenPricingCTA?: boolean; // 3.5C
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

// IMPORTANT: your site uses hash routes (#/builder, #/pricing)
// so we detect page from BOTH pathname and hash.
function inferPage(): Page {
  const path = (window.location.pathname || "").toLowerCase();
  const hash = (window.location.hash || "").toLowerCase(); // "#/builder"

  const combined = `${path} ${hash}`;

  if (combined.includes("builder")) return "builder";
  if (combined.includes("pricing")) return "pricing";
  return "homepage";
}

function detectIntent(message: string): ChatIntent {
  const t = message.toLowerCase();

  if (
    t.includes("price") ||
    t.includes("pricing") ||
    t.includes("worth") ||
    t.includes("cost") ||
    t.includes("plan") ||
    t.includes("plans")
  )
    return "PRICING_CONCERN";

  if (t.includes("what does")) return "WHAT_IT_DOES";
  if (t.includes("for resellers") || t.includes("like me")) return "IS_FOR_ME";
  if (t.includes("different")) return "HOW_DIFFERENT";
  if (t.includes("best") || t.includes("test") || t.includes("try one"))
    return "BEST_FIRST_TEST";

  return "JUST_BROWSING";
}

/* ---------------- REPLIES (4.0 + 3.5C SAFE) ---------------- */

function getReply(intent: ChatIntent, page: Page, memory: ResellerMemory): string {
  // 4.0 — Builder-aware coaching (no pricing loop here)
  if (page === "builder") {
    switch (intent) {
      case "BEST_FIRST_TEST":
        return "You’re already in the builder — perfect. Upload 4–6 photos (front, back, label, detail, flaw). Front photo first works best.";
      case "PRICING_CONCERN":
        return "Let’s finish one listing first — pricing makes way more sense once you see the output. Upload photos and I’ll guide you.";
      case "WHAT_IT_DOES":
        return "In the builder: photos in → title + clean description out. Your job is clear pics; I’ll handle the words.";
      default:
        return "You’re in the builder. Start with your clearest front photo, then add back/label/detail. If anything’s damaged, include one flaw pic.";
    }
  }

  // Pricing handling (3.5C safe)
  if (intent === "PRICING_CONCERN") {
    if (memory.hasSeenPricingCTA) {
      return "You’ve already got the options below. Want help testing an item or tightening your batch workflow?";
    }

    if ((memory.pricingTouches ?? 0) >= 2) {
      return "Got it — sounds like pricing matters to you. Want me to show you the plans or help you test one item first?";
    }

    // If we know seller type/volume, make this tighter
    if (memory.sellerType === "CASUAL") {
      return "If you’re listing casually, the fastest way to know is testing one item. Want to try one now or see simple pricing?";
    }
    if (memory.sellerType === "PART_TIME") {
      return "Batch sellers usually feel it fast once they run one real item. Want to test one or see batch pricing?";
    }
    if (memory.sellerType === "FULL_TIME") {
      return "At full-time volume, time saved adds up quick. Want to run a real listing test or jump to pro pricing?";
    }

    return "Most people decide after testing one real item. Want to try that or see plans?";
  }

  switch (intent) {
    case "WHAT_IT_DOES":
      return "Photos in → clean title + HTML out. Paste straight into eBay.";

    case "IS_FOR_ME":
      return "If you list thrift, storage units, or estate sales — yeah, this was built for you.";

    case "HOW_DIFFERENT":
      return "This builds listings the way resellers actually post them. Structured, readable, and fast to paste.";

    case "BEST_FIRST_TEST":
      return "Best test: grab one item you already have photos for. Upload 4–6 photos and compare the output side-by-side.";

    default:
      if (page === "pricing") {
        return "If you tell me how often you list (weekends vs batching), I’ll point you to the plan that makes sense.";
      }
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
    hasSeenPricingCTA: false,
  });

  // Initial message becomes page-aware (4.0)
  const initialAssistantMessage = useMemo(() => {
    if (page === "builder") {
      return "You’re in the builder. Upload 4–6 clear photos (front, back, label, detail, flaw). I’ll guide you from there.";
    }
    if (page === "pricing") {
      return "Quick question — are you listing weekends, batching hauls, or full-time? I’ll point you to the right plan.";
    }
    return "Yo — I’m your reseller buddy. Want to test this with a real item you’re listing today?";
  }, [page]);

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Yo — I’m your reseller buddy. Want to test this with a real item you’re listing today?" },
  ]);

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  // Keep page in sync with hash changes too
  useEffect(() => {
    const update = () => setPage(inferPage());
    update();

    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  // When page changes, refresh the very first assistant message (without spamming)
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const first = prev[0];
      if (first.role !== "assistant") return prev;

      // Only rewrite if the user hasn't started chatting yet (keeps chat stable)
      if (prev.length === 1) {
        return [{ role: "assistant", content: initialAssistantMessage }];
      }
      return prev;
    });
  }, [initialAssistantMessage]);

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
      nextMemory.stage = "QUALIFIED";
    }

    if (t.includes("batch") || t.includes("storage") || t.includes("estate")) {
      nextMemory.sellerType = "PART_TIME";
      nextMemory.listingVolume = "MEDIUM";
      nextMemory.stage = "QUALIFIED";
    }

    if (t.includes("full time") || t.includes("daily") || t.includes("hundreds")) {
      nextMemory.sellerType = "FULL_TIME";
      nextMemory.listingVolume = "HIGH";
      nextMemory.stage = "QUALIFIED";
    }

    // Pricing escalation (3.5C)
    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      nextMemory.stage = "PRICING_AWARE";

      // only set CTA after 2 touches
      if ((nextMemory.pricingTouches ?? 0) >= 2) {
        nextMemory.hasSeenPricingCTA = true;
      }
    }

    setMemory(nextMemory);

    const reply = getReply(intent, page, nextMemory);

    const nextMsgs = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMsgs);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages([...nextMsgs, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 300);
  }

  // Don't show pricing actions on builder page (4.0)
  const showPricingActions =
    page !== "builder" && memory.hasSeenPricingCTA === true;

  const cta = getAdaptiveCTA(memory);

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
