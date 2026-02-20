import { supabase } from "../supabaseClient.js";
import { useAIStore, Message } from "../stores/aiStore.ts";
// import { fileToGenerativePart } from "./fileUtils";
// import { getPlatformPrompt } from "./prompts";
// import { logUsage } from "./usage";
// import { cleanAndParseJSON } from "./parse";

// 🚨 SYSTEM HEARTBEAT TEST
console.log("AI Service Loaded. Supabase status:", supabase ? "Connected ✅" : "Missing ❌");

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

// 📉 HELPER: SMART IMAGE RESIZER 2.0 (Robust & Safe)
// Tries to shrink images. If it fails (e.g. HEIC files), it sends the original safely.
const fileToGenerativePart = async (file: File) => {
  return new Promise<any>((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();

      // 🛡️ SAFETY NET: If resizing fails (e.g. iPhone HEIC), send original
      img.onerror = () => {
        console.warn("Resizer skipped (incompatible format), sending original.");
        const originalBase64 = (event.target?.result as string).split(',')[1];
        resolve({ inlineData: { data: originalBase64, mimeType: file.type } });
      };

      img.onload = () => {
        try {
          // Calculate new size (Max 800px)
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(width);   // Fixes browser decimal bugs
          canvas.height = Math.floor(height);

          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error("Canvas context missing");

          ctx.drawImage(img, 0, 0, Math.floor(width), Math.floor(height));

          // Compress to JPEG at 70% quality
          const base64 = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];
          resolve({ inlineData: { data: base64, mimeType: 'image/jpeg' } });
        } catch (err) {
          // 🛡️ FALLBACK: If canvas crashes, send original
          console.warn("Resizer error, sending original:", err);
          const originalBase64 = (event.target?.result as string).split(',')[1];
          resolve({ inlineData: { data: originalBase64, mimeType: file.type } });
        }
      };

      // Load the image data
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 📡 API WRAPPER for Serverless Gemini
 */
const callGeminiApi = async (contents: any[]) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }

  return await response.json();
};



const cleanAndParseJSON = (text: string, isProMode: boolean = true) => {
  try {
    console.log("Raw AI output:", text);

    // 1️⃣ Remove code fences if present
    let clean = text.replace(/```json|```/gi, '');

    // 2️⃣ Find the first valid JSON object {...} and ignore everything outside
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in text");
    }
    clean = clean.substring(firstBrace, lastBrace + 1);

    console.log("Trimmed to first JSON block:", clean);
   
  
    const result = JSON.parse(clean);
    
    
    console.log("Parsed JSON object:", result);
    const html = isProMode ? renderProListingCard(result) : renderStandardListing(result);
    console.log("Generated HTML:", html);
    return {result, html};

  } catch (error) {
    console.error("JSON Parse Failed:", error);
    throw error;
  }
};

export default cleanAndParseJSON;
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
  // FIX: Force AI to be descriptive even if userContext is brief
  const contextBlock = userContext
    ? `\n**IMPORTANT CONTEXT:** "${userContext}".\n*INSTRUCTION:* Even if context is short, perform a FULL visual analysis.`
    : '';

  // 🔵 EBAY HTML TEMPLATE (STANDARD - MODERN MINIMALIST)
  const EBAY_HTML_TEMPLATE = `
    <div style=\"font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; color: #333; line-height: 1.6;\">
      <h2 style=\"border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 25px; color: #222; text-align: center;\">{{TITLE}}</h2>
      
      <div style=\"background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;\">
        <h3 style=\"margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;\">Product Specifications</h3>
        <table style=\"width: 100%; border-collapse: collapse; margin-top: 10px;\">
           <tr>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee; width: 30%; font-weight: bold;\">Brand</td>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee;\">{{BRAND}}</td>
           </tr>
           <tr>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;\">Size</td>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee;\">{{SIZE}}</td>
           </tr>
           <tr>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;\">Material</td>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee;\">{{MATERIAL}}</td>
           </tr>
           <tr>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;\">Condition</td>
             <td style=\"padding: 8px 0; border-bottom: 1px solid #eee;\">{{CONDITION_GRADE}}</td>
           </tr>
        </table>
      </div>

      <div style=\"margin-bottom: 30px;\">
        <h3 style=\"font-size: 16px; color: #000; margin-bottom: 10px; font-weight: bold;\">Product Overview</h3>
        <p style=\"color: #444;\">{{DETAILED_ANALYSIS}}</p>
      </div>

      <div style=\"margin-bottom: 30px; border-left: 4px solid #e74c3c; padding-left: 15px;\">
        <h3 style=\"font-size: 16px; color: #e74c3c; margin-bottom: 5px; font-weight: bold;\">Condition Details</h3>
        <p style=\"margin: 0;\">{{DEFECT_REPORT}}</p>
      </div>

      <div style=\"text-align: center; font-size: 13px; color: #888; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;\">
        <p>Ships fast & secure • Tracking included • Professional Seller</p>
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

  // 🔥 JUAN ACUÑA'S PREMIUM ENGINE (Visual Web Designer Mode)
const PREMIUM_PRO_PROMPT = `
🚨 ACTIVATE PREMIUM CONTENT DESIGN ENGINE 🚨

