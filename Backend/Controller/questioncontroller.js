import { eq } from "drizzle-orm";
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
export const getquesid = async (req, res) => {
  try {
    

    const question = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, req.params.id))
      .limit(1);

    if (question.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question[0]);
  } catch (err) {
    console.error("❌ Error fetching question by ID:", err);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};