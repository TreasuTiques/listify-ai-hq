import React, { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */

type ChatIntent =
  | "GREETING"
  | "WANT_TO_LIST"
  | "HOW_IT_WORKS"
  | "PRICING_CONCERN"
  | "AGREE_TO_TEST"
  | "RESELLER_CHAT"
  | "NEED_SUPPORT"      // <--- NEW: Catches "Need help"
  | "COMPLIMENT"        // <--- NEW: Catches "Nice", "Cool"
  | "JUST_BROWSING";

type Page = "homepage" | "builder" | "pricing";
type Msg = { role: "user" | "assistant"; content: string };

type ResellerMemory = {
  sellerType?: "CASUAL" | "PART_TIME" | "FULL_TIME";
  pricingTouches?: number;
  hasSeenPricingCTA?: boolean;
  
  hasSeenAhaMoment?: boolean;
  hasSeenConfidenceBoost?: boolean;
  hasSeenSocialProof?: boolean;
  hasSeenRevenueMath?: boolean;

  hasAskedFollowUp?: boolean;
  preferredWorkflow?: string;

  email?: string;
  hasAskedForEmail?: boolean;

  hasAskedItemType?: boolean;
  hasAgreedToTest?: boolean;
};

/* ---------------- CONSTANTS ---------------- */

// V5: Resetting memory to fix the "Music to my ears" loop
const STORAGE_KEY = "listify_chat_memory_v5"; 

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
  
  // 1. Support / Help (PRIORITY)
  if (t.includes("help") || t.includes("support") || t.includes("issue") || t.includes("broken") || t.includes("contact") || t.includes("human"))
    return "NEED_SUPPORT";

  // 2. Greetings
  const greetings = ["hi", "hello", "hey", "good morning", "hola", "yo", "sup"];
  if (greetings.some(g => t === g || t.startsWith(g + " ") || t.startsWith(g + ","))) {
    return "GREETING";
  }

  // 3. Compliments (New)
  if (t === "nice" || t === "cool" || t === "awesome" || t === "sweet" || t === "wow")
    return "COMPLIMENT";

  // 4. Agreeing to test
  if (t === "yes" || t === "sure" || t === "ok" || t === "yeah" || t.includes("let's do it") || t.includes("try it")) 
    return "AGREE_TO_TEST";

  // 5. Wants to List
  if (t === "listing" || t.includes("create listing") || t.includes("draft") || t.includes("sell item") || t.includes("make a listing"))
    return "WANT_TO_LIST";

  // 6. How it works
  if (t === "how" || t === "how?" || t.includes("how does") || t.includes("explain") || t.includes("work"))
    return "HOW_IT_WORKS";

  // 7. Pricing
  if (t === "pricing" || t === "price" || t.includes("cost") || t.includes("expensive") || t.includes("how much"))
    return "PRICING_CONCERN";

  // 8. Reseller Lingo
  if (t.includes("death pile") || t.includes("source") || t.includes("ebay") || t.includes("poshmark") || t.includes("money"))
    return "RESELLER_CHAT";
  
  return "JUST_BROWSING";
}

/* ---------------- REPLIES ---------------- */

