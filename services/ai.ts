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
    
    const html = isProMode ? renderProListingCard(result) : renderStandardListing(result);
   
    return {result, html};

  } catch (error) {
    console.error("JSON Parse Failed:", error);
    throw error;
  }
};

export default cleanAndParseJSON;

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
