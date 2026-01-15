import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Security Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Setup Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 🔑 CHANGE: Switching to 'gemini-pro' to fix the 404 error
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Get message
    const { message } = req.body;

    // 4. Define Persona
    const systemPrompt = `
      You are "Reseller Buddy", a smart, energetic AI assistant for eBay sellers. 
      Your goal is to help users list items faster using "Listify AI".
      
      TONE: Casual, encouraging, reseller lingo (death pile, comps).
      RULES: Keep answers short. Always guide them to click "Try one item".
    `;

    // 5. Start Chat
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Got it. Ready to help." }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "Brain freeze!" });
  }
}
