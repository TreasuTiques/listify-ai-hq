import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabaseClient"; 

// 🚨 SYSTEM HEARTBEAT TEST
console.log("AI Service Loaded. Supabase status:", supabase ? "Connected ✅" : "Missing ❌");

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 MODEL LOCKED - GEMINI 2.0 FLASH
const MODEL_NAME = "gemini-2.0-flash";

/**
 * 📊 TRACKING UTILITY
 */
const logUsage = async (usage: any, action: string) => {
  if (!usage) return;
  const tokensIn = usage.promptTokenCount || 0;
  const tokensOut = usage.candidatesTokenCount || 0;
  const costIn = (tokensIn / 1_000_000) * 0.15;
  const costOut = (tokensOut / 1_000_000) * 0.60;
  const totalCost = costIn + costOut;

  try {
    await supabase.from('usage_logs').insert([{
      platform: action,
      tokens_in: tokensIn,
      tokens_out: tokensOut,
      cost_est: totalCost
    }]);
  } catch (err) {
    console.error("Error logging usage:", err);
  }
};

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
 * 🧼 THE CLEANER
 */
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

/**
 * 🧠 DEEP VISION PROTOCOL
 */
const DEEP_VISION_PROTOCOL = `
  **INTERNAL VISUAL ANALYSIS (DO NOT OUTPUT THESE SECTION NAMES):**
  1. Inspect for pilling, scratches, stains, or fading.
  2. Identify fabric weight/material feel.
  3. Classify the exact style (e.g., "Y2K", "Gorpcore").
  4. Read labels/tags for precise Brand/Size/Material.
`;

/**
 * 🚫 NO MARKDOWN PROTOCOL
 */
