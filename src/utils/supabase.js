
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


export const uploadCategoryIconToSupabase = async (category, imageUrl) => {
  try {
    
    const proxyUrl = `/netlify/functions/fetch-image?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(proxyUrl);
    const blob = await response.blob();

    const fileName = `${category.replace(/\s+/g, '-')}-icon.png`;
    const { data, error } = await supabase.storage
      .from('category-icons')  
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { publicURL, error: urlError } = supabase
      .storage
      .from('category-icons')
      .getPublicUrl(fileName);

    if (urlError) {
      throw urlError;
    }

    return publicURL;
  } catch (error) {
    console.error('Error uploading icon to Supabase:', error.message);
    return null;
  }
};