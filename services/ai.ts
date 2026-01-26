// ... (keep all your existing imports and functions above)

/**
 * 🩺 DOCTOR: Optimize a specific listing
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
