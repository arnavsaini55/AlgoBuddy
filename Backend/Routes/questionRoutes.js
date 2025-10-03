import { Router } from "express";
import { createQuestion, getQuestions } from "../Controller/questioncontroller.js";
import { validateQuestion } from "../Middleware/ValidateQuestion.js";

const router = Router();

router.post("/", validateQuestion, createQuestion);
router.get("/", getQuestions);



export default router;
