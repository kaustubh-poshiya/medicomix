import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

// Initialize the API client
// NOTE: In a real scenario, ensure process.env.API_KEY is set.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "MediBot", the AI assistant for Medicomix, a healthcare technology company.
Your goal is to help visitors understand our products and company mission.
Be professional, empathetic, and concise.

Here is a list of our current products:
${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, category: p.category, description: p.description, price: p.price })))}

If a user asks about medical advice, strictly state: "I am an AI assistant for Medicomix products and cannot provide medical diagnoses or emergency advice. Please consult a healthcare professional."

If asked about prices, features, or availability of our products, answer confidently based on the data above.
`;

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "I'm currently in demo mode without an active connection. Please configure the API key to chat with me!";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I didn't catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};
