"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askAI(message) {
  if (!message?.trim()) {
    throw new Error("Please enter a question.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });

  return response.text;
}