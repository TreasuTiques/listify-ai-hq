import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ NUCLEAR TEST MODE: We are pasting the key directly to bypass Vercel issues.
// REPLACE THE TEXT BELOW WITH YOUR NEW KEY ENDING IN ...VxIw
const API_KEY = "AIzaSyCOqDV_x3N1kBoYqisVPBTAZy0EhzaVxIw"; 

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    // We are using the standard Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    // 🚨 THIS ALERT IS MANDATORY. It will tell us if the key is wrong.
    alert("🤖 DIAGNOSTIC ERROR: " + error.message);
    throw error;
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
