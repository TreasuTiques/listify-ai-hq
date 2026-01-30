import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 RESTORED TO YOUR WORKING MODEL
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
 * 🧼 THE CLEANER: Extracts JSON from Chatty AI Responses
 * This fixes the "Unexpected identifier 'This'" crash by ignoring conversational text.
 */
const cleanAndParseJSON = (text: string) => {
  try {
    // 1. Remove Markdown code block syntax
    let clean = text.replace(/```json|```/g, '');
    
    // 2. Find the first '{' and the last '}' to isolate the JSON object
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1) {
      // Keep ONLY the data between the brackets
      clean = clean.substring(firstBrace, lastBrace + 1);
    }

    // 3. Parse and return
    return JSON.parse(clean);
  } catch (error) {
    console.error("JSON Parse Logic Failed on response:", text);
    throw new Error("AI returned invalid data format. Please try again.");
  }
};

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userCondition: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const conditionContext = userCondition ? `IMPORTANT: The user specified the condition is "${userCondition}". Ensure the description matches this.` : '';

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Poshmark social fashion marketplace.
        RULES:
        - TITLE: MAX 50 CHARS. Brand + Category + Style.
        - DESCRIPTION: Friendly, emoji-friendly 💖. Mention material, fit, and occasion.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, size, tags }
      `;
    
    case 'mercari':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Mercari quick sales.
        RULES:
        - TITLE: MAX 80 CHARS. Keywords first.
        - DESCRIPTION: Short, punchy. "Ships fast!" vibe.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'depop':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Depop Gen-Z/Vintage.
        RULES:
        - TITLE: Aesthetic, descriptive.
        - DESCRIPTION: Mention Era (Y2K, 90s), Vibe. Use slang like "sick piece" if applicable.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'etsy':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Etsy Vintage/Handmade.
        RULES:
        - DESCRIPTION: Emotional storytelling. Mention history/maker.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'shopify':
    case 'facebook':
      return `
        ${baseHelper}
        ${conditionContext}
        CONTEXT: Standard E-Commerce.
        RULES:
        - DESCRIPTION: Professional paragraph + bullet points.
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'ebay':
    default:
      if (isProMode) {
        // 🌟 PRO MODE: ANONYMOUS PREMIUM FORMULA 🌟
        return `
          ${baseHelper}
          ${conditionContext}
          CONTEXT: Professional High-End eBay Listing Generator.
          GOAL: Transform visual data into high-quality, themed, Cassini-optimized eBay listings.

          --- TITLE RULES ---
          - Return 1 optimized title (Max 80 chars).
          - Structure: Brand + Item + Series + Variant + Details.
          - No ALL CAPS. No emojis in title. No dashes (-).

          --- THEME DETECTION ---
          - AUTO-DETECT ERA/STYLE (e.g., 80s Neon, 50s Diner, Modern Tech, Rustic, Disney).
          - The HTML styling must reflect this theme (colors, vibes).

          --- PREMIUM HTML DESCRIPTION RULES ---
          Generate a SINGLE block of clean HTML code for the 'description' field.
          
          **HTML STYLING:**
          - Use a main container div: max-width: 800px; margin: auto; font-family: sans-serif; text-align: center; color: #333;
          - **SKU BADGE:** Must include a white "Pill Shaped Badge" (Border-radius 50px, border 1px solid #ccc, padding 5px 15px, font-size 12px, background: white, display: inline-block, margin-bottom: 10px). 
          - **BADGE CONTENT:** Display "AUTHENTIC • [ERA/STYLE]" (e.g. "AUTHENTIC • VINTAGE" or "OFFICIAL • 1990s"). DO NOT use the words "Premium Listing".
          
          **CONTENT SECTIONS:**
          1. **HEADER:** Item Name (Themed Color, H1).
          2. **MICRO-LORE:** A short, italicized, era-evoking sentence bringing the item to life.
          3. **WHY YOU'LL LOVE IT:** A section connecting emotionally/nostalgically.
          4. **FEATURES:** <ul> list with EMOJI bullet points. Text-align: left but centered container.
          5. **CONDITION:** Clear summary reflecting "${userCondition}".
          6. **SHIPPING:** "Free Shipping • Sturdy Packaging • Tracking Included".
          7. **CTA PANEL (The 1-3-1):**
             - ⭐ Fun Headline (Themed/Humorous)
             - 3 Conversational/Unique Bullets
             - ✨ Warm Closing Tagline (Generic, professional, welcoming. e.g., "Thanks for stopping by!").

          **DO NOT:** Use cursive fonts. Do not break HTML structure. NEVER use a specific person's name.
          
          JSON OUTPUT: { title, description, brand, condition, estimated_price, itemSpecifics }
        `;
      } else {
        // 🛡️ STANDARD MODE (Clean & Centered)
        return `
          ${baseHelper}
          ${conditionContext}
          CONTEXT: eBay Standard Listing (High Conversion).
          TITLE RULES: MAX 80 CHARS. Keyword rich.
          DESCRIPTION RULES (Clean HTML):
          - Use a centered container div.
          - Use <h2> for Product Summary.
          - Use <strong> for key details.
          - Use <ul> for features (Clean bullets).
          - Use <strong> for Condition Note (Must reflect: ${userCondition}).
          JSON OUTPUT: { title, description, brand, condition, estimated_price, itemSpecifics }
        `;
      }
  }
};

/**
 * 📸 BRAIN 1: THE BUILDER (MULTI-IMAGE)
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
    
    // 🛡️ USE THE CLEANER (Fixes JSON crash)
    return cleanAndParseJSON(result.response.text());

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
    
    // 🛡️ USE THE CLEANER (Fixes JSON crash)
    return cleanAndParseJSON(result.response.text());
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
    
    // 🛡️ USE THE CLEANER (Fixes JSON crash)
    return cleanAndParseJSON(result.response.text());
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
