import { SYSTEM_PROMPT, openaiClient } from "../OPenAi/openai.js";
import { db } from "../db/index.js";
import { submissionsTable, streaksTable, questionsTable } from "../db/schema.js";

export const checkSubmission = async (req, res) => {
  const { questionId, answer: userAnswer } = req.body;
  const question = await db.select().from(questionsTable).where(questionsTable.id.eq(questionId)).limit(1);

  if (!question.length) {
    return res.status(404).json({ error: "Question not found" });
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Question: ${question.description}` },
      { role: "user", content: `Correct answer: ${question.correct_answer}` },
      { role: "user", content: `User's answer: ${userAnswer}` },
    ];

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
    });

    const rawContent = response.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (e) {
      parsed = { isCorrect: false, explanation: rawContent };
    }

    const submission = await db
      .insert(submissionsTable)
      .values({
        userId: req.body.userId,
        questionId: question.id,
        answer: userAnswer,
        status: parsed.isCorrect ? "correct" : "incorrect",
      })
      .returning();

    if (parsed.isCorrect) {
      const streak = await db
        .select()
        .from(streaksTable)
        .where(streaksTable.userId.eq(req.body.userId))
        .limit(1);

      if (streak.length) {
        await db
          .update(streaksTable)
          .set({
            currentStreak: streak[0].currentStreak + 1,
            longestStreak: Math.max(streak[0].longestStreak, streak[0].currentStreak + 1),
            lastActiveDate: new Date(),
          })
          .where(streaksTable.id.eq(streak[0].id));
      } else {
        await db.insert(streaksTable).values({
          userId: req.body.userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: new Date(),
        });
      }
    }

    res.json({
      submissionId: submission[0].id,
      isCorrect: parsed.isCorrect,
      explanation: parsed.explanation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }}
