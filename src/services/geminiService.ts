
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the GoogleGenAI client with the required configuration.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDrinkRecommendation = async (mood: string) => {
  try {
    // Call generateContent with the model name and prompt directly.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User says they are feeling: "${mood}". 
      Based on the following Sunny Cafe menu categories:
      HOT DRINKS: Artisan Espresso, Golden Latte, Midnight Mocha, Morning Mist Green Tea.
      COLD DRINKS: Iced Caramel Cloud, Tropical Sun Smoothie, Berry Bliss Smoothie, Sunny Cold Brew.
      PASTRIES & SNACKS: Butter Croissant, Avocado Smash Toast, Blueberry Lemon Muffin, Double Choc Brownie.

      Suggest the best combination (e.g., a drink and a snack, or just a drink) for their mood in a friendly, "sunny" tone. Keep it short (max 2 sentences).`,
    });

    // Access the text property directly from the response.
    return response.text || "I recommend our classic Artisan Espresso to brighten your day!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I recommend a warm Green Tea and a Muffin to keep you refreshed!";
  }
};
