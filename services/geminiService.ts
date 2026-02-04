
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

export const getChatResponse = async (product: Product, userMessage: string, chatHistory: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: 'user',
        parts: [{
          text: `You are LOOP AI, a dedicated sales expert for the specific product: "${product.name}".

          STRICT RULES:
          1. You must ONLY answer questions related to this product (${product.name}).
          2. If the user asks about general topics (politics, history, weather, celebrities, other tech), politely REFUSE. Say: "I can only answer questions about the ${product.name}."
          3. Do not answer questions about other products unless comparing them directly to this one.
          4. Be helpful, concise, and professional.

          PRODUCT DETAILS:
          - Name: ${product.name}
          - Description: ${product.description}
          - Price: $${product.price}
          - Stock: ${product.stock} units
          - Category: ${product.category}
          - Colors: ${product.colors?.map(c => c.name).join(', ') || 'N/A'}
          - Sizes: ${product.sizes?.join(', ') || 'N/A'}
          - Features: ${product.features?.join('; ') || 'N/A'}
          
          SPECIFICATIONS:
          - Weight: ${product.weight || 'N/A'}
          - Dimensions: ${product.dimensions ? `${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth}` : 'N/A'}
          - Material: ${product.material || 'N/A'}
          
          Use this information to answer.` }]
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
