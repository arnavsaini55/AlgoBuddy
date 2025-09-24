// Routes/question_routes.js
import { Router } from "express";
import { createQuestion, getQuestions } from "../Controller//questioncontroller.js";

const router = Router();

router.post("/questions", createQuestion);
router.get("/questions", getQuestions);

export default router;
