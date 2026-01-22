import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Get the Key from Vercel
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("⚠️ Missing VITE_GEMINI_API_KEY.");
}

// 2. Initialize
const genAI = new GoogleGenerativeAI(API_KEY || "missing-key");

export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    // 🕵️‍♂️ FIX: Switching to 'gemini-1.5-pro' which is more widely supported
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // B. Convert image
    const imageData = await fileToGenerativePart(imageFile);

    // C. The Prompt
    const prompt = `
      You are an expert reseller on ${platform}. 
      Look at this image of a product and generate a high-converting listing.
      
      Return ONLY a valid JSON object with these exact fields:
      {
        "title": "A SEO-optimized title (max 80 chars)",
        "brand": "The brand name inferred from the item",
        "description": "A professional, persuasive description highlighting condition and key features.",
        "condition": "New with Tags" or "Pre-owned" (guess based on visual condition),
        "tags": ["tag1", "tag2", "tag3"],
        "estimated_price": "A predicted price range (e.g. $40-$60)"
      }
      
      Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.
    `;

    // D. Send to Gemini
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // E. Parse
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);

  } catch (error: any) {
    // Keep the Truth Serum active so we can see if it worked!
    alert("🤖 GOOGLE SAYS: " + error.message);
    throw error;
  }
}

async function fileToGenerativePart(file: File) {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: { data: base64Data, mimeType: file.type },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
