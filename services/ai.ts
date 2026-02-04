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
 * 🧠 DEEP VISION PROTOCOL (INTERNAL ANALYSIS ONLY)
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

  // 🔥 ELITE PRO PROMPT (The "Real-Talk" Engine)
  const PREMIUM_PRO_PROMPT = `
    🚨 ACTIVATE "REAL-TALK RESELLER ENGINE" 🚨
    
    You are an expert flipper writing a high-converting eBay listing. 
    
    **CRITICAL VOCABULARY RULE:** - Write at an **8th GRADE READING LEVEL**. Simple, direct, natural English.
    - **BANNED WORDS (DO NOT USE):** Whimsical, Curated, Bespoke, Exquisite, Tapestry, Symphony, Heritage, Provenance, Iconic, Meticulous.
    - **APPROVED TONE:** "Just found this," "Super clean," "Hard to find," "Great shape," "Cool details," "Ready to ship."
    
    **CRITICAL WHITE-LABEL RULE:** - NEVER use specific names (e.g. "Juan Acuña", "Sellistio").
    - Use generic headers like "Vintage Vault Find", "The Collection", or just the Item Name.

    1. **THEME DETECTION:**
       - Auto-detect ERA/STYLE (e.g., 80s Neon, 90s Grunge, Minimalist, Y2K).
       - Style the HTML colors/fonts inline to match this theme.
    
    2. **SKU PILL BADGE (NO OVERLAP RULE):**
       - Generate a unique SKU (e.g., VINT-123).
       - **PLACEMENT:** Place it in a dedicated <div> ABOVE the main title. Align it to the RIGHT.
       - **STYLING:** border-radius: 999px; background: #fff; padding: 4px 10px; font-size: 10px; border: 1px solid #ccc; display: inline-block; margin-bottom: 10px;
    
    3. **MICRO-LORE:**
       - Add 1 line of relatable nostalgia. (e.g., "Takes you right back to the 90s," "This is the stuff we grew up with.")

    4. **HTML STRUCTURE (Single Block):**
       - **SKU Row:** Right-aligned container with the badge.
       - **Main Title Panel:** Centered, themed.
       - **Description**: Conversational and honest. Tell them exactly what they are buying.
       - **Features**: Bullet points with emojis.
       - **Why You'll Love It**: Simple reasons (e.g. "It looks cool," "Hard to find these days").
       - **CTA Panel**: Fun closing tagline (1-3-1 format).

    5. **FORMATTING RULES (STRICT):**
       - **NO CURSIVE FONTS**: Use clean Sans-Serif or Serif fonts ONLY.
       - **NO MARKDOWN**: Do NOT use asterisks (**) for bold text. Use <strong> tags ONLY.
       - **NO MARKDOWN HEADERS**: Do NOT use # for headers. Use HTML tags (<h3>, <h4>).
       - Output must be pure, valid HTML strings inside the JSON.
  `;

  // 📋 UNIVERSAL OUTPUT STRUCTURE (Crucial for Auto-Populate)
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
        "year": "Era or Copyright Date",
        "made_in": "Country of Origin tag",
        "department": "Men/Women/Kids/Unisex",
        "model": "Model name/number",
        "theme": "Aesthetic theme",
        "features": "Key features list"
      }
    }
  `;

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `
        ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Poshmark SEO Stylist.
        **RULES:**
        1. Vertical list layout. Use Emojis as bullets.
        2. Integrate "Aesthetics" (e.g., #Boho, #Y2K).
        ${OUTPUT_JSON_STRUCTURE}
      `;
    
    case 'depop':
      return `
        ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Depop Trend Curator.
        **RULES:**
        1. Title: Aesthetic Hook.
        2. Description: Casual tone. Lowercase allowed.
        ${OUTPUT_JSON_STRUCTURE}
      `;

    case 'mercari':
      return `
        ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Mercari Quick-Flip Assistant.
        **RULES:**
        1. Short paragraphs. "Ships Fast" mention.
        ${OUTPUT_JSON_STRUCTURE}
      `;

    case 'etsy':
      return `
        ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Etsy Artisan Guide.
        **RULES:**
        1. Description: Storytelling. Focus on "Maker", "History".
        ${OUTPUT_JSON_STRUCTURE}
      `;

    case 'facebook':
      return `
        ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Local Commerce Connector.
        **RULES:**
        1. Focus: "Proximity" keywords. Simple and direct.
        ${OUTPUT_JSON_STRUCTURE}
      `;

    case 'shopify':
      return `
        ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL}
        **ROLE:** Shopify SEO Architect.
        **GOAL:** Semantic Richness for Google SGE.
        **CRITICAL RULE:** Do NOT use asterisks (**) inside the text. Use <strong> tags for emphasis.
        **RULES:**
        1. Use the provided HTML Template.
        2. Replace {{SEMANTIC_INTRO}} with a context-rich intro.
        3. Replace {{DETAILED_ANALYSIS}} with expert insights.
        **HTML TEMPLATE:**
        ${SHOPIFY_HTML_TEMPLATE}
        ${OUTPUT_JSON_STRUCTURE}
      `;

    case 'ebay':
    default:
      // 🔥 CHECK FOR PRO MODE HERE
      if (isProMode) {
        return `
          ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL}
          ${PREMIUM_PRO_PROMPT}
          ${OUTPUT_JSON_STRUCTURE}
        `;
      } else {
        return `
          ${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL}
          **ROLE:** eBay Cassini Algorithm Specialist.
          **CRITICAL RULE:** Do NOT use asterisks (**) inside the text. Use <strong> tags for emphasis.
          **RULES:**
          1. Title: STRICT 80 chars. Brand + Gender + Item + Material + Size.
          2. Description: Use the provided HTML Template.
          **HTML TEMPLATE:**
          ${EBAY_HTML_TEMPLATE}
          ${OUTPUT_JSON_STRUCTURE}
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
 * 🩺 BRAIN 2: THE DOCTOR (SEO OPTIMIZER)
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
