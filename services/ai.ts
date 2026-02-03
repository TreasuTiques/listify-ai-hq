import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

const MODEL_NAME = "gemini-flash-latest";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const cleanAndParseJSON = (text: string) => {
  try {
    let clean = text.replace(/```json|```/g, '');
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(clean);
  } catch (error) {
    console.error("JSON Parse Failed:", text);
    throw new Error("AI returned invalid data format. Please try again.");
  }
};

// ... (Keep existing generateListing and optimizeListing functions) ...

/**
 * 🔭 BRAIN 3: THE SCOUT (PREMIUM MARKET ANALYST)
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    
    // 🚨 PREMIUM "HYPE" PROMPT
    const instruction = `
      Act as a World-Class Vintage Reseller & Market Analyst.
      Analyze this item: "${productName}".
      
      **GOAL:** excite the user about the profit potential (or warn them effectively).
      
      **RETURN RAW JSON ONLY:**
      {
        "item_name": "Specific Item Name",
        "minPrice": 10,
        "maxPrice": 20,
        "demand": "High" | "Medium" | "Low",
        "verdict": "2-3 WORD HYPE PHRASE (e.g. '💎 HIDDEN GEM', '🚀 FAST FLIP', '💰 CASH COW', '🛑 HARD PASS')",
        "reason": "Expert analysis on WHY this is a buy/pass. Mention trends.",
        "metrics": {
          "sell_through": 75, 
          "days_to_sell": 14,
          "volatility": "Stable" | "Volatile",
          "competition": "Low" | "Medium" | "High"
        },
        "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
      }
      
      *Logic for Sell-Through:* Based on historical popularity of this category/brand.
    `;

    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart, instruction];
    } else {
      requestParts = [instruction];
    }
    
    const result = await model.generateContent(requestParts);
    return cleanAndParseJSON(result.response.text());
    
  } catch (error) { console.error("Scout Error:", error); throw error; }
}

// ... (Ensure generateListingFromImages is preserved below) ...
// (Placeholder to keep file valid)
const getPlatformPrompt = (p: string, pro: boolean, c: string) => `Analyze ${c}`;
export async function generateListingFromImages(files: File[], platform: string, proMode: boolean, context: string) {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const imageParts = await Promise.all(files.map(fileToGenerativePart));
    const prompt = `Analyze this item for ${platform}. Context: ${context}. Return JSON.`;
    const result = await model.generateContent([prompt, ...imageParts]);
    return cleanAndParseJSON(result.response.text());
}
