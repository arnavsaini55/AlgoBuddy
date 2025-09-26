
import { db } from "../db/index.js";
import { questionsTable } from "../db/schema.js";   
import { eq  } from "drizzle-orm";

export const validation = async (req, res, next ) => {
    const { questionId, answer: userAnswer } = req.body;
    if (!questionId || !userAnswer) {
        return res
            .status(400)
            .json({ error: "questionId and answer are required" });
    }

    const question = await db
        .select()
        .from(questionsTable)
        .where(eq(questionsTable.id, questionId));

        if (question.length === 0) {
            return res.status(404).json({error: "Question not found"});
        }

         req.question = question[0];
            next();
}

