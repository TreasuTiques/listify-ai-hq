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

type ResellerMemory = {
  sellerType?: "CASUAL" | "PART_TIME" | "FULL_TIME";
  pricingTouches?: number;
  hasSeenPricingCTA?: boolean;

  // 4.x conversion memory
  hasSeenAhaMoment?: boolean;        // 4.1
  hasSeenConfidenceBoost?: boolean;  // 4.2
  hasSeenSocialProof?: boolean;      // 4.3
  hasSeenRevenueMath?: boolean;      // 4.4
};

/* ---------------- NAVIGATION ---------------- */

function navigateTo(dest: "builder" | "pricing") {
  window.location.href =
    dest === "builder"
      ? "https://www.listifyaihq.com/#/builder"
      : "https://www.listifyaihq.com/#/pricing";
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
  if (t.includes("price") || t.includes("pricing") || t.includes("cost"))
    return "PRICING_CONCERN";
  if (t.includes("what does")) return "WHAT_IT_DOES";
  if (t.includes("different")) return "HOW_DIFFERENT";
  if (t.includes("test") || t.includes("try")) return "BEST_FIRST_TEST";
  return "JUST_BROWSING";
}

/* ---------------- 4.x CONVERSION MOMENTS ---------------- */

function getAhaMoment(memory: ResellerMemory) {
  if (memory.hasSeenAhaMoment) return null;

  if (memory.sellerType === "FULL_TIME")
    return "At your volume, this realistically saves 10–15 hours every week.";

  if (memory.sellerType === "PART_TIME")
    return "Batching listings like this saves around 4–5 hours per batch.";

  return "Even one listing like this saves ~15 minutes versus writing it manually.";
}

function getConfidenceBoost(memory: ResellerMemory) {
  if (memory.hasSeenConfidenceBoost) return null;
  return "Quick confidence check: this output is already cleaner than about 80% of eBay listings.";
}

function getSocialProof(memory: ResellerMemory) {
  if (memory.hasSeenSocialProof) return null;
  return "Most resellers start with one item to test it, then batch once they see the output.";
}

function getRevenueMath(memory: ResellerMemory) {
  if (memory.hasSeenRevenueMath) return null;

  if (memory.sellerType === "FULL_TIME")
    return "Saving 10+ hours a week usually means 40–60 more listings per month.";

  if (memory.sellerType === "PART_TIME")
    return "Those saved hours often turn into 25–40 extra listings a month.";

  return "Even casually, those minutes add up to a few extra listings each week.";
}

/* ---------------- REPLIES ---------------- */

function getReply(intent: ChatIntent, page: Page, memory: ResellerMemory): string {
  if (page === "builder") {
    return "You’re in the builder — upload 4–6 clear photos and I’ll generate the listing.";
  }

  if (intent === "PRICING_CONCERN") {
    if (memory.hasSeenPricingCTA)
      return "You’ve already got the options below. Want help testing an item or optimizing your flow?";

    if ((memory.pricingTouches ?? 0) >= 2)
      return "Sounds like pricing matters. Want to test one item or see the plans?";

    return "Most people decide after testing one real item. Want to try that or see pricing?";
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
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const [memory, setMemory] = useState<ResellerMemory>({
    pricingTouches: 0,
  });

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(inferPage());
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  function send(text: string) {
    if (!text.trim()) return;

    const intent = detectIntent(text);
    const t = text.toLowerCase();
    const nextMemory = { ...memory };

    if (t.includes("storage") || t.includes("batch")) nextMemory.sellerType = "PART_TIME";
    if (t.includes("full time") || t.includes("daily")) nextMemory.sellerType = "FULL_TIME";

    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      if (nextMemory.pricingTouches >= 2) nextMemory.hasSeenPricingCTA = true;
    }

    const replies = [
      getReply(intent, page, nextMemory),
      getAhaMoment(nextMemory),
      getConfidenceBoost(nextMemory),
      getSocialProof(nextMemory),
      getRevenueMath(nextMemory),
    ].filter(Boolean) as string[];

    if (replies.includes(getAhaMoment(nextMemory)!)) nextMemory.hasSeenAhaMoment = true;
    if (replies.includes(getConfidenceBoost(nextMemory)!)) nextMemory.hasSeenConfidenceBoost = true;
    if (replies.includes(getSocialProof(nextMemory)!)) nextMemory.hasSeenSocialProof = true;
    if (replies.includes(getRevenueMath(nextMemory)!)) nextMemory.hasSeenRevenueMath = true;

    setMemory(nextMemory);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      ...replies.map((r) => ({ role: "assistant", content: r })),
    ]);

    setInput("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-full font-bold"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-[420px] h-[560px] bg-white border rounded-2xl shadow-2xl flex flex-col">
          <div className="px-4 py-3 border-b flex justify-between">
            <strong>Reseller Buddy</strong>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-[85%] ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {memory.hasSeenPricingCTA && (
              <div className="flex gap-2">
                <button onClick={() => navigateTo("builder")} className="flex-1 border rounded-xl px-3 py-2 font-bold">
                  Try one item
                </button>
                <button onClick={() => navigateTo("pricing")} className="flex-1 bg-blue-600 text-white rounded-xl px-3 py-2 font-bold">
                  See pricing
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
              className="flex-1 border rounded-xl px-3 py-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
