import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);

// 🛑 MODEL LOCKED (Using your working model)
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
 * This instruction block is injected into every request to ensure high accuracy.
 */
const DEEP_VISION_PROTOCOL = `
  **CRITICAL IMAGE ANALYSIS PROTOCOL:**
  1. **Micro-Defect Scan:** Inspect for pilling, scratches >1mm, stains, or fading. Mark distinct flaws.
  2. **Material DNA:** Identify fabric weight (e.g., "Heavyweight French Terry" vs "Cotton").
  3. **Aesthetic Match:** Classify the exact style (e.g., "Y2K", "Gorpcore", "Quiet Luxury").
  4. **Brand Verification:** Read labels/tags even if blurry.
`;

/**
 * 🎨 MARKETPLACE PROMPT ENGINEER
 */
const getPlatformPrompt = (platform: string, isProMode: boolean, userCondition: string) => {
  const baseHelper = `Analyze these images and return valid JSON.`;
  const conditionContext = userCondition ? `IMPORTANT: User says condition is "${userCondition}". Ensure description reflects this honesty.` : '';

  // 💎 PREMIUM EBAY HTML TEMPLATE (Modern, Mobile-Responsive)
  const EBAY_HTML_TEMPLATE = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 900px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <div style="text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 20px;">
        <span style="background: #000; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Authenticated</span>
        <h1 style="font-size: 28px; margin: 15px 0 10px; letter-spacing: -0.5px;">{{TITLE}}</h1>
        <p style="color: #666; font-style: italic; font-size: 16px;">{{MICRO_LORE_HOOK}}</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div style="background: #f9fafb; padding: 20px; border-radius: 12px;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Item Specifics</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;"><strong>Brand:</strong> {{BRAND}}</li>
            <li style="margin-bottom: 8px;"><strong>Size:</strong> {{SIZE}}</li>
            <li style="margin-bottom: 8px;"><strong>Material:</strong> {{MATERIAL}}</li>
            <li style="margin-bottom: 8px;"><strong>Color:</strong> {{COLOR}}</li>
          </ul>
        </div>
        <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Condition Report</h3>
          <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">{{CONDITION_GRADE}}</p>
          <p style="color: #4b5563; font-size: 14px;">{{DEFECT_REPORT}}</p>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 18px; border-left: 4px solid #3b82f6; padding-left: 12px;">Why You'll Love It</h3>
        <p>{{EMOTIONAL_DESCRIPTION}}</p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; padding-top: 20px;">
        <p>⚡ Fast Shipping • 📦 Professional Packaging • 🛡️ 30-Day Returns</p>
      </div>
    </div>
  `;

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        
        **ROLE:** Poshmark SEO Stylist.
        **GOAL:** Trigger "For You" algorithm & Social Sharing.
        
        **RULES:**
        1. **Title:** Brand + Style Name + Category + Size (Max 50 chars).
        2. **Description:** Vertical list layout. Use Emojis as bullets.
        3. **Keywords:** Integrate "Aesthetics" (e.g., #Boho, #Y2K).
        
        **JSON OUTPUT MUST BE:**
        {
          "title": "Strict Poshmark Title",
          "description": "Emoji-rich description text...",
          "brand": "Detected Brand",
          "condition": "Detected Condition",
          "estimated_price": "$0.00",
          "tags": ["#Tag1", "#Tag2", "#Tag3"]
        }
      `;
    
    case 'depop':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        
        **ROLE:** Depop Trend Curator (Gen-Z Focus).
        **GOAL:** Aesthetic appeal & Vibe check.
        
        **RULES:**
        1. **Title:** Hook-style. Keep it "Clickbaity" but accurate.
        2. **Description:** Casual tone. Lowercase allowed. Use slang like "sick piece" only if item is streetwear/vintage.
        3. **Hashtags:** 5 specific subculture tags (e.g. #gorpcore #coquette).
        
        **JSON OUTPUT MUST BE:**
        {
          "title": "Aesthetic Hook Title",
          "description": "Casual vibe description...",
          "brand": "Brand",
          "condition": "Condition",
          "estimated_price": "$0.00",
          "tags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
        }
      `;

    case 'mercari':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        
        **ROLE:** Mercari Quick-Flip Assistant.
        **GOAL:** Speed & Friction-free reading.
        
        **RULES:**
        1. **Title:** Utilitarian. Brand + Item + Size + Condition.
        2. **Description:** Short paragraphs. "Ships Fast" mention.
        3. **Hashtags:** Exactly 3 tags.
        
        **JSON OUTPUT MUST BE:**
        {
          "title": "Utilitarian Title",
          "description": "Short punchy description...",
          "brand": "Brand",
          "condition": "Condition",
          "estimated_price": "$0.00",
          "tags": ["#tag1", "#tag2", "#tag3"]
        }
      `;

    case 'etsy':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        
        **ROLE:** Etsy Artisan Guide.
        **GOAL:** Human-Centric Storytelling.
        
        **RULES:**
        1. **Title:** Long-tail. Product Identity first. "Handmade Ceramic Mug..."
        2. **Description:** Emotional storytelling. Focus on "Maker", "Material", "History".
        3. **Vintage Check:** If age > 20 years, explicitly state flaws as "character".
        
        **JSON OUTPUT MUST BE:**
        {
          "title": "Long Conversational Title",
          "description": "Storytelling description...",
          "brand": "Maker/Brand",
          "condition": "Vintage/Handmade",
          "estimated_price": "$0.00",
          "tags": ["tag1", "tag2", "tag3"]
        }
      `;

    case 'shopify':
    case 'facebook':
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        **ROLE:** E-Commerce SEO Architect.
        **RULES:** Semantic richness. Focus on "Use Case" (e.g. "Perfect for winter...").
        **JSON OUTPUT:** Standard JSON with professional description.
      `;

    case 'ebay':
    default:
      return `
        ${baseHelper} ${conditionContext} ${DEEP_VISION_PROTOCOL}
        
        **ROLE:** eBay Cassini Algorithm Specialist (Premium).
        **GOAL:** Maximize metadata density & visual trust.
        
        **RULES:**
        1. **Title:** STRICT 80 chars. Brand + Gender + Item + Material + Size. NO FLUFF.
        2. **Description:** You MUST fill the 'description' field with the provided HTML Template.
           - Replace {{TITLE}} with your optimized title.
           - Replace {{MICRO_LORE_HOOK}} with a 1-sentence sales hook.
           - Replace {{BRAND}}, {{SIZE}}, {{MATERIAL}}, {{COLOR}} with deep analysis data.
           - Replace {{CONDITION_GRADE}} with objective grade (e.g. "Excellent Pre-Owned").
           - Replace {{DEFECT_REPORT}} with honest defect scan results.
           - Replace {{EMOTIONAL_DESCRIPTION}} with persuasive copy.
        
        **HTML TEMPLATE TO USE:**
        ${EBAY_HTML_TEMPLATE}
        
        **JSON OUTPUT MUST BE:**
        {
          "title": "Cassini Optimized Title (Max 80)",
          "description": "THE_FULL_HTML_CODE_HERE",
          "brand": "Brand",
          "condition": "Condition",
          "estimated_price": "$0.00",
          "tags": ["eBay Item Specifics"]
        }
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
