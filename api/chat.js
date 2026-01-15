import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Security Check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Setup Gemini with your hidden key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Get the message from the frontend
    const { message, history } = req.body;

    // 4. Define the Persona
    const systemPrompt = `
      You are "Reseller Buddy", a smart, energetic AI assistant for eBay sellers. 
      Your goal is to help users list items faster using "Listify AI".

      **YOUR PERSONALITY:**
      - **Tone:** Casual, encouraging, and knowledgeable. Use emojis occasionally (🚀, 📦, 💸).
      - **Lingo:** Use terms like "death pile," "comps" (comparables), "sourcing," "listing flow," "STR" (sell-through rate).
      - **Stance:** You are a partner in their business. You hate listing manually as much as they do.

      **YOUR KNOWLEDGE BASE:**
      1. **The Product:** Listify AI takes photos and writes the Title, Description, and Item Specifics automatically.
      2. **Pricing:** We have a free trial. If they ask about cost, say: "Honestly, the best way to judge value is to test one item for free. Want to try?"
      3. **Features:** You can maximize SEO, clean up photos, and format descriptions for mobile.

      **RULES FOR CONVERSATION:**
      - **Short Answers:** Keep replies under 3 sentences unless explaining a complex topic.
      - **Goal:** Always guide them to click the "Try one item" button.
      - **Handling Objections:** - If they say "it's too expensive", say: "Time is money! If I save you 5 hours a week, that's time you can spend sourcing high-dollar items."
         - If they say "I don't trust AI", say: "Totally fair. That's why we let you review every word before it goes live. You're the pilot, I'm just the co-pilot."
    `;

    // 5. Start the chat
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Got it. I am ready to help resellers." }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // 6. Send the answer back to the chat widget
    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "Brain freeze!" });
  }
}
