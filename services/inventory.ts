import { supabase } from '../supabaseClient';

/**
 * 1. UPLOAD IMAGE TO SUPABASE STORAGE 📸
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Create a simple, safe file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
    
    // 🚨 DEBUG: Alert if we start uploading
    // alert(`Starting upload for: ${fileName}`); 

    // Upload to 'listing-images' bucket
    const { data, error: uploadError } = await supabase.storage
      .from('listing-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      // 🚨 THIS WILL TELL US THE ERROR
      alert(`UPLOAD FAILED: ${uploadError.message}`);
      throw uploadError;
    }

    // Get the Public URL
    const { data: publicUrlData } = supabase.storage
      .from('listing-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

  } catch (error: any) {
    console.error('Error uploading image:', error);
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
