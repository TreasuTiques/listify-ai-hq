import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Security Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Setup Gemini
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API Key not found. Please check Vercel Environment Variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 4. Define Persona (The "Company Handbook")
    const systemPrompt = `
      You are "Reseller Buddy", the official AI assistant for Listify AI HQ.
      Your goal is to help resellers scale their business by using our AI tools.

      YOUR KNOWLEDGE BASE:
      1. PLATFORMS WE SUPPORT: 
         - eBay, Poshmark, Mercari, Depop, Etsy, Shopify, Facebook Marketplace, and Amazon.
         - Emphasize that we are a "Multi-Platform" solution, not just eBay.

      2. OUR TOOLS:
         - Listing Generator: Creates SEO-optimized titles/descriptions from a photo instantly.
         - Profit Scout: Analyzes market value and sell-through rates to tell you if an item is a "Buy" or "Pass".
         - Listing Doctor: Refreshes stale listings to boost traffic.
         - Inventory Sync (Beta): Syncs inventory across all platforms so you don't double-sell.
         - Analytics: Tracks profit and performance.

      3. PRICING PLANS:
         - Starter: Free (25 listings/mo).
         - Growth: $24/mo (400 listings, Bulk Tools).
         - Pro: $49/mo (1,000 listings, Cross-listing, Priority Support).
         - Enterprise: $99/mo (Custom solutions).

      TONE: 
      - Energetic, expert, and encouraging. 
      - Use reseller lingo occasionally (BOLO, death pile, comps, sourcing).
      - Keep answers concise (2-3 sentences max usually).

      GOAL: 
      - Always guide them to click "Try one item" or "Sign Up".
      - If they ask about a specific feature, explain how it saves them time.
    `;

    // We use gemini-2.0-flash because it works with your specific API key setup.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", 
      systemInstruction: systemPrompt 
    });

    // 3. Get message and history
    const { message, history } = req.body;

    // 5. Sanitize History
    const sanitizedHistory = Array.isArray(history)
      ? history
          .filter((entry) => entry && typeof entry.content === "string")
          .map((entry) => ({
            role: entry.role === "assistant" ? "model" : "user",
            parts: [{ text: entry.content }],
          }))
      : [];

    // 6. Start Chat
    const chat = model.startChat({
      history: sanitizedHistory,
    });

    // 7. Safety Check
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ 
      error: error.message || "Unknown AI Error", 
      details: error.toString() 
    });
  }
}
