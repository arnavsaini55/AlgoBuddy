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

// Initialize OpenAI client only when an API key is present to avoid
// crashing the server in environments where AI is not configured.
export const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
