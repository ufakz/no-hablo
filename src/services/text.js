import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

export const generatePhrases = async (categoryName) => {
  console.log("Generating phrases for ", categoryName)

  try {
    const phrasePrompt = `Generate 10 common phrases in English for the category - ${categoryName} that new foreigners might need. Provide short and simple phrases. Don't number them. Just seperate by new lines.`;

    const phrasesResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert at generating concise useful phrases." },
        { role: "user", content: phrasePrompt },
      ],
      max_tokens: 100,
      temperature: 0.3,
    });

    const generatedPhrasesText = phrasesResponse.choices[0].message.content.trim();
    const phrases = generatedPhrasesText
      .split("\n")
      .map((phrase) => phrase.trim())
      .filter(Boolean);

    return phrases;

  } catch (error) {
    console.error("Error generating phrases:", error.message);
    return "";;
  }
};
