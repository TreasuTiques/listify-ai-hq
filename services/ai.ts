import { GoogleGenerativeAI } from "@google/generative-ai";

// 🛡️ SECURE MODE: Read from Vercel Environment Variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("⚠️ Missing VITE_GEMINI_API_KEY. Check Vercel Settings.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "missing-key");

export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    // 🏆 THE WINNER: Keeping the futuristic model that works for you!
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageData = await fileToGenerativePart(imageFile);
    const prompt = `
      You are an expert reseller on ${platform}. 
      Look at this image of a product and generate a high-converting listing.
      Return ONLY a valid JSON object with these exact fields:
      {
        "title": "A SEO-optimized title (max 80 chars)",
        "brand": "The brand name inferred from the item",
        "description": "A professional, persuasive description highlighting condition and key features.",
        "condition": "New with Tags" or "Pre-owned",
        "tags": ["tag1", "tag2", "tag3"],
        "estimated_price": "$40-$60"
      }
      Do not include markdown formatting.
    `;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    // 🧹 CLEANUP: We removed the ugly "Google Says" alert for the public version.
    // Instead, we throw a clean error that the UI can handle gracefully.
    throw new Error("Failed to generate listing. Please try again.");
  }
}

async function fileToGenerativePart(file: File) {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({ inlineData: { data: base64Data, mimeType: file.type } });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
