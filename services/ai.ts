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
  **CRITICAL IMAGE ANALYSIS PROTOCOL:**
  1. **Micro-Defect Scan:** Inspect for pilling, scratches >1mm, stains, or fading. Mark distinct flaws.
  2. **Material DNA:** Identify fabric weight (e.g., "Heavyweight French Terry" vs "Cotton").
  3. **Aesthetic Match:** Classify the exact style (e.g., "Y2K", "Gorpcore", "Quiet Luxury").
  4. **Brand Verification:** Read labels/tags even if blurry.
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

  // 🔵 EBAY HTML TEMPLATE (Updated: Cleaner, No "Authenticated" Badge)
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
        <h3 style="font-size: 18px; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 10px;">Expert Analysis</h3>
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

      <h2>Expert Analysis</h2>
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

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Poshmark SEO Stylist.
        **RULES:**
        1. Vertical list layout. Use Emojis as bullets.
        2. Integrate "Aesthetics" (e.g., #Boho, #Y2K).
        **JSON OUTPUT:** { "title": "...", "description": "PLAIN TEXT WITH EMOJIS...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;
    
    case 'depop':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Depop Trend Curator.
        **RULES:**
        1. Title: Aesthetic Hook.
        2. Description: Casual tone. Lowercase allowed.
        **JSON OUTPUT:** { "title": "...", "description": "CASUAL TEXT...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;

    case 'mercari':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Mercari Quick-Flip Assistant.
        **RULES:**
        1. Short paragraphs. "Ships Fast" mention.
        **JSON OUTPUT:** { "title": "...", "description": "PUNCHY TEXT...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;

    case 'etsy':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Etsy Artisan Guide.
        **RULES:**
        1. Description: Storytelling. Focus on "Maker", "History".
        **JSON OUTPUT:** { "title": "...", "description": "STORY TEXT...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;

    case 'facebook':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL} ${NO_MARKDOWN_PROTOCOL}
        **ROLE:** Local Commerce Connector.
        **RULES:**
        1. Focus: "Proximity" keywords. Simple and direct.
        **JSON OUTPUT:** { "title": "...", "description": "SIMPLE TEXT...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;

    case 'shopify':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        **ROLE:** Shopify SEO Architect.
        **GOAL:** Semantic Richness for Google SGE.
        **RULES:**
        1. Use the provided HTML Template.
        2. Replace {{SEMANTIC_INTRO}} with a context-rich intro.
        3. Replace {{SIZE_ANSWER}} and {{DEFECT_REPORT}} with data.
        **HTML TEMPLATE:**
        ${SHOPIFY_HTML_TEMPLATE}
        **JSON OUTPUT:** { "title": "...", "description": "FULL_HTML_CODE...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;

    case 'ebay':
    default:
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        **ROLE:** eBay Cassini Algorithm Specialist.
        **RULES:**
        1. **Title:** STRICT 80 chars. Brand + Gender + Item + Material + Size.
        2. **Description:** Use the provided HTML Template.
           - Replace {{TITLE}} with optimized title.
           - Replace {{SEMANTIC_INTRO}} with a professional summary (no fluff).
           - Replace {{DETAILED_ANALYSIS}} with expert insights on quality/style.
           - Replace {{DEFECT_REPORT}} with honest defect scan.
        **HTML TEMPLATE:**
        ${EBAY_HTML_TEMPLATE}
        **JSON OUTPUT:** { "title": "...", "description": "FULL_HTML_CODE...", "brand": "...", "condition": "...", "estimated_price": "...", "tags": [...] }
      `;
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
