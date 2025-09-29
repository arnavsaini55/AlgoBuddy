import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "who is kim kadarshin?" }
      ],
    });

    console.log("✅ OpenAI Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
  }
}

testOpenAI();
