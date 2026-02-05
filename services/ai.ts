import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabaseClient"; // 👈 Ensure this path is correct

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 MODEL LOCKED - GEMINI 2.0 FLASH
const MODEL_NAME = "gemini-2.0-flash";

/**
 * 📊 TRACKING UTILITY
 * Calculates cost and saves to Supabase usage_logs
 */
const logUsage = async (usage: any, action: string) => {
  if (!usage) return;

  const tokensIn = usage.promptTokenCount || 0;
  const tokensOut = usage.candidatesTokenCount || 0;

  // Gemini 2.0 Flash pricing per 1M tokens: $0.15 Input / $0.60 Output
  const costIn = (tokensIn / 1_000_000) * 0.15;
  const costOut = (tokensOut / 1_000_000) * 0.60;
  const totalCost = costIn + costOut;

  try {
    const { error } = await supabase.from('usage_logs').insert([{
      platform: action,
      tokens_in: tokensIn,
      tokens_out: tokensOut,
      cost_est: totalCost
    }]);
    if (error) throw error;
    console.log(`💰 [${action}] Logged: $${totalCost.toFixed(5)}`);
  } catch (err) {
    console.error("Failed to log usage to Supabase:", err);
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
  - DO NOT use hash signs (#) for headers inside the text descriptions.
  - To emphasize a header, use UPPERCASE (e.g. "CONDITION:" instead of "**Condition:**").
  - Use standard hyphens (-) for bullet points.
`;

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const contextBlock = userContext 
    ? `\n**IMPORTANT USER CONTEXT & SPECS:**\n${userContext}\n\n*INSTRUCTION:* You MUST incorporate the user's insights (flaws, history, smells) and specific details into the description naturally. If they provided a Brand or Size, USE IT.` 
    : '';

  const EBAY_HTML_TEMPLATE = `
    <div style="font-family: sans-serif; max-width: 900px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <div style="text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="font-size: 24px; margin: 10px 0;">{{TITLE}}</h1>
        <p style="color: #555; font-size: 16px;">{{SEMANTIC_INTRO}}</p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Item Specifics</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 8px;"><strong>Brand:</strong> {{BRAND}}</li>
          <li style="margin-bottom: 8px;"><strong>Size:</strong> {{SIZE}}</li>
          <li style="margin-bottom: 8px;"><strong>Material:</strong> {{MATERIAL}}</li>
          <li style="margin-bottom: 8px;"><strong>Condition:</strong> {{CONDITION_GRADE}}</li>
        </ul>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 18px; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 10px;">Detailed Analysis</h3>
        <p>{{DETAILED_ANALYSIS}}</p>
        <br>
        <p><strong>Defects/Notes:</strong> {{DEFECT_REPORT}}</p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; padding-top: 20px;">
        <p>⚡ Fast Shipping • 📦 Professional Packaging</p>
      </div>
    </div>
  `;

  const SHOPIFY_HTML_TEMPLATE = `
    <div class="product-description" style="font-family: inherit;">
      <p class="intro">{{SEMANTIC_INTRO}}</p>
      <h2>Product Specifications</h2>
      <ul>
        <li><strong>Material:</strong> {{MATERIAL}}</li>
        <li><strong>Color:</strong> {{COLOR}}</li>
        <li><strong>Condition:</strong> {{CONDITION_GRADE}}</li>
      </ul>
      <h2>Detailed Analysis</h2>
      <p>{{DETAILED_ANALYSIS}}</p>
      <h2>Frequently Asked Questions</h2>
      <dl>
        <dt><strong>Is this item true to size?</strong></dt>
        <dd>{{SIZE_ANSWER}}</dd>
        <dt><strong>Any notable flaws?</strong></dt>
        <dd>{{DEFECT_REPORT}}</dd>
      </dl>
    </div>
  `;

  const PREMIUM_PRO_PROMPT = `
    🚨 ACTIVATE "REAL-TALK RESELLER ENGINE" 🚨
    You are an expert flipper writing a high-converting eBay listing. 
    **CRITICAL VOCABULARY RULE:** - Write at an **8th GRADE READING LEVEL**.
    - **BANNED WORDS:** Whimsical, Curated, Bespoke, Exquisite, Tapestry, Symphony, Heritage.
    - **APPROVED TONE:** "Just found this," "Super clean," "Hard to find."
    1. **THEME DETECTION:** Auto-detect ERA/STYLE.
    2. **SKU PILL BADGE:** Unique SKU (e.g., VINT-123).
    3. **MICRO-LORE:** 1 line of relatable nostalgia.
  `;

  const OUTPUT_JSON_STRUCTURE = `
    **OUTPUT JSON STRUCTURE (REQUIRED):**
    {
      "title": "Optimized Title (Max 80 chars)",
      "description": "FULL HTML OR TEXT DESCRIPTION",
      "estimated_price": "$20.00",
      "tags": ["tag1", "tag2"],
      "item_specifics": {
        "brand": "Extract from image or Unknown",
        "category": "Suggest Category Path",
        "size": "Estimate dimensions/tag",
        "color": "Dominant colors",
        "material": "Visual material ID",
        "year": "Era",
        "made_in": "Origin",
        "department": "Men/Women",
        "model": "Model",
        "theme": "Aesthetic",
        "features": "Key features"
      }
    }
  `;

  switch (platform.toLowerCase()) {
    case 'poshmark': return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} ROLE: Poshmark SEO Stylist. ${OUTPUT_JSON_STRUCTURE}`;
    case 'depop': return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} ROLE: Depop Trend Curator. ${OUTPUT_JSON_STRUCTURE}`;
    case 'mercari': return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} ROLE: Mercari Assistant. ${OUTPUT_JSON_STRUCTURE}`;
    case 'etsy': return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} ROLE: Etsy Artisan Guide. ${OUTPUT_JSON_STRUCTURE}`;
    case 'facebook': return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL} ROLE: Local Connector. ${OUTPUT_JSON_STRUCTURE}`;
    case 'shopify': return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ROLE: Shopify Architect. HTML: ${SHOPIFY_HTML_TEMPLATE} ${OUTPUT_JSON_STRUCTURE}`;
    case 'ebay':
    default:
      if (isProMode) return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${PREMIUM_PRO_PROMPT} ${OUTPUT_JSON_STRUCTURE}`;
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ROLE: eBay Specialist. HTML: ${EBAY_HTML_TEMPLATE} ${OUTPUT_JSON_STRUCTURE}`;
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
    
    // 📊 Log usage to Supabase
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

    // 📊 Log usage to Supabase
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
    const instruction = `Act as a Senior Market Analyst. Identify item: "${productName}". Market analysis JSON only. (Strategy, Pricing, Demand).`;

    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart, instruction];
    } else {
      requestParts = [instruction];
    }
    
    const result = await model.generateContent(requestParts);
    const response = await result.response;

    // 📊 Log usage to Supabase
    await logUsage(response.usageMetadata, "Scout Analyst");

    return cleanAndParseJSON(response.text());
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