function getReply(intent: ChatIntent, page: Page, memory: ResellerMemory): string {
  // 🚨 1. PRIORITY CHECKS (These override the "Success" loop)
  
  // Support Request
  if (intent === "NEED_SUPPORT") {
    return "I'm an automated buddy, but I can help you list items or explain pricing. If you need technical support, you can email our team at support@listifyaihq.com.";
  }

  // Compliments
  if (intent === "COMPLIMENT") {
    return "Glad you like it! Ready to give it a spin? 🌪️";
  }

  // Specific Questions (How/Price/List)
  // We answer these even if they already said 'Yes' before.
  if (intent === "HOW_IT_WORKS") {
    return "It's simple: You upload photos, I write the listing. Takes about 10 seconds. Want to see?";
  }
  if (intent === "PRICING_CONCERN") {
    return "We have free trials and flexible plans. Honestly, the best way to judge the value is to see the output first. Want to test one item?";
  }

  // --------------------------------------------------

  // A. Builder Page Context
  if (page === "builder") {
    return "You're in the right spot. Just upload photos of that item and I'll handle the writing! 📸";
  }

  // B. Greetings
  if (intent === "GREETING") {
    return "Hey! 👋 I'm here to help you crush your death pile. Want to see how I can write a listing in 10 seconds?";
  }

  // D. "Listing" (Action)
  if (intent === "WANT_TO_LIST") {
    return "Let's get that item listed! 🚀 Click the 'Try one item' button below and we'll build it right now.";
  }

  // F. Reseller Chat (Small Talk)
  if (intent === "RESELLER_CHAT") {
    return "I know the grind! Listing is the boring part, sourcing is the fun part. Let me handle the boring stuff so you can source more. Ready to test it?";
  }

  // G. Success (User said YES previously or just now)
  // Only show this if they just agreed, or if they are "Just Browsing" after agreeing.
  if (intent === "AGREE_TO_TEST" || (memory.hasAgreedToTest && intent === "JUST_BROWSING")) {
    return "Music to my ears. 🎶 Click 'Try one item' below to launch the builder. Let's turn that item into cash.";
  }

  // H. Default Fallback
  if (!memory.hasAskedItemType) {
    return "I'm still learning, but I'm an expert at eBay SEO. What kind of items do you usually sell? (Shoes, Vintage, Electronics?)";
  }

  return "I can help you build a listing or check pricing. What's on your mind?";
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

    // 1. Context updates
    if (t.includes("casual")) nextMemory.sellerType = "CASUAL";
    if (t.includes("full time")) nextMemory.sellerType = "FULL_TIME";

    if (!nextMemory.hasAskedItemType && intent !== "GREETING" && intent !== "AGREE_TO_TEST") {
       nextMemory.hasAskedItemType = true;
    }

    if (intent === "WANT_TO_LIST" || intent === "AGREE_TO_TEST") {
      nextMemory.hasAgreedToTest = true;
      nextMemory.hasSeenPricingCTA = true; 
    }

    if (intent === "PRICING_CONCERN") {
      nextMemory.pricingTouches = (nextMemory.pricingTouches ?? 0) + 1;
      if (nextMemory.pricingTouches >= 2) nextMemory.hasSeenPricingCTA = true;
      track("pricing_intent");
    }

    // 2. Get Reply
    const replyText = getReply(intent, page, nextMemory);
    
    // 3. Add Message
    setMemory(nextMemory);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: replyText },
    ]);

    setInput("");
  }

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
          {/* Header */}
          <div className="px-4 py-3 border-b flex justify-between bg-blue-600 rounded-t-2xl text-white">
            <strong>Reseller Buddy 📦</strong>
            <button onClick={() => setOpen(false)} className="hover:text-gray-200">✕</button>
          </div>

          {/* Messages Area */}
          <div ref={listRef} className="flex-1 overflow-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.length === 0 && (
               <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                 <p>Ask me "How does this work?"</p>
                 <p className="mt-1">or say "Hi" 👋</p>
               </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border text-gray-800 rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Buttons */}
            {showButtons && (
              <div className="flex gap-2 mt-4 animate-fade-in">
                <button 
                  onClick={() => navigateTo("builder")} 
                  className="flex-1 bg-blue-600 text-white rounded-xl px-3 py-3 font-bold hover:bg-blue-700 transition shadow-md"
                >
                  Try one item 📸
                </button>
                <button 
                  onClick={() => navigateTo("pricing")} 
                  className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-xl px-3 py-3 font-bold hover:bg-gray-50 transition shadow-sm"
                >
                  See pricing
                </button>
              </div>
            )}
          </div>

          {/* Input Area */}
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
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
