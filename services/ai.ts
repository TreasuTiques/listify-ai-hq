import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Get the Key from Vercel
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Safety Check: Log an error if the key is missing
if (!API_KEY) {
  console.error("⚠️ CRITICAL: VITE_GEMINI_API_KEY is missing. Check Vercel Settings.");
}

// 2. Initialize the AI
const genAI = new GoogleGenerativeAI(API_KEY || "missing-key");

export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    // 🕵️‍♂️ MODEL SELECTION: 
    // We are using 'gemini-1.5-flash' because it is the most stable and widely available model.
    // It works perfectly with standard API keys.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // A. Prepare the image
    const imageData = await fileToGenerativePart(imageFile);

    // B. The Instruction (Prompt)
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
      
      IMPORTANT: Return raw JSON only. Do not wrap in markdown blocks like \`\`\`json.
    `;

    // C. Generate the Content
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // D. Clean the Response (Remove markdown and accidental quotes)
    const cleanText = text
      .replace(/```json/g, '') // Remove start of code block
      .replace(/```/g, '')     // Remove end of code block
      .trim();                 // Remove extra whitespace

    return JSON.parse(cleanText);

  } catch (error: any) {
    // 🚨 DEBUG ALERT: This will show you exactly what went wrong on your iPad
    alert("🤖 GOOGLE ERROR: " + error.message);
    console.error("Full AI Error:", error);
    throw error;
  }
}

// Helper: Convert file to Base64 for Gemini
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
