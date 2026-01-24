// 🕵️‍♂️ DIAGNOSTIC MODE: LIST AVAILABLE MODELS
// REPLACE THE KEY BELOW WITH YOUR ACTUAL KEY ENDING IN ...VxIw
const API_KEY = "AIzaSyCOqDV_x3N1kBoYqisVPBTAZy0EhzaVxIw"; 

export async function generateListingFromImage(imageFile: File, platform: string = 'ebay') {
  try {
    // 1. We are NOT generating a listing yet.
    // 2. We are asking Google: "What models can I use?"
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();

    if (data.error) {
      alert("🚨 API ERROR: " + data.error.message);
      throw new Error(data.error.message);
    }

    // 3. Extract the names of the models
    const modelNames = data.models
      .map((m: any) => m.name.replace('models/', '')) // Clean up the names
      .filter((name: string) => name.includes('gemini')); // Show only Gemini models

    // 4. SHOW ME THE LIST!
    alert("✅ SUCCESS! HERE ARE YOUR AVAILABLE MODELS:\n\n" + modelNames.join("\n"));
    
    return {}; // Return empty to stop the app from crashing

  } catch (error: any) {
    alert("❌ FATAL ERROR: " + error.message);
    throw error;
  }
}
