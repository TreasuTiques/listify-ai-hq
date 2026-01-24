import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveListingToInventory(listingData: any, imageUrl: string | null) {
  try {
    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Please log in to save items.");

    // 2. Prepare the data
    const payload = {
      user_id: user.id,
      title: listingData.title,
      brand: listingData.brand,
      description: listingData.description,
      condition: listingData.condition,
      estimated_price: listingData.estimated_price,
      tags: listingData.tags || [],
      platform: 'ebay',
      status: 'draft',
      image_url: imageUrl
    };

    // 3. Insert into the 'listings' table
    const { data, error } = await supabase
      .from('listings')
      .insert([payload])
      .select();

    if (error) throw error;
    return data;

  } catch (error: any) {
    console.error("Supabase Error:", error);
    throw new Error(error.message || "Failed to save listing.");
  }
}
