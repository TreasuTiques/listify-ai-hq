import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
if (!apiKey) console.error("Missing Gemini API Key! Check .env or Vercel settings.");

const genAI = new GoogleGenerativeAI(apiKey);
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
 * 🎨 MARKETPLACE PROMPT ENGINEER
 * Defines the exact rules for Title, Description, and Keywords for each platform.
 */
const getPlatformPrompt = (platform: string, isProMode: boolean) => {
  // ✅ UPDATED: Now refers to plural "images"
  const baseHelper = `Analyze these images and return valid JSON.`;

  switch (platform.toLowerCase()) {
    case 'poshmark':
      return `
        ${baseHelper}
        CONTEXT: Poshmark is a social fashion marketplace.
        
        RULES:
        - TITLE: MAX 50 CHARACTERS (Strict Limit). Format: Brand + Category + Style/Fit.
        - DESCRIPTION: Friendly, emoji-friendly 💖. Mention material, fit, and occasion.
        - KEYWORDS: Use trendy fashion tags (e.g., #boho, #streetwear).
        
        JSON OUTPUT: { title, description, brand, condition, estimated_price, size, tags }
      `;
    
    case 'mercari':
      return `
        ${baseHelper}
        CONTEXT: Mercari is for quick sales. Buyers want value.
        
        RULES:
        - TITLE: MAX 80 CHARACTERS. Put the most important keywords first. No fluff.
        - DESCRIPTION: Short, punchy, bullet points. Mention "Fast shipping".
        - CONDITION: Be very honest about flaws visible in the images.
        
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'depop':
      return `
        ${baseHelper}
        CONTEXT: Depop is for Gen-Z, Vintage, and Streetwear.
        
        RULES:
        - TITLE: Aesthetic, descriptive. Lowercase stylization is okay if it fits the vibe.
        - DESCRIPTION: Mention the "Era" (90s, Y2K), the "Vibe" (Skater, Goth, Cottagecore).
        - TAGS: Crucial for Depop. Include 5 specific aesthetic tags.
        
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'etsy':
      return `
        ${baseHelper}
        CONTEXT: Etsy is for Vintage (>20 years old) or Handmade.
        
        RULES:
        - TITLE: Long, keyword-stuffed (up to 140 chars allowed). Use phrases buyers search for ("Gift for him", "1970s Decor").
        - DESCRIPTION: Emotional storytelling. Mention the history/age of the item.
        
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'shopify':
    case 'facebook':
      return `
        ${baseHelper}
        CONTEXT: Standard E-Commerce / Local Sales.
        
        RULES:
        - TITLE: Clean, professional. Brand + Model + Specs.
        - DESCRIPTION: Professional paragraph followed by specs list.
        
        JSON OUTPUT: { title, description, brand, condition, estimated_price, tags }
      `;

    case 'ebay':
    default:
      // 🌟 EBAY LOGIC 🌟
      if (isProMode) {
        // PRO MODE: STORYTELLING & HIGH-END HTML
        return `
          ${baseHelper}
          CONTEXT: eBay Premium Listing (High Ticket/Unique Item).
          
          TITLE RULES (Cassini Optimized):
          - MAX 80 CHARACTERS.
          - Structure: Brand + Model + Key Feature 1 + Key Feature 2 + Size/Color.
          - NO filler words (L@@K, Wow, Nice).
          - Use long-tail keywords relevant to collectors.

          DESCRIPTION RULES (HTML "Sales Letter"):
          - Format as clean HTML (no CSS classes, just <h2>, <p>, <ul>, <strong>).
          - STRUCTURE:
            1. <h2> "The Hook": A catchy headline based on the visual appeal.
            2. <p> "The Story": A engaging story about why this item is special.
            3. <h3> "Key Features": Bullet points of specs found in the images (tags/box).
            4. <h3> "Condition": Detailed honest report based on ALL photos.
            5. <strong> "Why Buy": A closing sentence on value.

          JSON OUTPUT: { title, description, brand, condition, estimated_price, itemSpecifics }
        `;
      } else {
        // STANDARD MODE: CLEAN & EFFICIENT
        return `
          ${baseHelper}
          CONTEXT: eBay Standard Listing.
          
          TITLE RULES (Cassini Optimized):
          - MAX 80 CHARACTERS.
          - Structure: Brand + Model + Specifications.
          - Prioritize keywords by search volume.
          
          DESCRIPTION RULES (Clean HTML):
          - Format as clean HTML.
          - <h2> Product Summary
          - <ul> List of features
          - <strong> Condition Note (Analyze all photos for flaws)
          
          JSON OUTPUT: { title, description, brand, condition, estimated_price, itemSpecifics }
        `;
      }
  }
};

/**
 * 📸 BRAIN 1: THE BUILDER (UPDATED FOR MULTI-IMAGE)
 * Now accepts an ARRAY of files.
 */
export async function generateListingFromImages(imageFiles: File[], platform: string = 'ebay', isProMode: boolean = false) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // 🚀 PROCESS ALL IMAGES IN PARALLEL
    const imageParts = await Promise.all(imageFiles.map(file => fileToGenerativePart(file)));
    
    const prompt = getPlatformPrompt(platform, isProMode);

    // Send the prompt AND all the image parts to Gemini
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const cleanedText = response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

/**
 * 🩺 BRAIN 2: THE DOCTOR (Optimizes existing text)
 */
export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `
      Act as an expert reseller on ${platform}.
      Improve this listing.
      Current Title: "${currentTitle}"
      Current Description: "${currentDescription}"

      GOAL: Better SEO and conversion.
      - If eBay: Max 80 chars title, keyword rich.
      - If Poshmark: Max 50 chars title.
      
      Return ONLY valid JSON:
      { "optimizedTitle": "...", "optimizedDescription": "..." }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedText = response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Optimization Error:", error);
    throw error;
  }
}

/**
 * 🔭 BRAIN 3: THE SCOUT (Sourcing)
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    let prompt = "";
    let requestParts: any[] = [];

    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart];
      prompt = `
        Act as an expert vintage reseller.
        1. IDENTIFY the item in the image visually.
        2. Context: "${productName}".
        
        Based on eBay sold history:
        - Estimate Value (Low-High).
        - Verdict: BUY or PASS.
        - Reason: Be specific.

        Return ONLY valid JSON:
        { "minPrice": 10, "maxPrice": 20, "demand": "High", "verdict": "BUY", "reason": "..." }
      `;
      requestParts.push(prompt);
    } else {
      prompt = `
        Act as an expert vintage reseller. Look at "${productName}".
        Return ONLY valid JSON:
        { "minPrice": 10, "maxPrice": 20, "demand": "High", "verdict": "BUY", "reason": "..." }
      `;
      requestParts = [prompt];
    }

    const result = await model.generateContent(requestParts);
    const response = await result.response;
    const cleanedText = response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Scout Error:", error);
    throw error;
  }
}
