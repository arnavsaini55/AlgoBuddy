import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const SYSTEM_PROMPT = `
You are an AI assistant that checks if a user's answer is correct.
Compare the user's answer with the correct answer, and return a JSON:
{
  "isCorrect": true/false,
  "explanation": "reason why the answer is correct or incorrect"
}
`;

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
