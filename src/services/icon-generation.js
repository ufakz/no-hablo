import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});


export const generateCategoryIcon = async (category) => {
  try {
    const response = await openai.images.generate({
      prompt: `An icon representing the category "${category}" in a minimalistic, flat design style`,
      n: 1,
      size: '256x256',
    });

    return response.data[0].url
  } catch (error) {
    console.error('Error generating category icon:', error.message);
    return null;
  }
};