const NO_MARKDOWN_PROTOCOL = `
  **FORMATTING RULES - STRICT:**
  - OUTPUT MUST BE PLAIN TEXT ONLY (Unless HTML is requested).
  - DO NOT use markdown characters like asterisks (** or *).
  - DO NOT use hash signs (#) for headers.
`;

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const contextBlock = userContext ? `\n**USER CONTEXT:**\n${userContext}\nInclude these details naturally.` : '';

  // 🔵 STANDARD EBAY HTML TEMPLATE (Clean & Informative)
  const EBAY_HTML_TEMPLATE = `
    <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; color: #333; line-height: 1.6;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee;">
        <h1 style="font-size: 22px; margin: 10px 0;">{{TITLE}}</h1>
      </div>
      <div style="background: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666;">Item Specifics</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li><strong>Brand:</strong> {{BRAND}}</li>
          <li><strong>Size:</strong> {{SIZE}}</li>
          <li><strong>Condition:</strong> {{CONDITION_GRADE}}</li>
        </ul>
      </div>
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 16px; border-left: 3px solid #007bff; padding-left: 10px;">Description</h3>
        <p>{{DETAILED_ANALYSIS}}</p>
      </div>
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 16px; border-left: 3px solid #dc3545; padding-left: 10px;">Flaws / Notes</h3>
        <p>{{DEFECT_REPORT}}</p>
      </div>
    </div>
  `;

  // 🟢 SHOPIFY HTML TEMPLATE
  const SHOPIFY_HTML_TEMPLATE = `
    <div class="product-description" style="font-family: inherit;">
      <p class="intro">{{SEMANTIC_INTRO}}</p>
      <h2>Specs</h2>
      <ul><li><strong>Material:</strong> {{MATERIAL}}</li><li><strong>Color:</strong> {{COLOR}}</li></ul>
      <h2>Details</h2>
      <p>{{DETAILED_ANALYSIS}}</p>
    </div>
  `;

  // 🔥 JUAN ACUÑA'S PREMIUM PRO PROMPT (The "Magic" Engine)
  const PREMIUM_PRO_PROMPT = `
    🚨 ACTIVATE "JUAN ACUÑA PREMIUM ENGINE" 🚨
    
    You are transforming raw data into a high-converting, themed eBay listing.
    
    **CRITICAL RULES:**
    1. **TONE:** Warm, light humor, nostalgic (if vintage), and CONFIDENT. No generic fluff.
    2. **READABILITY:** 8th-grade reading level. Simple, direct.
    3. **THEME AUTO-DETECTION:** Identify the Era/Style (e.g., 80s Neon, 90s Grunge, Modern Tech) and style the HTML colors/emojis to match.

    **HTML STRUCTURE (Single Block in 'description' field):**
    
    1. **CONTAINER:** Use a main div with max-width 900px, centered.
    
    2. **SKU BADGE (MANDATORY):** - Generate a unique SKU (e.g. VINT-[RANDOM]).
       - Style: absolute top-right, white pill shape, border-radius 999px, thin border, shadow.
       
    3. **MAIN TITLE PANEL:** Centered, themed fonts/colors.
    
    4. **DESCRIPTION:** - Insert **Micro-Lore** (1 line of era-evoking nostalgia).
       - Insert **Collector Confidence** ("Hard to find in this shape").
       
    5. **FEATURES:** Emoji bullet points.
    
    6. **WHY YOU'LL LOVE IT:** Emotional appeal/humor.
    
    7. **CTA PANEL (1-3-1 Format):**
       - ⭐ Fun Headline
       - • 3 Conversational, unique bullets
       - ✨ Warm closing tagline
       
    **FORMATTING:** - NO Cursive fonts. 
    - NO Markdown (**). Use HTML <strong> tags.
    - NO External CSS classes. Inline styles only.
  `;

  // 📝 STANDARD PROMPT (Informative but Simple)
  const STANDARD_PROMPT = `
    **ROLE:** eBay Listing Assistant.
    **GOAL:** Create a clean, professional, and highly informative listing.
    **RULES:**
    1. Title: Keyword-rich, max 80 chars.
    2. Description: Detailed but neutral tone. Use the Standard HTML Template provided.
    **HTML TEMPLATE:**
    ${EBAY_HTML_TEMPLATE}
  `;

  // 🚨 JSON OUTPUT STRUCTURE
  const OUTPUT_INSTRUCTION = `
    **OUTPUT JSON STRUCTURE (REQUIRED):**
    {
      "title": "Optimized Title (Max 80 chars)",
      "description": "FULL HTML CODE STRING HERE",
      "estimated_price": "$20.00",
      "tags": ["tag1", "tag2"],
      "item_specifics": {
        "brand": "Brand",
        "category": "Category Path",
        "size": "Size",
        "color": "Color",
        "material": "Material",
        "year": "Year/Era",
        "model": "Model",
        "theme": "Theme",
        "features": "Features list"
      }
    }
  `;

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} **ROLE:** Poshmark SEO Stylist. Use Emojis & Vertical Lists. ${OUTPUT_INSTRUCTION}`;
    case 'depop':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} **ROLE:** Depop Trend Curator. Casual tone, lowercase allowed. ${OUTPUT_INSTRUCTION}`;
    case 'mercari':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} **ROLE:** Mercari Quick-Flip. Short, punchy text. ${OUTPUT_INSTRUCTION}`;
    case 'etsy':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} **ROLE:** Etsy Artisan. Focus on story/maker. ${OUTPUT_INSTRUCTION}`;
    case 'shopify':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ROLE: Shopify SEO. HTML: ${SHOPIFY_HTML_TEMPLATE} ${OUTPUT_INSTRUCTION}`;
    case 'ebay':
    default:
      if (isProMode) {
        return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${PREMIUM_PRO_PROMPT} ${OUTPUT_INSTRUCTION}`;
      } else {
        return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${STANDARD_PROMPT} ${OUTPUT_INSTRUCTION}`;
      }
  }
};

/**
 * 📸 BRAIN 1: THE BUILDER
 */
export async function generateListingFromImages(imageFiles: File[], platform: string = 'ebay', isProMode: boolean = false, userContext: string = '') {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));
    const prompt = getPlatformPrompt(platform, isProMode, userContext);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    await logUsage(response.usageMetadata, `Listing: ${platform}`);
    return cleanAndParseJSON(response.text());
  } catch (error) { console.error("AI Generation Error:", error); throw error; }
}

/**
 * 🩺 BRAIN 2: THE DOCTOR
 */
export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Act as an expert reseller on ${platform}. Improve Title: "${currentTitle}", Desc: "${currentDescription}". JSON ONLY.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    await logUsage(response.usageMetadata, `Optimizer: ${platform}`);
    return cleanAndParseJSON(response.text());
  } catch (error) { console.error("Optimization Error:", error); throw error; }
}

/**
 * 🔭 BRAIN 3: THE SCOUT
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    
    // 🚨 PREMIUM STRATEGY PROMPT
    const instruction = `
      Act as a Senior Market Analyst and Expert Flipper. 
      Identify this item: "${productName}". 
      
      Perform deep market analysis.
      
      **RETURN ONLY RAW JSON**:
      {
        "item_name": "Short precise item name",
        "minPrice": 10,
        "maxPrice": 20,
        "demand_score": 75,
        "reason": "1 professional sentence on why.",
        "metrics": {
          "sell_through": 75, 
          "days_to_sell": 14,
          "volatility": "Low",
          "competition": "Medium"
        },
        "vitals": {
          "confidence": 92,
          "trend": "Rising",
          "saturation": "Low",
          "liquidity": "High"
        },
        "strategy_tip": "Specific tactical plan: 1. Listing Format (Auction vs BIN). 2. Key features to highlight. 3. Pricing strategy."
      }
    `;

    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart, instruction];
    } else {
      requestParts = [instruction];
    }
    
    const result = await model.generateContent(requestParts);
    const response = await result.response;
    await logUsage(response.usageMetadata, "Scout Analyst");
    return cleanAndParseJSON(response.text());
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
