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
  if (!usage) {
    console.warn("DEBUG: No usage metadata returned from Gemini.");
    return;
  }

  const tokensIn = usage.promptTokenCount || 0;
  const tokensOut = usage.candidatesTokenCount || 0;
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

    if (error) {
      console.error("Failed to log usage to Supabase:", error);
    }
  } catch (err) {
    console.error("Critical error in logUsage:", err);
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

// 🔵 EBAY HTML TEMPLATE (STANDARD - MODERN MINIMALIST)
const EBAY_HTML_TEMPLATE = `
    <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 25px; color: #222; text-align: center;">{{TITLE}}</h2>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Product Specifications</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
           <tr>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 30%; font-weight: bold;">Brand</td>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee;">{{BRAND}}</td>
           </tr>
           <tr>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Size</td>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee;">{{SIZE}}</td>
           </tr>
           <tr>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Material</td>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee;">{{MATERIAL}}</td>
           </tr>
           <tr>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Condition</td>
             <td style="padding: 8px 0; border-bottom: 1px solid #eee;">{{CONDITION_GRADE}}</td>
           </tr>
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 16px; color: #000; margin-bottom: 10px; font-weight: bold;">Product Overview</h3>
        <p style="color: #444;">{{DETAILED_ANALYSIS}}</p>
      </div>

      <div style="margin-bottom: 30px; border-left: 4px solid #e74c3c; padding-left: 15px;">
        <h3 style="font-size: 16px; color: #e74c3c; margin-bottom: 5px; font-weight: bold;">Condition Details</h3>
        <p style="margin: 0;">{{DEFECT_REPORT}}</p>
      </div>

      <div style="text-align: center; font-size: 13px; color: #888; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p>Ships fast & secure • Tracking included • Professional Seller</p>
      </div>
    </div>
  `;

// 🔥 JUAN ACUÑA'S PREMIUM ENGINE (Visual Web Designer Mode)
const PREMIUM_PRO_PROMPT = `
    🚨 ACTIVATE "PREMIUM DESIGNER ENGINE" 🚨

    You are not just writing text; you are coding a HIGH-END HTML LAYOUT (The "Digital Trading Card").

    **1. TITLE + FACT INTEGRITY (CRITICAL):**
    - Title MUST be <= 80 characters, Title Case, no emojis, and no dashes.
    - Never invent facts. If data is missing, explicitly state Unknown, Not observed, or Not provided.

    **2. THEME ENGINE (CRITICAL):**
    - Auto-detect the item's Era/Vibe (e.g., 90s Grunge, Y2K Tech, 70s Boho, Modern Minimal).
    - Select a [THEME_DARK] (Main Color) and a [THEME_LIGHT] (Background Pastel) that matches perfectly.
    - **FALLBACK:** If unsure, use "High-Voltage Blue" (#0056b3) and "Cloud White" (#f8f9fa).

    **3. DYNAMIC CONTENT GENERATION (CRITICAL):**
    - **RED ZONE (Condition + INAD Resistance):** Write an extremely detailed full-sentence condition narrative. Include measurements (if provided), materials (if provided), completeness, what is included, what is NOT included, visible flaws, edge wear, fading, stains, scratches, function tests performed (only if provided), and any uncertainty. If a detail is unavailable, state Unknown / Not observed / Not provided.
    - **YELLOW ZONE (The 3 Bullets):** Generate 3 UNIQUE, FUN, and ITEM-SPECIFIC reasons to buy this item. Include clear buyer benefits and a "why you'll love it" angle. Do NOT use generic text like "Ships Fast".
    - **BLUE ZONE (Closing Hook):** Write urgency without hype, plus collector-confidence language and a concise reason this listing is trustworthy.
    - **NOSTALGIA MICRO-LORE:** For vintage/collectibles, add exactly 1 short nostalgic micro-lore line that fits the era/item. If not appropriate, skip it.

    **HTML STRUCTURE (Strictly follow this layout):**

    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 900px; margin: 0 auto; border: 3px solid [THEME_DARK]; background-color: #ffffff; border-radius: 12px; overflow: hidden; color: #333;">

        <div style="background-color: [THEME_LIGHT]; padding: 25px; border-bottom: 2px solid [THEME_DARK]; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
            <div style="flex: 1; min-width: 250px;">
                <h1 style="color: [THEME_DARK]; margin: 0; font-size: 28px; line-height: 1.2; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 800;">
                    [INSERT FUN/THEMED HEADLINE HERE]
                </h1>
                <p style="font-style: italic; color: #555; margin-top: 8px; font-size: 16px; font-weight: 500;">
                    [Insert Nostalgic Micro-Lore or Era Setting Line]
                </p>
            </div>
            <div style="background: #ffffff; padding: 8px 16px; border-radius: 50px; border: 2px solid [THEME_DARK]; font-weight: bold; font-size: 12px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); white-space: nowrap;">
                SKU: [CATEGORY]-[RANDOM_4_CHARS]
            </div>
        </div>

        <div style="padding: 30px;">

            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
                [Detailed, warm, and confident description of the item. Sell the feeling, not just the object. Use 8th-grade reading level.]
            </p>

            <div style="background: #f8f9fa; border-left: 6px solid [THEME_DARK]; padding: 15px; margin-bottom: 30px; font-style: italic; color: #555;">
                "💡 <strong>Collector's Note:</strong> [Insert comment about rarity, condition, or why this is a keeper.]"
            </div>

            <h2 style="color: [THEME_DARK]; border-bottom: 2px dashed [THEME_DARK]; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">✨ The Highlights</h2>
            <ul style="list-style: none; padding: 0; font-size: 16px; line-height: 1.8; margin-top: 15px;">
                <li style="margin-bottom: 8px;">[THEMED_EMOJI] <strong>Feature 1:</strong> Detail...</li>
                <li style="margin-bottom: 8px;">[THEMED_EMOJI] <strong>Feature 2:</strong> Detail...</li>
                <li style="margin-bottom: 8px;">[THEMED_EMOJI] <strong>Feature 3:</strong> Detail...</li>
            </ul>

            <h2 style="color: [THEME_DARK]; border-bottom: 2px dashed [THEME_DARK]; padding-bottom: 5px; margin-top: 30px; font-size: 20px;">🔍 Condition Report</h2>
            <p style="font-size: 16px;">
                [INSERT DETAILED NARRATIVE CONDITION REPORT HERE. Do not summarize. Describe every flaw and feature mentioned in analysis.]
            </p>

        </div>

        <div style="background-color: [THEME_DARK]; color: #ffffff; padding: 30px; text-align: center; margin: 0;">
            <h2 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; color: #fff;">
                ⭐ [URGENT & FUN HEADLINE]
            </h2>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin: 20px 0; font-size: 14px; opacity: 0.9;">
                <span>✓ [UNIQUE_PROP_1]</span>
                <span>✓ [UNIQUE_PROP_2]</span>
                <span>✓ [UNIQUE_PROP_3]</span>
            </div>
            <p style="margin: 0; font-size: 16px; font-weight: bold;">
                ✨ [INSERT WITTY CLOSING HOOK HERE]
            </p>
        </div>

    </div>

    **FORMAT + OUTPUT RULES:**
    - Description field must be HTML-only.
    - Do NOT output markdown.
    - Do NOT use ** asterisks in output text; use <strong> for emphasis.
    - **NO** Placeholder text like [THEME_DARK]. You must replace them with actual Hex Codes.
    - **TONE:** Fun, Professional, and Era-Appropriate.

    **PROMPT SELF-CHECK (RUN BEFORE FINAL OUTPUT):**
    - Self-check 1: Remove or relabel any claim not directly supported by provided data/images as Unknown / Not observed / Not provided.
    - Self-check 2: Confirm condition coverage includes included items, not included items, flaws/wear, and tests only if provided.
    - Self-check 3: Confirm title format rules (<=80, Title Case, no emojis, no dashes) and HTML-only description formatting.
  `;

// 📝 STANDARD PROMPT (Updated for consistency)
const STANDARD_PROMPT = `
    **ROLE:** eBay Cassini Algorithm Specialist.
    **STYLE:** Modern Minimalist / High-End Corporate.
    
    **CRITICAL RULE:** Do NOT use asterisks (**) inside the text. Use <strong> tags for emphasis.
    **VISUALS:** No emojis, No lore. Clean, factual, professional.
    
    **RULES:**
    1. Title: STRICT 80 chars. Brand + Gender + Item + Material + Size.
    2. Description: Use the provided HTML Template.
    
    **HTML TEMPLATE:**
    ${EBAY_HTML_TEMPLATE}
  `;

const getEbayRegularPrompt = (userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const contextBlock = userContext
    ? `\n**IMPORTANT CONTEXT:** "${userContext}".\n*INSTRUCTION:* Even if context is short, perform a FULL visual analysis.`
    : '';

  const OUTPUT_INSTRUCTION = `
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
        "features": "Key features list"
      }
    }
  `;

  return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${STANDARD_PROMPT} ${OUTPUT_INSTRUCTION}`;
};

const getEbayProPrompt = (userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const contextBlock = userContext
    ? `\n**IMPORTANT CONTEXT:** "${userContext}".\n*INSTRUCTION:* Even if context is short, perform a FULL visual analysis.`
    : '';

  const OUTPUT_INSTRUCTION = `
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
        "features": "Key features list"
      }
    }
  `;

  return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${PREMIUM_PRO_PROMPT} ${OUTPUT_INSTRUCTION}`;
};

