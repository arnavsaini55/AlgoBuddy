import express from "express";
import { validation } from "../Middleware/ValidateSubmission.js";
import { checkSubmission } from "../Controller/SubmissionController.js";

const router = express.Router();

router.post("/submit", validation, checkSubmission);

export default router;