You are a creative product storyteller and visual art director.

You DO NOT write HTML or code.
You design structured presentation content that will be inserted into a prebuilt UI layout.

Your job:
Create compelling listing content and choose a matching visual theme.
Return ONLY semantic data — never markup.

----------------------
1) THEME DESIGN
----------------------
Determine the item's aesthetic identity.

Return a theme with:
- vibe: short label (examples: Y2K Tech, Outdoor Utility, Streetwear Sport, Luxury Minimal, Retro 90s)
- primary_color: strong accent hex color (e.g. #2A4EFF)
- secondary_color: soft complementary background hex color

If uncertain, use:
primary_color: #0056b3
secondary_color: #f8f9fa

Colors must match the product personality, not randomly chosen.

----------------------
2) CONTENT WRITING
----------------------

HEADLINE:
Short catchy marketplace hook.

SUBHEADLINE:
Atmospheric supporting line creating mood or nostalgia.

DESCRIPTION:
Warm confident description selling the feeling and use-case.
Readable at 8th grade level.

COLLECTOR_NOTE:
Why this item is desirable, special, or worth owning.

CONDITION_REPORT:
Write a detailed honest narrative describing wear, preservation, flaws, and strengths.
Never be vague.

----------------------
3) HIGHLIGHTS
----------------------
Generate exactly 3 feature objects:
- title: short memorable label
- text: concrete benefit
- icon: single emoji representing the feature

No generic filler.

----------------------
4) CALL TO ACTION
----------------------
Generate:
- headline: energetic urgency phrase
- bullets: 3 persuasive selling points
- closing_line: witty memorable closer

Tone: fun, professional, era-appropriate.

IMPORTANT:
You are designing CONTENT — not layout.
Do not include HTML, CSS, markdown, or placeholders.
`;

// 📝 STANDARD PROMPT (Deterministic, no HTML)
const STANDARD_PROMPT = `
🚨 ACTIVATE "STANDARD LISTING ENGINE" 🚨

**ROLE:** eBay / Marketplace Listing Specialist
**STYLE:** Modern Minimalist / High-End Corporate
**TONE:** Professional, factual, neutral
**VISUALS:** No emojis, no lore, no decorative flair

**CRITICAL RULES:**
1. Title: STRICT 80 characters max. Include Brand + Gender + Item + Material + Size if available.
2. Description: Concise, factual, professional.
3. Output JSON ONLY, raw, parseable, no markdown, no HTML, no CSS.
4. Use <strong> tags for emphasis if needed.
5. All fields must be plain text or arrays/objects. Do not include placeholders, template tags, or markup.