const getEbayPrompt = (isProMode: boolean, userContext: string) => {
  if (isProMode) {
    return getEbayProPrompt(userContext);
  }
  return getEbayRegularPrompt(userContext);
};

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  // FIX: Force AI to be descriptive even if userContext is brief
  const contextBlock = userContext 
    ? `\n**IMPORTANT CONTEXT:** "${userContext}".\n*INSTRUCTION:* Even if context is short, perform a FULL visual analysis.` 
    : '';

  // 🟢 SHOPIFY HTML TEMPLATE
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

  // 🚨 OUTPUT JSON STRUCTURE
  const OUTPUT_INSTRUCTION = `
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
        "features": "Key features list"
      }
    }
  `;

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Poshmark SEO Stylist.
        **RULES:**
        1. Vertical list layout. Use Emojis as bullets.
        2. Integrate "Aesthetics" (e.g., #Boho, #Y2K).
        ${OUTPUT_INSTRUCTION}`;
    
    case 'depop':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Depop Trend Curator.
        **RULES:**
        1. Title: Aesthetic Hook.
        2. Description: Casual tone. Lowercase allowed.
        ${OUTPUT_INSTRUCTION}`;

    case 'mercari':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Mercari Quick-Flip Assistant.
        **RULES:**
        1. Short paragraphs. "Ships Fast" mention.
        ${OUTPUT_INSTRUCTION}`;

    case 'etsy':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Etsy Artisan Guide.
        **RULES:**
        1. Description: Storytelling. Focus on "Maker", "History".
        ${OUTPUT_INSTRUCTION}`;

    case 'facebook':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Local Commerce Connector.
        **RULES:**
        1. Focus: "Proximity" keywords. Simple and direct.
        ${OUTPUT_INSTRUCTION}`;

    case 'shopify':
      return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL}
        **ROLE:** Shopify SEO Architect.
        **GOAL:** Semantic Richness for Google SGE.
        **CRITICAL RULE:** Do NOT use asterisks (**) inside the text. Use <strong> tags for emphasis.
        **RULES:**
        1. Use the provided HTML Template.
        **HTML TEMPLATE:**
        ${SHOPIFY_HTML_TEMPLATE}
        ${OUTPUT_INSTRUCTION}`;

    case 'ebay':
    default:
      return getEbayPrompt(isProMode, userContext);
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
      Act as a Senior Market Analyst. Identify this item: "${productName}". 
      Perform a deep simulated market analysis.
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
        "strategy_tip": "A specific, detailed tactical plan: 1. Listing Format. 2. Features to highlight. 3. Pricing strategy."
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
