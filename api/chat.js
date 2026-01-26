import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Security Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Setup Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 4. Define Persona (System Instruction)
    const systemPrompt = `
      You are "Reseller Buddy", a smart, energetic AI assistant for eBay sellers. 
      Your goal is to help users list items faster using "Listify AI".
      
      TONE: Casual, encouraging, reseller lingo (death pile, comps).
      RULES: Keep answers short. Always guide them to click "Try one item".
    `;

    // 🔑 CHANGE: Use the modern 'flash' model (matches your working Listing Generator)
    // We pass the persona as 'systemInstruction' which is the new standard.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      systemInstruction: systemPrompt 
    });

    // 3. Get message and history
    const { message, history } = req.body;

    // 5. Sanitize History
    // This ensures the AI remembers previous messages without crashing on bad data
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
    // 🔑 DEBUG: Send the REAL error details so we can see exactly what's wrong
    return res.status(500).json({ 
      error: error.message || "Unknown AI Error", 
      details: error.toString() 
    });
  }
}
