import React, { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */

type ChatIntent =
  | "GREETING"        // <--- NEW: Recognizes Hi/Hello
  | "WHAT_IT_DOES"
  | "IS_FOR_ME"
  | "HOW_DIFFERENT"
  | "BEST_FIRST_TEST"
  | "PRICING_CONCERN"
  | "AGREE_TO_TEST"
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

  // Logic Flags
  hasAskedItemType?: boolean;
  hasAgreedToTest?: boolean;
};

/* ---------------- CONSTANTS ---------------- */

// 🔑 CHANGED TO V3: This clears your old "stuck" memory so the buttons disappear on refresh.
const STORAGE_KEY = "listify_chat_memory_v3"; 

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
  
  // 1. Check for Greetings
  const greetings = ["hi", "hello", "hey", "good morning", "hola", "yo"];
  // Checks if message IS a greeting or STARTS with a greeting (e.g. "Hi there")
  if (greetings.some(g => t === g || t.startsWith(g + " ") || t.startsWith(g + ","))) {
    return "GREETING";
  }

  // 2. Agreeing to test
  if (t === "yes" || t === "sure" || t === "ok" || t === "yeah" || t.includes("let's do it")) 
    return "AGREE_TO_TEST";

  // 3. Other Intents
  if (t.includes("price") || t.includes("pricing") || t.includes("cost"))
    return "PRICING_CONCERN";
  if (t.includes("what does") || t.includes("how does")) return "WHAT_IT_DOES";
  if (t.includes("different")) return "HOW_DIFFERENT";
  if (t.includes("test") || t.includes("try")) return "BEST_FIRST_TEST";
  
  return "JUST_BROWSING";
}

/* ---------------- MOMENTS & REPLIES ---------------- */

function getAhaMoment(memory: ResellerMemory) {
  if (memory.hasSeenAhaMoment) return null;
  if (memory.sellerType === "FULL_TIME") return "At your volume, this realistically saves 10–15 hours every week.";
  if (memory.sellerType === "PART_TIME") return "Batching listings like this saves around 4–5 hours per batch.";
  return null; // Don't show generic aha moment too early
}

function getReply(intent: ChatIntent, page: Page, memory: ResellerMemory): string {
  // A. Builder Page
  if (page === "builder") {
    return "You’re in the builder — upload 4–6 clear photos of one item and I’ll generate the listing.";
  }

  // B. Greetings (Natural Interaction)
  if (intent === "GREETING") {
    return "Hey there! 👋 I help resellers turn photos into eBay listings in seconds. Are you listing full-time or just clearing out some space?";
  }

  // C. Pricing
  if (intent === "PRICING_CONCERN") {
    if (memory.hasSeenPricingCTA)
      return "You’ve already got the options below. Want help testing an item first?";
    
    return "Most people like to see it work before looking at plans. Want to test one real item first?";
  }

  // D. Success (User said YES)
  if (memory.hasAgreedToTest) {
    return "Awesome. The best way to see the magic is to try one item. Click the 'Try one item' button below to open the builder.";
  }

  // E. Logic Fallbacks
  if (intent === "WHAT_IT_DOES") {
    return "I analyze your item photos and write the title, description, and item specifics automatically. Want to see it in action?";
  }

  // F. Default "I don't know" fallback
  // This handles random questions like "Why isn't this natural?" without looping.
  if (!memory.hasAskedItemType) {
    return "I'm still learning the ropes! But I'm great at writing listings. What kind of items do you usually sell? (e.g. Clothing, Electronics)";
  }

  return "I can help you build a listing or check pricing. Which would you prefer?";
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

    // 1. Handle Seller Type detection
    if (t.includes("casual") || t.includes("clearing") || t.includes("space")) nextMemory.sellerType = "CASUAL";
    if (t.includes("part time") || t.includes("side")) nextMemory.sellerType = "PART_TIME";
    if (t.includes("full time") || t.includes("daily") || t.includes("store")) nextMemory.sellerType = "FULL_TIME";

    // 2. Logic: Mark item type as asked if we are defaulting
    if (!nextMemory.hasAskedItemType && intent !== "GREETING" && intent !== "AGREE_TO_TEST") {
       nextMemory.hasAskedItemType = true;
    }

    // 3. Logic: Only show buttons if they agree or push for price
    if (intent === "AGREE_TO_TEST" || intent === "BEST_FIRST_TEST") {
      nextMemory.hasAgreedToTest = true;
      nextMemory.hasSeenPricingCTA = true; 
    }

    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      if (nextMemory.pricingTouches >= 2) nextMemory.hasSeenPricingCTA = true;
      track("pricing_intent");
    }

    // 4. Compile Replies
    const replyText = getReply(intent, page, nextMemory);
    
    // Only show "Aha Moment" if it's NOT a greeting (keep greetings clean)
    const aha = intent !== "GREETING" ? getAhaMoment(nextMemory) : null;
    
    if (aha) nextMemory.hasSeenAhaMoment = true;

    const replies = [replyText, aha].filter(Boolean) as string[];

    setMemory(nextMemory);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      ...replies.map((r) => ({ role: "assistant", content: r })),
    ]);

    setInput("");
  }

  // Helper to decide when to show buttons
  // Don't show buttons on simple greetings, only when actionable.
  const showButtons = (memory.hasSeenPricingCTA || memory.hasAgreedToTest) && messages.length > 0;

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
            {messages.length === 0 && (
               <div className="text-center text-gray-500 text-sm mt-4">
                 Say "Hi" to get started!
               </div>
            )}
            
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

            {/* BUTTONS: Only appear if showButtons is true */}
            {showButtons && (
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