**REQUIRED OUTPUT JSON STRUCTURE:**
{
  "title": "Optimized product title (Max 80 chars)",
  "description": "Full product description",
  "item_specifics": {
    "brand": "Brand name or Unknown",
    "size": "Size or Unknown",
    "material": "Material or Unknown",
    "category": "Category path",
    "color": "Primary colors",
    "year": "Manufacture/era or Unknown",
    "department": "Men/Women/Unisex",
    "model": "Model name or Unknown",
    "features": "Key features list"
  },
  "condition_report": "Full factual condition details",
  "condition_report_grade": "Excellent / Very Good / Good / Fair",
  "estimated_price": "$XX.XX",
  "tags": ["tag1","tag2", "..."]
}

CRITICAL FINAL INSTRUCTION: Output RAW JSON only. Start with { and end with }. No HTML, no code fences, no explanations.
`;
  // 🚨 OUTPUT JSON STRUCTURE
const OUTPUT_INSTRUCTION = `
You are generating structured listing data for a rendering engine.

IMPORTANT RULES:
- DO NOT write HTML.
- DO NOT write CSS.
- DO NOT include escaped quotes or special formatting.
- Every field must be plain text or arrays/objects.
- The response must be valid JSON parsable by JSON.parse().

OUTPUT JSON STRUCTURE (REQUIRED):

{
  "title": "Optimized marketplace title (max 80 chars)",

  "theme": {
    "vibe": "short aesthetic label (e.g., Y2K Tech, Outdoor Utility, Luxury Minimal)",
    "primary_color": "hex color like #3A6EA5",
    "secondary_color": "soft complementary hex color"
  },

  "headline": "fun attention-grabbing headline",
  "subheadline": "short atmospheric supporting line",

  "description": "Warm, confident product description in text form. Sell the feeling, not just the object.",

  "collector_note": "Why this item is special, collectible, or desirable",

  "highlights": [
    { "title": "Feature name", "text": "Specific benefit", "icon": "single emoji" },
    { "title": "Feature name", "text": "Specific benefit", "icon": "single emoji" },
    { "title": "Feature name", "text": "Specific benefit", "icon": "single emoji" }
  ],

  "condition_report": "Detailed honest condition explanation",

  "call_to_action": {
    "headline": "Urgent fun phrase",
    "bullets": ["unique selling point", "unique selling point", "unique selling point"],
    "closing_line": "witty memorable closing hook"
  },

  "estimated_price": "$00.00",
  "tags": ["relevant", "search", "keywords"],

  "item_specifics": {
    "brand": "",
    "category": "",
    "size": "",
    "color": "",
    "material": "",
    "year": "",
    "made_in": "",
    "department": "",
    "model": "",
    "theme": "",
    "features": ""
  }
}

