
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

export const getChatResponse = async (product: Product, userMessage: string, chatHistory: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: 'user',
        parts: [{ text: `You are LOOP AI, a professional sales expert for this e-commerce site. 
          Respond to questions about this specific product:
          Name: ${product.name}
          Description: ${product.description}
          Price: $${product.price}
          Stock: ${product.stock} units
          Category: ${product.category}
          
          Tone: Helpful, friendly, tech-savvy, and concise.` }]
      },
      ...chatHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ],
  });

  return response.text;
};
