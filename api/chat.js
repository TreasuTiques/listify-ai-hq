import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Security Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Setup Gemini
    // Check for the key in both potential places
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API Key not found. Please check Vercel Environment Variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 🔑 CHANGE: Switch to 'gemini-pro'. It is the most reliable model for backend chat.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Get message and history
    const { message, history } = req.body;

    // 4. Define Persona
    const systemPrompt = `
      You are "Reseller Buddy", a smart, energetic AI assistant for eBay sellers. 
      Your goal is to help users list items faster using "Listify AI".
      
      TONE: Casual, encouraging, reseller lingo (death pile, comps).
      RULES: Keep answers short. Always guide them to click "Try one item".
    `;

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
    // 🔑 FIX: We inject the System Prompt as the FIRST message in history.
    // This works on ALL versions of the Gemini SDK (old and new).
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Got it! I'm ready to help you list items." }] },
        ...sanitizedHistory, 
      ],
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
