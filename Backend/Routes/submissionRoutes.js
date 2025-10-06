import express from "express";
import {verifytoken} from "../Middleware/auth.js";
import { checkSubmission } from "../Controller/SubmissionController.js";

const router = express.Router();

router.post("/submit", verifytoken, checkSubmission);


export default router;
