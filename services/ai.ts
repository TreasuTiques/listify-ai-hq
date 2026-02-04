import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 MODEL LOCKED - GEMINI 2.0 FLASH (Best for Speed & Logic)
const MODEL_NAME = "gemini-2.0-flash";

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
 * 🧠 DEEP VISION PROTOCOL (Internal Eye)
 */
const DEEP_VISION_PROTOCOL = `
  **INTERNAL VISUAL ANALYSIS (DO NOT OUTPUT THESE SECTION NAMES):**
  1. Inspect for pilling, scratches, stains, or fading.
  2. Identify fabric weight/material feel.
  3. Classify the exact style (e.g., "Y2K", "Gorpcore", "Streetwear").
  4. Read labels/tags for precise Brand/Size/Material.
`;

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER (THE LISTING BUILDER)
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  
  // 📥 RICH CONTEXT INJECTION (Seller Insights + Specs)
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

  // 🚨 UNIVERSAL JSON OUTPUT STRUCTURE (RESTORED ITEM SPECIFICS)
  const OUTPUT_INSTRUCTION = `
    **OUTPUT JSON STRUCTURE (REQUIRED):**
    {
      "title": "Optimized Title (Max 80 chars, Keyword Heavy)",
      "description": "FULL HTML OR TEXT DESCRIPTION (Based on Template)",
      "estimated_price": "$20.00",
      "tags": ["tag1", "tag2", "tag3"],
      "brand": "Extracted Brand",
      "item_specifics": {
        "brand": "Brand Name",
        "category": "Recommended Category Path",
        "size": "Size on Tag or Measured",
        "color": "Dominant Colors",
        "material": "Fabric Content",
        "year": "Era (e.g. 90s, Y2K) or Year",
        "made_in": "Country of Origin",
        "department": "Men/Women/Unisex",
        "model": "Model Name/Number",
        "theme": "Style Theme (e.g. Vintage, Sports)",
        "features": "Key Features (e.g. Pockets, Waterproof)"
      }
    }
  `;

  // 🔥 ELITE PRO PROMPT (RESTORED - THE "REAL TALK" ENGINE)
  const PREMIUM_PRO_PROMPT = `
    🚨 ACTIVATE "REAL-TALK RESELLER ENGINE" 🚨
    
    You are an expert flipper writing a high-converting listing.
    
    **CRITICAL VOCABULARY RULE:** - Write at an **8th GRADE READING LEVEL**. Simple, direct, natural English.
    - **BANNED WORDS (DO NOT USE):** Whimsical, Curated, Bespoke, Exquisite, Tapestry, Symphony, Heritage, Provenance, Iconic, Meticulous, "Testament to".
    - **APPROVED TONE:** "Just found this," "Super clean," "Hard to find," "Great shape," "Cool details," "Ready to ship."
    
    **CRITICAL WHITE-LABEL RULE:** - NEVER use specific names (e.g. "Juan Acuña", "Sellistio").
    - Use generic headers like "Vintage Vault Find", "The Collection", or just the Item Name.

    1. **THEME DETECTION:** Auto-detect ERA/STYLE (e.g., 80s Neon, 90s Grunge, Minimalist, Y2K).
    2. **SKU PILL BADGE:** Place a unique SKU in a dedicated <div> ABOVE main title (Right Aligned).
    3. **MICRO-LORE:** Add 1 line of relatable nostalgia if vintage.
    4. **FORMATTING:** NO Cursive. NO Markdown asterisks (**). Use HTML <strong> tags.
  `;

  // 📝 STANDARD PROMPT
  const STANDARD_PROMPT = `
    **ROLE:** eBay Cassini Algorithm Specialist.
    **CRITICAL RULE:** Do NOT use asterisks (**) inside the text. Use <strong> tags for emphasis.
    **RULES:**
    1. Title: STRICT 80 chars. Brand + Gender + Item + Material + Size.
    2. Description: Use the provided HTML Template.
    **HTML TEMPLATE:**
    ${EBAY_HTML_TEMPLATE}
  `;

  let selectedPrompt = "";

  switch (platform.toLowerCase()) {
    case 'poshmark':
      selectedPrompt = `...Poshmark Logic (Emojis, Friendly)... ${OUTPUT_INSTRUCTION}`; break; 
    case 'depop':
      selectedPrompt = `...Depop Logic (Hashtags, Gen Z Tone)... ${OUTPUT_INSTRUCTION}`; break;
    case 'shopify':
      selectedPrompt = `...Shopify Logic (Clean, SEO)... ${OUTPUT_INSTRUCTION}`; break;
    case 'ebay':
    default:
      // 🔥 CHECK FOR PRO MODE HERE
      selectedPrompt = isProMode ? PREMIUM_PRO_PROMPT : STANDARD_PROMPT;
      selectedPrompt += `\n${OUTPUT_INSTRUCTION}`;
      break;
  }

  return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${selectedPrompt}`;
};

/**
 * 📸 BRAIN 1: THE BUILDER (LISTING GENERATOR)
 */
export async function generateListingFromImages(
  imageFiles: File[], 
  platform: string = 'ebay', 
  isProMode: boolean = false, 
  userContext: string = ''
) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));
    const prompt = getPlatformPrompt(platform, isProMode, userContext);

    const result = await model.generateContent([prompt, ...imageParts]);
    return cleanAndParseJSON(result.response.text());

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

/**
 * 🩺 BRAIN 2: THE DOCTOR (OPTIMIZER)
 */
export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `
      Act as an expert reseller on ${platform}. 
      Analyze this listing: Title: "${currentTitle}", Desc: "${currentDescription}". 
      Improve SEO & Conversion.
      RETURN ONLY RAW JSON.
      JSON: { "optimizedTitle": "...", "optimizedDescription": "..." } 
    `;
    const result = await model.generateContent(prompt);
    return cleanAndParseJSON(result.response.text());
  } catch (error) { console.error("Optimization Error:", error); throw error; }
}

/**
 * 🔭 BRAIN 3: THE SCOUT (MARKET ANALYST - STRATEGY EDITION)
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    
    // 🚨 PREMIUM "PRO STRATEGY" PROMPT
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
    return cleanAndParseJSON(result.response.text());
    
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
