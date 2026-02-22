import { supabase } from "../supabaseClient.js";
import { useAIStore, Message } from "../stores/aiStore.ts";
import { getPlatformPrompt } from "./prompts.ts";
import { useAuthStore } from "@/stores/authStore.ts";
// import { fileToGenerativePart } from "./fileUtils";
// import { getPlatformPrompt } from "./prompts";
// import { logUsage } from "./usage";
// import { cleanAndParseJSON } from "./parse";

// 🚨 SYSTEM HEARTBEAT TEST
console.log("AI Service Loaded. Supabase status:", supabase ? "Connected ✅" : "Missing ❌");

/**
 * 📊 TRACKING UTILITY
 */
const logUsage = async (usage: any, action: string, email: string, request_response: string, request_status: string) => {
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
      cost_est: totalCost,
      email: email,
      request_response: request_response,
      request_status: request_status
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
  
    // 1️⃣ Remove code fences if present
    let clean = text.replace(/```json|```/gi, '');

    // 2️⃣ Find the first valid JSON object {...} and ignore everything outside
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in text");
    }
    clean = clean.substring(firstBrace, lastBrace + 1);
  
    const result = JSON.parse(clean);
    console.log("Parsed JSON Result:", result);
    const html = isProMode ? composeListingHTML(result) : renderStandardListing(result);
   
    return {result, html};

  } catch (error) {
    console.error("JSON Parse Failed:", error);
    throw error;
  }
};

export default cleanAndParseJSON;
// -------------------------
// 1) Canonical Contracts
// -------------------------

export const GOOGLE_FONTS_WHITELIST = [
  "Orbitron",
  "IBM Plex Mono",
  "Inter",
  "Roboto",
  "Playfair Display",
  "Oswald",
  "Montserrat",
] as const;

export const APPROVED_SELECTORS = [
  ":root",
  "body",
  "main.listing",

  "header.hero",
  "header.hero span.era-tag",
  "header.hero h1.title-main",
  "header.hero h2.title-sub",
  "header.hero p.author-line",

  "section.seo-title",
  "section.badges",
  "ul.badge-list",
  "ul.badge-list li",
  "section.badges ul.badge-list",
"section.badges ul.badge-list li",
"section.collector-points ul.collector-list",
"table.condition-table th",
"table.condition-table td",

  "section.about",

  "section.details",
  "dl.specs",
  "dl.specs dt",
  "dl.specs dd",

  "section.condition",
  "table.condition-table",
  "table.condition-table thead th",
  "table.condition-table tbody td",
  "table.condition-table tbody tr",

  "section.contents",
  "ul.contents-list",
  "ul.contents-list li",

  "section.collector-points",
  "ul.collector-list",
  "ul.collector-list li",

  "section.nostalgia",
  "section.nostalgia h3",
  "section.nostalgia p",

  "footer.cta",
  "footer.cta h2",
  "footer.cta p",
] as const;

const APPROVED_SELECTOR_SET = new Set<string>(APPROVED_SELECTORS as readonly string[]);

// Property allowlist (keep intentionally conservative)
const ALLOWED_CSS_PROPERTIES = new Set([
  // color + backgrounds
  "color",
  "background",
  "background-color",
  "background-image",
  "background-size",
  "background-position",
  "background-repeat",
  "background-attachment",

  // typography
  "font",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-variant",
  "line-height",
  "letter-spacing",
  "text-transform",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-thickness",
  "text-shadow",
  "text-align",
  "white-space",
  "word-break",
  "overflow-wrap",

  // spacing + layout (safe subset)
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",

  "max-width",
  "width",
  "min-width",
  "height",
  "min-height",

  "display",
  "gap",
  "row-gap",
  "column-gap",

  "border",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "border-color",
  "border-radius",
  "border-style",
  "border-width",

  "box-shadow",
  "outline",
  "outline-color",
  "outline-width",
  "outline-style",

  // table niceties
  "border-collapse",
  "border-spacing",

  // simple effects (optional but useful)
  "opacity",
]);

