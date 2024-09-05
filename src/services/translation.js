import { OpenAI } from "openai";

const openai = new OpenAI();

export const translateText = async (text, targetLanguage = "Spanish") => {
  try {
    const prompt = `Translate the following text into ${targetLanguage}: "${text}"`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert translator." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
      temperature: 0.3,
    });

    const translatedText = response.choices[0].message.content.trim();
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error.message);
    return "";
  }
};
