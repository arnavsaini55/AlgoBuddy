import { Router } from "express";
import { createQuestion, getquesid, getQuestions } from "../Controller/questioncontroller.js";
import { validateQuestion } from "../Middleware/ValidateQuestion.js";

const router = Router();

router.post("/", validateQuestion, createQuestion);
router.get("/", getQuestions);
router.get("/:id",getquesid)



export default router;
