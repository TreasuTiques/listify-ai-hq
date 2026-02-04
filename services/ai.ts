import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 MODEL LOCKED
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

const DEEP_VISION_PROTOCOL = `
  **INTERNAL VISUAL ANALYSIS:**
  1. Inspect for pilling, scratches, stains, or fading.
  2. Identify fabric weight/material feel.
  3. Classify the exact style (e.g., "Y2K", "Gorpcore").
  4. Read labels/tags.
`;

const getPlatformPrompt = (platform: string, isProMode: boolean, userContext: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const contextBlock = userContext ? `IMPORTANT USER CONTEXT & SPECS:\n${userContext}\nEnsure description reflects these details.` : '';
  const EBAY_HTML_TEMPLATE = `<div style="font-family: sans-serif; max-width: 900px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;"><div style="text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 20px;"><h1 style="font-size: 24px; margin: 10px 0;">{{TITLE}}</h1><p style="color: #555; font-size: 16px;">{{SEMANTIC_INTRO}}</p></div><div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;"><h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Item Specifics</h3><ul style="list-style: none; padding: 0; margin: 0;"><li style="margin-bottom: 8px;"><strong>Brand:</strong> {{BRAND}}</li><li style="margin-bottom: 8px;"><strong>Material:</strong> {{MATERIAL}}</li><li style="margin-bottom: 8px;"><strong>Condition:</strong> {{CONDITION_GRADE}}</li></ul></div><div style="margin-bottom: 30px;"><h3 style="font-size: 18px; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 10px;">Detailed Analysis</h3><p>{{DETAILED_ANALYSIS}}</p><br><p><strong>Defects/Notes:</strong> {{DEFECT_REPORT}}</p></div><div style="text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; padding-top: 20px;"><p>⚡ Fast Shipping • 📦 Professional Packaging</p></div></div>`;
  const SHOPIFY_HTML_TEMPLATE = `<div class="product-description" style="font-family: inherit;"><p class="intro">{{SEMANTIC_INTRO}}</p><h2>Product Specifications</h2><ul><li><strong>Material:</strong> {{MATERIAL}}</li><li><strong>Color:</strong> {{COLOR}}</li><li><strong>Condition:</strong> {{CONDITION_GRADE}}</li></ul><h2>Detailed Analysis</h2><p>{{DETAILED_ANALYSIS}}</p><h2>Frequently Asked Questions</h2><dl><dt><strong>Is this item true to size?</strong></dt><dd>{{SIZE_ANSWER}}</dd><dt><strong>Any notable flaws?</strong></dt><dd>{{DEFECT_REPORT}}</dd></dl></div>`;
  
  const OUTPUT_INSTRUCTION = `**OUTPUT JSON STRUCTURE (REQUIRED):** { "title": "Optimized Title (Max 80 chars)", "description": "FULL HTML OR TEXT DESCRIPTION", "estimated_price": "$20.00", "tags": ["tag1", "tag2"], "item_specifics": { "brand": "Extract or Unknown", "category": "Category Path", "size": "Estimate", "color": "Dominant", "material": "Visual ID", "year": "Era", "made_in": "Origin", "department": "Dept", "model": "Model", "theme": "Theme", "features": "Features" } }`;
  
  const PREMIUM_PRO_PROMPT = `🚨 ACTIVATE "REAL-TALK RESELLER ENGINE" 🚨 You are an expert flipper. **CRITICAL VOCABULARY RULE:** Write at an **8th GRADE READING LEVEL**. Simple, direct. **BANNED WORDS:** Whimsical, Curated, Bespoke, Exquisite, Tapestry, Symphony. **APPROVED TONE:** "Just found this," "Super clean," "Hard to find." 1. **THEME DETECTION:** Auto-detect ERA/STYLE. 2. **SKU PILL BADGE:** Place unique SKU in a dedicated <div> ABOVE main title. 3. **MICRO-LORE:** Add 1 line of relatable nostalgia.`;
  const STANDARD_PROMPT = `**ROLE:** eBay Cassini Algorithm Specialist. **RULES:** 1. Title: STRICT 80 chars. 2. Description: Use HTML Template. **HTML TEMPLATE:** ${EBAY_HTML_TEMPLATE}`;

  let selectedPrompt = "";
  switch (platform.toLowerCase()) {
    case 'poshmark': selectedPrompt = `...Poshmark Logic... ${OUTPUT_INSTRUCTION}`; break; 
    case 'depop': selectedPrompt = `...Depop Logic... ${OUTPUT_INSTRUCTION}`; break;
    case 'shopify': selectedPrompt = `...Shopify Logic... HTML TEMPLATE: ${SHOPIFY_HTML_TEMPLATE} ${OUTPUT_INSTRUCTION}`; break;
    case 'ebay': default: selectedPrompt = isProMode ? PREMIUM_PRO_PROMPT : STANDARD_PROMPT; selectedPrompt += `\n${OUTPUT_INSTRUCTION}`; break;
  }
  return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${selectedPrompt}`;
};

export async function generateListingFromImages(imageFiles: File[], platform: string = 'ebay', isProMode: boolean = false, userContext: string = '') {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));
    const prompt = getPlatformPrompt(platform, isProMode, userContext);
    const result = await model.generateContent([prompt, ...imageParts]);
    return cleanAndParseJSON(result.response.text());
  } catch (error) { console.error("AI Generation Error:", error); throw error; }
}

export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Act as an expert reseller on ${platform}. Analyze this listing: Title: "${currentTitle}", Desc: "${currentDescription}". Improve SEO. RETURN ONLY RAW JSON: { "optimizedTitle": "...", "optimizedDescription": "..." }`;
    const result = await model.generateContent(prompt);
    return cleanAndParseJSON(result.response.text());
  } catch (error) { console.error("Optimization Error:", error); throw error; }
}

/**
 * 🔭 BRAIN 3: THE SCOUT (MARKET ANALYST V2)
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    
    // 🚨 PREMIUM "MARKET VITALS" PROMPT
    const instruction = `
      Act as a Senior Market Analyst for eBay Resellers. 
      Identify this item: "${productName}". 
      
      Perform a deep simulated market analysis based on current trends.
      
      **RETURN ONLY RAW JSON** with this exact structure:
      {
        "item_name": "Short precise item name",
        "minPrice": 10,
        "maxPrice": 20,
        "demand_score": 75,
        "reason": "1 short professional sentence on why.",
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
        "strategy_tip": "One concise, actionable sentence on how to sell this specific item for max profit (e.g., 'Auction starting at $X recommended due to rarity' or 'List high with Best Offer')."
      }
      
      *Definitions:*
      - demand_score: 0-100.
      - confidence: 0-100 (How sure are you of the ID/Pricing?).
      - trend: Current market direction.
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