CRITICAL FINAL RULE:
Return RAW JSON only.
Start with { and end with }.
No markdown. No commentary. No explanations.
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
      if (isProMode) {
        return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${PREMIUM_PRO_PROMPT} ${OUTPUT_INSTRUCTION}`;
      } else {
        return `${baseHelper} ${contextBlock} ${DEEP_VISION_PROTOCOL} ${STANDARD_PROMPT}`;
      }
  }
};

export function renderProListingCard(data: any) {
  return `
  <div style="font-family: Helvetica; max-width: 900px; margin: 0 auto; border: 3px solid ${data.theme.primary_color}; background: white; border-radius: 12px; overflow: hidden;">

    <div style="background: ${data.theme.secondary_color}; padding: 25px; border-bottom: 2px solid ${data.theme.primary_color};">
      <h1 style="color: ${data.theme.primary_color}; font-size: 28px; font-weight: 800;">
        ${data.headline}
      </h1>
      <p style="font-style: italic; color: #555;">
        ${data.subheadline}
      </p>
    </div>

    <div style="padding: 30px;">
      <p style="font-size: 18px; line-height: 1.6;">
        ${data.description}
      </p>

      <div style="background:#f8f9fa;border-left:6px solid ${data.theme.primary_color};padding:15px;margin-bottom:30px;">
        💡 <strong>Collector's Note:</strong> ${data.collector_note}
      </div>

      <h2 style="color:${data.theme.primary_color};">✨ The Highlights</h2>
      <ul>
        ${data.highlights.map(h => `<li>${h.icon} <strong>${h.title}:</strong> ${h.text}</li>`).join("")}
      </ul>

      <h2 style="color:${data.theme.primary_color};">🔍 Condition Report</h2>
      <p>${data.condition_report}</p>
    </div>

    <div style="background:${data.theme.primary_color};color:white;padding:30px;text-align:center;">
      <h2>${data.call_to_action.headline}</h2>
      <div>
        ${data.call_to_action.bullets.map(b => `<span>✓ ${b}</span>`).join(" ")}
      </div>
      <p><strong>${data.call_to_action.closing_line}</strong></p>
    </div>

  </div>
  `;
}


export function renderStandardListing(data: any) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; color: #333; line-height: 1.6;">

    <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 25px; color: #222; text-align: center;">
      ${data.title}
    </h2>

    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
      <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Product Specifications</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 30%; font-weight: bold;">Brand</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.item_specifics.brand}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Size</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.item_specifics.size}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Material</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.item_specifics.material}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Condition</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.condition_report_grade || "N/A"}</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom: 30px;">
      <h3 style="font-size: 16px; color: #000; margin-bottom: 10px; font-weight: bold;">Product Overview</h3>
      <p style="color: #444;">${data.description}</p>
    </div>

    <div style="margin-bottom: 30px; border-left: 4px solid #e74c3c; padding-left: 15px;">
      <h3 style="font-size: 16px; color: #e74c3c; margin-bottom: 5px; font-weight: bold;">Condition Details</h3>
      <p style="margin: 0;">${data.condition_report}</p>
    </div>

    <div style="text-align: center; font-size: 13px; color: #888; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
      <p>Ships fast & secure • Tracking included • Professional Seller</p>
    </div>

  </div>
  `;
}
/**
 * 📸 BRAIN 1: THE BUILDER
 */

export async function generateListingFromImages(
  imageFiles: File[],
  platform: string = "ebay",
  isProMode: boolean = false,
  userContext: string = ""
) {
  try {
    // Convert images to generative parts
    const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));

    // Get the platform-specific prompt
    const prompt = getPlatformPrompt(platform, isProMode, userContext);

//     // Combine prompt + image parts
// const combinedContent = `${prompt}\n\n${imageParts.map(p => JSON.stringify(p)).join("\n")}`;

// const messages: Message[] = [
//   { role: "user", content: combinedContent }
// ];
// console.log(messages)
    // Call backend via AI store
    const data = await useAIStore.getState().generate([prompt, ...imageParts]);

    // Log usage (from backend response)
    await logUsage(data.usage, `Listing: ${platform}`);

    // Parse AI response
    return cleanAndParseJSON(data.text, isProMode);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

// export async function generateListingFromImages(imageFiles: File[], platform: string = 'ebay', isProMode: boolean = false, userContext: string = '') {
//   try {
//     const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));
//     const prompt = getPlatformPrompt(platform, isProMode, userContext);
//     console.log([prompt, ...imageParts])
//     const data = await callGeminiApi([prompt, ...imageParts]);
//     await logUsage(data.usageMetadata, `Listing: ${platform}`);
//     return cleanAndParseJSON(data.text);
//   } catch (error) { console.error("AI Generation Error:", error); throw error; }
// }
/**
 * 🩺 BRAIN 2: THE DOCTOR
 */
export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const prompt = `Act as an expert reseller on ${platform}. Improve Title: "${currentTitle}", Desc: "${currentDescription}". JSON ONLY.`;
    const data = await callGeminiApi([prompt]);
    await logUsage(data.usageMetadata, `Optimizer: ${platform}`);
    return cleanAndParseJSON(data.text);
  } catch (error) { console.error("Optimization Error:", error); throw error; }
}

/**
 * 🔭 BRAIN 3: THE SCOUT
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
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
    CRITICAL FINAL INSTRUCTION: Output RAW JSON only. Do not use markdown backticks or the word 'json'. Just start with { and end with }.`;

    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart, instruction];
    } else {
      requestParts = [instruction];
    }

    const data = await callGeminiApi(requestParts);
    await logUsage(data.usageMetadata, "Scout Analyst");
    return cleanAndParseJSON(data.text);
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
