import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API Key (Vite will load this from .env)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * 📸 BRAIN 1: THE BUILDER
 * Generates a listing from an image.
 */
export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    // 1. Convert image to Base64
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageFile);
    });

    const base64Data = base64Image.split(',')[1]; // Remove header

    // 2. Prepare the Model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 3. The Prompt
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

    // 4. Call Gemini
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: imageFile.type,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // 5. Clean and Parse JSON
    const cleanedText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

/**
 * 🩺 BRAIN 2: THE DOCTOR
 * Optimizes an existing title and description.
 */
export async function optimizeListing(currentTitle: string, currentDescription: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Act as an expert reseller on ${platform}.
      I have a listing that needs improvement. 
      
      Current Title: "${currentTitle}"
      Current Description: "${currentDescription}"

      Please generate a strictly better, SEO-optimized version.
      1. Create a keyword-rich title (max 80 chars for eBay).
      2. Write a compelling, sales-focused description.
      
      Return ONLY valid JSON like this:
      {
        "optimizedTitle": "The new better title...",
        "optimizedDescription": "The new better description..."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Optimization Error:", error);
    throw error;
  }
}

/**
 * 🔭 BRAIN 3: THE SCOUT (New!)
 * Analyzes market value and gives a Buy/Pass verdict.
 */
export async function scoutProduct(productName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Act as an expert vintage reseller.
      I am looking at a "${productName}".
      
      Based on general market knowledge (eBay sold history trends):
      1. Estimate the Sold Price range (Low to High).
      2. Estimate the Sell-Through Rate (Low/Medium/High).
      3. Give a Verdict: "BUY" (if profitable/popular) or "PASS" (if junk/saturated).
      4. Provide a 1-sentence reason.

      Return ONLY valid JSON:
      {
        "minPrice": 10,
        "maxPrice": 20,
        "demand": "High",
        "verdict": "BUY",
        "reason": "Consistent seller with high nostalgia demand."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Scout Error:", error);
    throw error;
  }
}
