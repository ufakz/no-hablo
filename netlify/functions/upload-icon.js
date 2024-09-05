const fetch = require("node-fetch");
const { OpenAI }  = require("openai");
const { createClient } = require("@supabase/supabase-js");

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

exports.handler = async (event, context) => {
  const { categoryName } = JSON.parse(event.body); 

  if (!categoryName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category name is required." }),
    };
  }

  try {
    const response = await openai.images.generate({
      prompt: `A small green icon representing the category "${categoryName}" in a minimalistic, flat design style`,
      n: 1,
      size: '256x256',
    });

    const imageUrl = response.data[0].url

    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const fileName = `${categoryName.replace(/\s+/g, "-")}-icon.png`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("category-icons")
      .upload(fileName, Buffer.from(imageBuffer), {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      });

    if (uploadError) {
      throw new Error(
        `Error uploading image to Supabase: ${uploadError.message}`
      );
    }

    const { publicURL } = supabase.storage
      .from("category-icons")
      .getPublicUrl(fileName);

    if (urlError) {
      throw new Error(`Error getting public URL`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, supabaseIconUrl: publicURL }),
    };

  } catch (error) {
    console.error("Error in Netlify function:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
