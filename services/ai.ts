import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 MODEL LOCKED
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
  4. Read labels/tags.
`;

/**
 * 🚫 NO MARKDOWN PROTOCOL
 */
const NO_MARKDOWN_PROTOCOL = `
  **FORMATTING RULES - STRICT:**
  - OUTPUT MUST BE PLAIN TEXT ONLY.
  - DO NOT use markdown characters like asterisks (** or *).
  - DO NOT use hash signs (#) for headers.
  - To emphasize a header, use UPPERCASE (e.g. "CONDITION:" instead of "**Condition:**").
  - Use standard hyphens (-) for bullet points.
`;

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userCondition: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const conditionContext = userCondition ? `IMPORTANT: User says condition is "${userCondition}". Ensure description reflects this honesty.` : '';

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

  // 🚨 UNIVERSAL JSON OUTPUT STRUCTURE (Must include item_specifics)
  const OUTPUT_INSTRUCTION = `
    **OUTPUT JSON STRUCTURE (REQUIRED):**
    {
      "title": "Optimized Title (Max 80 chars)",
      "description": "FULL HTML OR TEXT DESCRIPTION",
      "estimated_price": "$20.00",
      "tags": ["tag1", "tag2"],
      "item_specifics": {
        "brand": "Extract from image or Unknown",
        "category": "Suggest Category Path (e.g. Clothing > Men > Shirts)",
        "size": "Estimate dimensions/size or One Size",
        "color": "Dominant colors",
        "material": "Visual material ID",
        "year": "Era or Copyright Date",
        "made_in": "Country of Origin tag or Unknown",
        "department": "Men/Women/Kids/Unisex",
        "model": "Model name/number or N/A",
        "theme": "Aesthetic theme",
        "features": "Key features list"
      }
    }
  `;

  // 🔥 ELITE PRO PROMPT (Real-Talk / 8th Grade English / No Fluff)
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

  // 📝 STANDARD MODE PROMPT (Clean, Professional)
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
      selectedPrompt = `...Poshmark Logic... ${OUTPUT_INSTRUCTION}`; break; 
    case 'depop':
      selectedPrompt = `...Depop Logic... ${OUTPUT_INSTRUCTION}`; break;
    case 'shopify':
      selectedPrompt = `...Shopify Logic... HTML TEMPLATE: ${SHOPIFY_HTML_TEMPLATE} ${OUTPUT_INSTRUCTION}`; break;
    case 'ebay':
    default:
      // 🔥 CHECK FOR PRO MODE HERE
      selectedPrompt = isProMode ? PREMIUM_PRO_PROMPT : STANDARD_PROMPT;
      selectedPrompt += `\n${OUTPUT_INSTRUCTION}`; // Append JSON requirement to both
      break;
  }

  return `${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL} ${selectedPrompt}`;
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
 * 🔭 BRAIN 3: THE SCOUT
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let requestParts: any[] = [];
    
    // STRICT JSON INSTRUCTION
    const instruction = `
      Act as an expert antique and resale appraiser. 
      Identify this item: "${productName}". 
      Perform deep market analysis.
      RETURN ONLY RAW JSON. No intro text.
      Format: { "minPrice": 10, "maxPrice": 20, "demand": "High", "verdict": "BUY", "reason": "Short reason" }
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
