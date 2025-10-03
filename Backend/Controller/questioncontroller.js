import { db } from "../db/index.js";
import { questionsTable } from "../db/schema.js";

// ✅ Create new question
export const createQuestion = async (req, res) => {
  try {
    const { title, description, difficulty } = req.body;

    const result = await db
      .insert(questionsTable)
      .values({ title, description, difficulty })
      .returning();

    res.status(201).json(result[0]);
  } catch (err) {
    console.error("Error inserting question:", err);
    res.status(500).json({ error: "Failed to insert question" });
  }
};

// ✅ Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await db.select().from(questionsTable);
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};
