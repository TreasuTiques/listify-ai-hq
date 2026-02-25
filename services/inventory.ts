import { supabase } from '../supabaseClient.js';

/**
 * 1. UPLOAD IMAGE TO SUPABASE STORAGE 📸
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop() ?? 'png';
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from('listing-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    // create a signed URL (e.g., valid for 1 hour)
    const { data: signed, error: signedErr } = await supabase.storage
      .from('listing-images')
      .createSignedUrl(data.path, 60 * 60);

    if (signedErr) throw signedErr;

    return signed.signedUrl;
  } catch (e) {
    console.error(e);
    return null;
  }
}
/**
 * 2. SAVE LISTING TO DATABASE 💾
 */
export async function saveListingToInventory(listingData: any, imageFile: File | null) {
  try {
    // A. Get Current User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Error: You must be logged in to save listings.");
      throw new Error("User not logged in");
    }

    // B. Upload Image (If exists)
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      console.log("Image uploaded, URL:", imageUrl);
      // If upload failed (returned null), warn the user but continue
      if (!imageUrl) {
        alert("Warning: Image upload failed, saving listing without image.");
      }
    } else {
      console.log("No image file provided to saveListingToInventory");
    }

    // C. Save to DB
    const { error } = await supabase
      .from('listings')
      .insert([
        {
          user_id: user.id,
          title: listingData.title,
          brand: listingData.brand,
          description: listingData.description,
          condition: listingData.condition,
          price: listingData.estimated_price,
          status: 'draft',
          platform: listingData.platform || 'ebay',
          image_url: imageUrl, 
          tags: listingData.tags || [] 
        }
      ]);

    if (error) {
      alert(`DATABASE ERROR: ${error.message}`);
      throw error;
    }

    return { success: true };

  } catch (error: any) {
    console.error('Inventory Error:', error);
    throw error;
  }
}
