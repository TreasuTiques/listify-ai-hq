import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 ROBUST KEY CHECK:
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing Gemini API Key! Check your .env file or Vercel settings.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// ⚡️ CONSTANT: The Stable Model (High Speed, No Limits)
const MODEL_NAME = "gemini-flash-latest";

// Helper: Convert File to Base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

/**
 * 📸 BRAIN 1: THE BUILDER
 */
export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const imagePart = await fileToGenerativePart(imageFile);

    const prompt = `
      You are an expert reseller on ${platform}.
      Analyze this image and generate a high-converting sales listing.
      
      Return ONLY a valid JSON object with these exact fields:
      {
        "title": "A SEO-optimized title (max 80 chars)",
        "brand": "The brand name or 'Unbranded'",
        "condition": "New, Used, or For Parts",
        "description": "A professional, attractive description selling the item benefits.",
        "estimated_price": "A price range like '$15-$25'",
        "tags": ["tag1", "tag2", "tag3"]
      }
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const cleanedText = response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

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
      I have a listing that needs improvement. 
      
      Current Title: "${currentTitle}"
      Current Description: "${currentDescription}"

      Please generate a strictly better, SEO-optimized version.
      Return ONLY valid JSON:
      {
        "optimizedTitle": "The new better title...",
        "optimizedDescription": "The new better description..."
      }
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
 * 🔭 BRAIN 3: THE SCOUT (Now with Eyes! 👁️)
 */
export async function scoutProduct(productName: string, imageFile?: File) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    let prompt = "";
    let requestParts: any[] = [];

    // 🧠 SMART LOGIC: Did the user provide a photo?
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      requestParts = [imagePart];
      
      prompt = `
        Act as an expert vintage reseller.
        1. ANALYZE the image to identify the specific item (Brand, Model, Edition).
        2. IGNORE generic keywords if the image shows something specific.
        3. User Context: "${productName}" (Use this only if helpful).

        Based on visual identification and eBay market trends:
        - Estimate Sold Price (Low-High).
        - Estimate Demand.
        - Verdict: "BUY" or "PASS".
        - Reason: Be specific about WHAT you see in the photo.

        Return ONLY valid JSON:
        {
          "minPrice": 10,
          "maxPrice": 20,
          "demand": "High",
          "verdict": "BUY",
          "reason": "Specific reason based on visual ID."
        }
      `;
      requestParts.push(prompt);
    } else {
      // Text Only Mode
      prompt = `
        Act as an expert vintage reseller.
        I am looking at a "${productName}".
        
        Based on general market knowledge (eBay sold history trends):
        - Estimate Sold Price range.
        - Estimate Sell-Through Rate.
        - Verdict: "BUY" or "PASS".
        
        Return ONLY valid JSON:
        {
          "minPrice": 10,
          "maxPrice": 20,
          "demand": "High",
          "verdict": "BUY",
          "reason": "Consistent seller with high nostalgia demand."
        }
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
