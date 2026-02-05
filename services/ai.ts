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

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const contextBlock = userContext 
    ? `\n**IMPORTANT USER CONTEXT & SPECS:**\n${userContext}\n\n*INSTRUCTION:* You MUST incorporate the user's insights (flaws, history, smells) and specific details into the description naturally. If they provided a Brand or Size, USE IT.` 
    : '';

  // 🔵 EBAY HTML TEMPLATE (Standard)
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

  // 🔥 JUAN ACUÑA'S PREMIUM ENGINE (UPDATED: Fixed SKU, Clean Titles, Boxed Layout)
  const PREMIUM_PRO_PROMPT = `
    🚨 ACTIVATE "JUAN ACUÑA PREMIUM ENGINE" 🚨
    
    You are transforming raw data into a high-converting, themed eBay listing.
    
    **CRITICAL RULES:**
    1. **TITLES (STRICT):** Clean text ONLY. NO emojis. NO symbols like [], {}, |. NO all-caps (unless brand).
    2. **TONE:** Warm, light humor, nostalgic (if vintage), and CONFIDENT.
    3. **THEME AUTO-DETECTION:** Identify the Era/Style (e.g., 90s Vaporwave, 70s Earth Tones) and use specific hex codes for borders/backgrounds.

    **HTML STRUCTURE (Output a Single, Self-Contained Block):**
    
    **1. MAIN CONTAINER (The "Card"):**
       - Style: max-width: 850px; margin: 0 auto; border: 3px solid [THEME_COLOR_DARK]; border-radius: 12px; overflow: hidden; font-family: sans-serif; position: relative; background: #fff;
    
    **2. SKU BADGE (Fixed Position Bug Solver):** - **PLACEMENT:** Absolute top-right corner of the Main Container.
       - **STYLE:** position: absolute; top: 15px; right: 15px; background: #fff; border: 1px solid #ccc; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; color: #555; z-index: 10;
       - **CONTENT:** "SKU: [CATEGORY]-[RANDOM-4]" (e.g., SKU: TOY-X92Z).
       
    **3. HEADER PANEL:** - Full width box at top. Background: [THEME_COLOR_LIGHT]. Padding: 30px 20px.
       - Title: Centered, [THEME_COLOR_DARK], bold, large font (24px+). No emojis in h1 text.
    
    **4. MICRO-LORE ROW:**
       - A centered, italicized sentence right under the header.
       - Style: color: #666; font-size: 16px; margin-top: 10px;
       - Content: A specific nostalgic fact or Era-setting line (e.g., "Straight from 1995 dial-up days...").
       
    **5. DESCRIPTION BODY:**
       - Padding: 20px. Text-align: left. Line-height: 1.6.
       - **The Hook:** 1 paragraph drawing them in.
       - **Collector Note:** "Hard to find in this condition."
       
    **6. "THE SPECS" (Features):**
       - A styled list. Use simple emoji bullets (▪️ or ➤) if clean, or themed emojis if fun.
    
    **7. CONDITION & FLAWS:**
       - Clear section. Be honest.
    
    **8. THE "HIGH VOLTAGE" CTA BOX (Bottom):**
       - **STYLE:** A distinct colored box at the bottom (like the pink AOL box).
       - Background: [CONTRAST_COLOR] (e.g. Hot Pink, Electric Blue). Color: White/Dark.
       - Padding: 20px. Text-align: center. Border-radius: 8px; margin: 20px;
       - **Headline:** Fun & Urgent (e.g., "START YOUR COLLECTION TONIGHT!").
       - **Body:** "Don't let this slip away. Click Buy It Now to secure it..."
       
    **FORMATTING:** - NO Cursive fonts. 
    - NO Markdown (**). Use HTML <strong> tags.
    - NO External CSS. Inline styles only.
  `;

  // 📝 STANDARD EBAY PROMPT
  const STANDARD_PROMPT = `
    **ROLE:** eBay Cassini Algorithm Specialist.
    **CRITICAL RULE:** Do NOT use asterisks (**) inside the text. Use <strong> tags for emphasis.
    **RULES:**
    1. Title: STRICT 80 chars. Brand + Gender + Item + Material + Size.
    2. Description: Use the provided HTML Template.
    **HTML TEMPLATE:**
    ${EBAY_HTML_TEMPLATE}
  `;

  // 🚨 OUTPUT JSON STRUCTURE (CRITICAL FOR AUTO-FILL)
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
        "features": "Key features"
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
      // 🔥 CHECK FOR PRO MODE HERE
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
 * IMPORTANT: This preserves the Advanced Strategy logic required for the Sourcing Page
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    
    // 🚨 PREMIUM "MARKET STRATEGIST" PROMPT (Kept for Sourcing Page V2)
    const instruction = `
      Act as a Senior Market Analyst and Expert Flipper. 
      Identify this item: "${productName}". 
      
      Perform a deep simulated market analysis based on current trends.
      
      **RETURN ONLY RAW JSON** with this exact structure:
      {
        "item_name": "Short precise item name",
        "minPrice": 10,
        "maxPrice": 20,
        "demand_score": 75,
        "reason": "1 professional sentence on why (e.g. 'Consistent demand due to 90s nostalgia').",
        "metrics": {
          "sell_through": 75, 
          "days_to_sell": 14,
          "volatility": "Low" | "Medium" | "High",
          "competition": "Low" | "Medium" | "High" | "Saturated"
        },
        "vitals": {
          "confidence": 92,
          "trend": "Rising" | "Falling" | "Stable",
          "saturation": "Low" | "Medium" | "High",
          "liquidity": "High" | "Medium" | "Low"
        },
        "strategy_tip": "A specific, detailed tactical plan for THIS item. STRICTLY cover: 1. The best Listing Format (Auction vs BIN). 2. Specific features/flaws to highlight in photos. 3. Pricing psychology (e.g. 'List high at $X, accept offers')."
      }
      
      *Definitions:*
      - demand_score: 0-100 (Used to calculate verdict).
      - confidence: 0-100 (AI certainty).
    `;

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