// -------------------------
// 2) Helpers
// -------------------------

const esc = (v: any) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const normalizeFonts = (fonts: any): string[] => {
  if (!Array.isArray(fonts)) return [];
  return fonts
    .map((f) => String(f || "").trim())
    .filter(Boolean);
};

// -------------------------
// 3) Google Fonts Builder
// -------------------------

export function buildGoogleFonts(fonts: string[]) {
  const requested = normalizeFonts(fonts);

  const allowed = requested.filter((f) =>
    (GOOGLE_FONTS_WHITELIST as readonly string[]).includes(f)
  );

  if (!allowed.length) return "";

  // eBay-friendly: simple weights; keep URL short
  const family = allowed
    .slice(0, 3) // enforce max 3
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;600;700`)
    .join("&");

  return `<link href="https://fonts.googleapis.com/css2?${family}&display=swap" rel="stylesheet">`;
}

// -------------------------
// 4) CSS Sanitizer (Selector + Property allowlist)
// -------------------------
//
// NOTE: This is not a full CSS parser, but it is much stricter than simple token stripping.
// It will:
// - remove dangerous constructs
// - drop rules whose selector is not in APPROVED_SELECTORS
// - drop declarations whose property is not in ALLOWED_CSS_PROPERTIES
// - hard-cap output length to 12k chars
//
export function sanitizeAIStyle(style: string) {
  let safe = String(style ?? "");

  // Hard bans (strip or neutralize)
  const blocked = [
    /@import/gi,
    /url\(/gi,
    /expression\(/gi,
    /javascript:/gi,
    /behavior:/gi,
    /-moz-binding/gi,
    /<script/gi,
    /<\/style/gi,
    /@keyframes/gi, // optional: disallow animations to reduce risk
  ];

  for (const rule of blocked) safe = safe.replace(rule, "");

  // Remove CSS comments (often used to smuggle weird stuff)
  safe = safe.replace(/\/\*[\s\S]*?\*\//g, "");

  // Quick reject: if braces are wildly unbalanced, bail to empty
  const open = (safe.match(/{/g) || []).length;
  const close = (safe.match(/}/g) || []).length;
  if (open !== close) return "";

  // Extract rules: selector { decls }
  // Ignores nested blocks (we ban @rules anyway).
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  let out = "";

  let match: RegExpExecArray | null;
  while ((match = ruleRegex.exec(safe))) {
    const rawSelector = match[1].trim();
    const rawDecls = match[2].trim();

    // Support comma-separated selectors, but ALL must be approved
    const selectors = rawSelector
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!selectors.length) continue;

    const allSelectorsApproved = selectors.every((s) =>
      APPROVED_SELECTOR_SET.has(s)
    );
    if (!allSelectorsApproved) continue;

    // Filter declarations to allowed properties
    const decls = rawDecls
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean);

    const kept: string[] = [];

    for (const d of decls) {
      const idx = d.indexOf(":");
      if (idx <= 0) continue;

      const prop = d.slice(0, idx).trim().toLowerCase();
      const value = d.slice(idx + 1).trim();

      // allow CSS variables like --primary
      const isCustomProp = prop.startsWith("--");

      // property allowlist (or custom var)
      if (!isCustomProp && !ALLOWED_CSS_PROPERTIES.has(prop)) continue;

      // extra safety: block any lingering dangerous strings in values
      if (/url\(|@import|expression\(|javascript:/i.test(value)) continue;

      kept.push(`${prop}: ${value}`);
    }

    if (!kept.length) continue;

    out += `${selectors.join(", ")} { ${kept.join("; ")}; }\n`;

    // Early cap to avoid runaway
    if (out.length > 12000) break;
  }

  return out.slice(0, 12000);
}

// -------------------------
// 5) Renderer (Class-stable template)
// -------------------------

export function composeListingHTML(data: any) {
  return `${renderPremiumListing(data)}`;
}

export function renderPremiumListing(data: any) {
  const fonts = normalizeFonts(data?.presentation?.fonts);
  const baseCss = `
section.details { background-color: #fff; color: #111; }
dl.specs { display: grid; grid-template-columns: max-content 1fr; gap: 0.5em 1em; }
section.details dl.specs dt { color: inherit; font-weight: 700; }
section.details dl.specs dd { color: inherit; }
`.trim();
  const css = sanitizeAIStyle(data?.presentation?.css);

  const renderList = (arr: any[], ulClass: string) => {
    const items = (Array.isArray(arr) ? arr : [])
      .map((v) => `<li>${esc(v)}</li>`)
      .join("");
    return `<ul class="${ulClass}">${items}</ul>`;
  };

  // Single DL with multiple dt/dd pairs (correct semantic structure)
  const renderSpecs = (items: any[]) => {
    const rows = (Array.isArray(items) ? items : [])
      .map((i) => `<dt>${esc(i?.label)}</dt><dd>${esc(i?.value)}</dd>`)
      .join("");
    return `<dl class="specs">${rows}</dl>`;
  };

  const renderCondition = (components: any[], overall: string) => {
    const rows = (Array.isArray(components) ? components : [])
      .map(
        (p) =>
          `<tr><td>${esc(p?.part)}</td><td>${esc(p?.status)}</td></tr>`
      )
      .join("");

    return `
<table class="condition-table">
  <thead>
    <tr><th>Component</th><th>Condition</th></tr>
  </thead>
  <tbody>
    <tr><td>Overall</td><td>${esc(overall)}</td></tr>
    ${rows}
  </tbody>
</table>`.trim();
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(data?.seo?.ebay_title || "Listing")}</title>
  ${buildGoogleFonts(fonts)}
<style>
${css}
${baseCss}
</style>
</head>
<body>

  <main class="listing">

    <header class="hero">
      <span class="era-tag">${esc(data?.hero?.era_tag)}</span>
      <h1 class="title-main">${esc(data?.hero?.title_main)}</h1>
      <h2 class="title-sub">${esc(data?.hero?.title_sub)}</h2>
      <p class="author-line">${esc(data?.hero?.author_line)}</p>
    </header>

    <section class="seo-title">
      <h2>${esc(data?.seo?.ebay_title)}</h2>
    </section>

    <section class="badges">
      ${renderList(data?.badges, "badge-list")}
    </section>

    <section class="about">
      ${(data?.about?.paragraphs || [])
        .map((p: any) => `<p>${esc(p)}</p>`)
        .join("")}
    </section>

    <section class="details">
      ${renderSpecs(data?.details?.items)}
    </section>

    <section class="condition">
      ${renderCondition(data?.condition?.components, data?.condition?.overall)}
    </section>

    <section class="contents">
      ${renderList(data?.contents, "contents-list")}
    </section>

    <section class="collector-points">
      ${renderList(data?.collector_points, "collector-list")}
    </section>

    <section class="nostalgia">
      <h3>${esc(data?.nostalgia?.title)}</h3>
      <p>${esc(data?.nostalgia?.text)}</p>
    </section>

    <footer class="cta">
      <h2>${esc(data?.cta?.headline)}</h2>
      <p>${esc(data?.cta?.sub)}</p>
    </footer>

  </main>

</body>
</html>
`.trim();
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

    const data = await useAIStore.getState().generate([prompt, ...imageParts]);
    console.log("AI API Response:", data);
    // Log usage (from backend response)
    await logUsage(data.usage, `Listing: ${platform}`, useAuthStore.getState().session.user.email, data.text, "success");

    // Parse AI response
    return cleanAndParseJSON(data.text, isProMode);
  } catch (error) {
     await logUsage(null, `Listing: ${platform}`, useAuthStore.getState().session.user.email, error.message, "error");
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
   // await logUsage(data.usageMetadata, `Optimizer: ${platform}`);
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
   // await logUsage(data.usageMetadata, "Scout Analyst");
    return cleanAndParseJSON(data.text);
  } catch (error) { console.error("Scout Error:", error); throw error; }
}
