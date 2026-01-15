import React, { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */

type ChatIntent =
  | "WHAT_IT_DOES"
  | "IS_FOR_ME"
  | "HOW_DIFFERENT"
  | "BEST_FIRST_TEST"
  | "PRICING_CONCERN"
  | "AGREE_TO_TEST" // <--- ADDED THIS
  | "JUST_BROWSING";

type Page = "homepage" | "builder" | "pricing";
type Msg = { role: "user" | "assistant"; content: string };

type ResellerMemory = {
  sellerType?: "CASUAL" | "PART_TIME" | "FULL_TIME";
  pricingTouches?: number;
  hasSeenPricingCTA?: boolean;

  // 4.x conversion moments
  hasSeenAhaMoment?: boolean;
  hasSeenConfidenceBoost?: boolean;
  hasSeenSocialProof?: boolean;
  hasSeenRevenueMath?: boolean;

  // 4.5 / 4.6
  hasAskedFollowUp?: boolean;
  preferredWorkflow?: string;

  // 6.x
  email?: string;
  hasAskedForEmail?: boolean;

  // 🔑 LOGIC FIXES
  hasAskedItemType?: boolean;
  hasAgreedToTest?: boolean; // <--- ADDED THIS
};

/* ---------------- CONSTANTS ---------------- */

const STORAGE_KEY = "listify_chat_memory_v2"; // Bumped version to reset bad loops

/* ---------------- ANALYTICS ---------------- */

function track(event: string, props: Record<string, any> = {}) {
  if ((window as any).analytics?.track) {
    (window as any).analytics.track(event, props);
  } else {
    console.log("[track]", event, props);
  }
}

/* ---------------- NAVIGATION ---------------- */

function navigateTo(dest: "builder" | "pricing") {
  track("navigate", { dest });

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
  
  // 🔑 FIX: Catch "Yes" answers so we don't loop
  if (t === "yes" || t === "sure" || t === "ok" || t === "yeah" || t.includes("let's do it")) 
    return "AGREE_TO_TEST";

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

/* ---------------- 6.0 EMAIL ASK ---------------- */

function getEmailAsk(memory: ResellerMemory) {
  if (memory.hasAskedForEmail || memory.email) return null;

  if (memory.hasSeenRevenueMath) {
    return "Want me to send you a quick checklist to speed this up even more? Drop your email — no spam, just reseller tips.";
  }

  return null;
}

/* ---------------- REPLIES ---------------- */

function getReply(intent: ChatIntent, page: Page, memory: ResellerMemory): string {
  // 1. If they are already in the builder
  if (page === "builder") {
    return "You’re in the builder — upload 4–6 clear photos of one item and I’ll generate the listing.";
  }

  // 2. Pricing concerns
  if (intent === "PRICING_CONCERN") {
    if (memory.hasSeenPricingCTA)
      return "You’ve already got the options below. Want help testing an item or tightening your workflow?";

    if ((memory.pricingTouches ?? 0) >= 2)
      return "Sounds like pricing matters. Want to test one item or see the plans?";

    return "Most people decide after testing one real item. Want to try that or see pricing?";
  }

  // 🔑 3. SUCCESS STATE: User said "Yes" (AGREE_TO_TEST)
  // This breaks the loop. If they agreed, we stop asking if they want to test.
  if (memory.hasAgreedToTest) {
    return "Awesome. The best way to see the magic is to try one item. Click the 'Try one item' button below to open the builder.";
  }

  // 4. Default fallback: If we haven't asked about items yet
  if (!memory.hasAskedItemType) {
    return "Got it. What kind of items are you usually listing? (e.g. Shoes, Electronics, Vintage)";
  }

  // 5. Final fallback: If we HAVE asked about items, but they haven't said YES yet.
  return "Cool. Want to test one real item to see how it works?";
}

/* ---------------- COMPONENT ---------------- */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<Page>("homepage");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const [memory, setMemory] = useState<ResellerMemory>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { pricingTouches: 0 };
  });

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(inferPage());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  }, [memory]);

  useEffect(() => {
    if (open) track("chat_opened");
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  function send(text: string) {
    if (!text.trim()) return;

    const intent = detectIntent(text);
    const t = text.toLowerCase();
    const nextMemory = { ...memory };

    // 🔑 LOGIC FIX: Don't mark 'hasAskedItemType' true on every single message.
    // Only mark it if we are actually about to ask it, or if the user answered it.
    // For now, let's trust the flow:
    if (!nextMemory.hasAskedItemType && intent !== "AGREE_TO_TEST") {
       // If they aren't agreeing, we assume this message is them chatting, 
       // so next time we might want to ask about item types.
       nextMemory.hasAskedItemType = true;
    }

    // 🔑 LOGIC FIX: Track if they said YES
    if (intent === "AGREE_TO_TEST" || intent === "BEST_FIRST_TEST") {
      nextMemory.hasAgreedToTest = true;
      nextMemory.hasSeenPricingCTA = true; // Show the buttons too
    }

    if (t.includes("@") && t.includes(".")) {
      nextMemory.email = text.trim();
      nextMemory.hasAskedForEmail = true;
      track("email_captured", { email: nextMemory.email });
    }

    if (t.includes("storage") || t.includes("batch")) nextMemory.sellerType = "PART_TIME";
    if (t.includes("full time") || t.includes("daily")) nextMemory.sellerType = "FULL_TIME";

    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      if (nextMemory.pricingTouches >= 2) nextMemory.hasSeenPricingCTA = true;
      track("pricing_intent");
    }

    const replies = [
      getReply(intent, page, nextMemory),
      getAhaMoment(nextMemory),
      getConfidenceBoost(nextMemory),
      getSocialProof(nextMemory),
      getRevenueMath(nextMemory),
      getEmailAsk(nextMemory),
    ].filter(Boolean) as string[];

    if (replies.includes(getAhaMoment(nextMemory)!)) nextMemory.hasSeenAhaMoment = true;
    if (replies.includes(getConfidenceBoost(nextMemory)!)) nextMemory.hasSeenConfidenceBoost = true;
    if (replies.includes(getSocialProof(nextMemory)!)) nextMemory.hasSeenSocialProof = true;
    if (replies.includes(getRevenueMath(nextMemory)!)) nextMemory.hasSeenRevenueMath = true;
    if (replies.includes(getEmailAsk(nextMemory)!)) nextMemory.hasAskedForEmail = true;

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
          className="bg-blue-600 text-white px-5 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-[420px] h-[560px] bg-white border rounded-2xl shadow-2xl flex flex-col font-sans">
          <div className="px-4 py-3 border-b flex justify-between bg-white rounded-t-2xl">
            <strong>Reseller Buddy</strong>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-[85%] ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-gray-800 shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Show buttons if they have agreed to test OR seen pricing */}
            {(memory.hasSeenPricingCTA || memory.hasAgreedToTest) && (
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => navigateTo("builder")} 
                  className="flex-1 bg-blue-600 text-white rounded-xl px-3 py-2 font-bold hover:bg-blue-700 transition"
                >
                  Try one item
                </button>
                <button 
                  onClick={() => navigateTo("pricing")} 
                  className="flex-1 border bg-white rounded-xl px-3 py-2 font-bold hover:bg-gray-50 transition"
                >
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
            className="p-3 border-t bg-white rounded-b-2xl flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
