import { supabase } from '../supabaseClient.js';

/**
 * 1. UPLOAD IMAGE TO SUPABASE STORAGE 📸
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split(".").pop() ?? "png";
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("listing-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) throw error;

    // ✅ Save this to your listing (stable forever)
    return data.path; // usually same as fileName if uploading to root
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
   let imagePath = null;
if (imageFile) {
  imagePath = await uploadImage(imageFile); // <-- this is a PATH, not a URL
  console.log("Image uploaded, path:", imagePath);

  if (!imagePath) {
    alert("Warning: Image upload failed, saving listing without image.");
  }
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
      estimated_price: listingData.estimated_price,
      status: 'draft',
      platform: listingData.platform || 'ebay',

      image_url: imagePath,     // ✅ store stable path
      // image_url: null,        // (optional) don’t store signed url
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
