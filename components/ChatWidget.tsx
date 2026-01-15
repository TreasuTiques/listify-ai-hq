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
  hasSeenPricingCTA?: boolean;
  hasSeenAhaMoment?: boolean; // 👈 4.1
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

function inferPage(): Page {
  const combined = `${window.location.pathname} ${window.location.hash}`.toLowerCase();
  if (combined.includes("builder")) return "builder";
  if (combined.includes("pricing")) return "pricing";
  return "homepage";
}

function detectIntent(message: string): ChatIntent {
  const t = message.toLowerCase();
  if (t.includes("price") || t.includes("pricing") || t.includes("cost")) return "PRICING_CONCERN";
  if (t.includes("what does")) return "WHAT_IT_DOES";
  if (t.includes("like me") || t.includes("for resellers")) return "IS_FOR_ME";
  if (t.includes("different")) return "HOW_DIFFERENT";
  if (t.includes("test") || t.includes("try")) return "BEST_FIRST_TEST";
  return "JUST_BROWSING";
}

/* ---------------- 4.1 AHA MOMENT ---------------- */

function getAhaMoment(memory: ResellerMemory): string | null {
  if (memory.hasSeenAhaMoment) return null;

  if (memory.sellerType === "CASUAL") {
    return "Quick win: that one listing probably saved you ~15 minutes compared to writing it yourself.";
  }

  if (memory.sellerType === "PART_TIME") {
    return "Real talk — batching 20 items like this saves you around 4–5 hours.";
  }

  if (memory.sellerType === "FULL_TIME") {
    return "At your volume, this realistically saves you 10–15 hours every week.";
  }

  return "Even on one item, this saves time — the gains compound fast once you batch.";
}

/* ---------------- REPLIES ---------------- */

function getReply(intent: ChatIntent, page: Page, memory: ResellerMemory): string {
  if (page === "builder") {
    return "You’re in the builder — upload 4–6 clear photos (front, back, label, detail, flaw). I’ll handle the rest.";
  }

  if (intent === "PRICING_CONCERN") {
    if (memory.hasSeenPricingCTA) {
      return "You’ve already got the options below. Want help testing an item or dialing in your workflow?";
    }
    if ((memory.pricingTouches ?? 0) >= 2) {
      return "Sounds like pricing matters. Want to test one item or see the plans?";
    }
    return "Most people decide after testing one real item. Want to try that or see plans?";
  }

  switch (intent) {
    case "WHAT_IT_DOES":
      return "Photos in → clean title + HTML out. Paste straight into eBay.";
    case "HOW_DIFFERENT":
      return "This builds listings the way resellers actually post them — structured and fast.";
    case "BEST_FIRST_TEST":
      return "Grab one item you already have photos for and upload 4–6 pics.";
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
    pricingTouches: 0,
    hasSeenPricingCTA: false,
    hasSeenAhaMoment: false,
  });

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Yo — I’m your reseller buddy. Want to test this with a real item you’re listing today?",
    },
  ]);

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setPage(inferPage());
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    if (!text.trim() || loading) return;

    const intent = detectIntent(text);
    const t = text.toLowerCase();
    const nextMemory = { ...memory };

    if (t.includes("weekend")) nextMemory.sellerType = "CASUAL";
    if (t.includes("batch") || t.includes("storage")) nextMemory.sellerType = "PART_TIME";
    if (t.includes("full time") || t.includes("daily")) nextMemory.sellerType = "FULL_TIME";

    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      if (nextMemory.pricingTouches >= 2) nextMemory.hasSeenPricingCTA = true;
    }

    const reply = getReply(intent, page, nextMemory);
    const aha = getAhaMoment(nextMemory);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: reply },
      ...(aha ? [{ role: "assistant", content: aha }] : []),
    ]);

    if (aha) nextMemory.hasSeenAhaMoment = true;

    setMemory(nextMemory);
    setInput("");
  }

  const cta = getAdaptiveCTA(memory);
  const showPricingActions = memory.hasSeenPricingCTA && page !== "builder";

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
        <div className="w-[420px] h-[560px] bg-white border rounded-2xl shadow-2xl flex flex-col">
          <div className="px-4 py-3 border-b flex justify-between">
            <div className="font-bold">Reseller Buddy</div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm max-w-[85%] ${
                    m.role === "user" ? "bg-[#2563EB] text-white" : "bg-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {showPricingActions && (
              <div className="flex gap-2">
                <button onClick={() => navigateTo("builder")} className="flex-1 border rounded-xl px-3 py-2 text-sm font-bold">
                  {cta.primary}
                </button>
                <button onClick={() => navigateTo("pricing")} className="flex-1 bg-[#2563EB] text-white rounded-xl px-3 py-2 text-sm font-bold">
                  {cta.secondary}
                </button>
              </div>
            )}
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
