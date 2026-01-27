import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);
const MODEL_NAME = "gemini-flash-latest";

// Helper: Convert File to Base64
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

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userCondition: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  // ✅ NEW: Tell AI the specific condition selected by user
  const conditionContext = userCondition ? `IMPORTANT: The user specified the condition is "${userCondition}". Ensure the description matches this.` : '';

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Poshmark is a social fashion marketplace.
        RULES:
        - TITLE: MAX 50 CHARS. Brand + Category + Style.
        - DESCRIPTION: Friendly, emoji-friendly 💖.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, size, tags }
      `;
    
    case 'mercari':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Mercari is for quick sales.
        RULES:
        - TITLE: MAX 80 CHARS. Keywords first.
        - DESCRIPTION: Short, punchy.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'depop':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Depop is for Gen-Z/Vintage.
        RULES:
        - TITLE: Aesthetic, descriptive.
        - DESCRIPTION: Mention Era (Y2K, 90s), Vibe.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'etsy':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Etsy is for Vintage/Handmade.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'shopify':
    case 'facebook':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Standard E-Commerce.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'ebay':
    default:
      if (isProMode) {
        return `
          ${baseHelper}
          ${conditionContext}
          CONTEXT: eBay Premium Listing.
          TITLE RULES: MAX 80 CHARS. Brand + Model + Features.
          DESCRIPTION (HTML Sales Letter):
          - Section 1: The Hook.
          - Section 2: The Story.
          - Section 3: Key Features.
          - Section 4: Condition (Must reflect: ${userCondition}).
          JSON OUTPUT: { title, description, brand, condition, estimated_price, itemSpecifics }
        `;
      } else {
        return `
          ${baseHelper}
          ${conditionContext}
          CONTEXT: eBay Standard Listing.
          TITLE RULES: MAX 80 CHARS.
          DESCRIPTION (Clean HTML):
          - <h2> Product Summary
          - <ul> Key Features
          - <strong> Condition Note (Must reflect: ${userCondition})
          JSON OUTPUT: { title, description, brand, condition, estimated_price, itemSpecifics }
        `;
      }
  }
};

/**
 * 📸 BRAIN 1: THE BUILDER
 * ✅ UPDATED: Now accepts 'userCondition'
 */
export async function generateListingFromImages(
  imageFiles: File[], 
  platform: string = 'ebay', 
  isProMode: boolean = false, 
  userCondition: string = ''
) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));
    const prompt = getPlatformPrompt(platform, isProMode, userCondition);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const cleanedText = response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

/**
 * 🩺 BRAIN 2: THE DOCTOR
 */
export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Act as an expert reseller on ${platform}. Improve this listing: Title: "${currentTitle}", Desc: "${currentDescription}". Return JSON: { "optimizedTitle": "...", "optimizedDescription": "..." }`;
    const result = await model.generateContent(prompt);
    const cleanedText = result.response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) { console.error("Optimization Error:", error); throw error; }
}

/**
 * 🔭 BRAIN 3: THE SCOUT
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart, `Act as an expert reseller. Identify item: "${productName}". Estimate Value & Demand. JSON: { "minPrice": 10, "maxPrice": 20, "demand": "High", "verdict": "BUY", "reason": "..." }`];
    } else {
      requestParts = [`Act as an expert reseller. Look at "${productName}". JSON: { "minPrice": 10, "maxPrice": 20, "demand": "High", "verdict": "BUY", "reason": "..." }`];
    }
    const result = await model.generateContent(requestParts);
    const cleanedText = result.response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
