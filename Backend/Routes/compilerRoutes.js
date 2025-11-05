import express from "express"
import { compileCode } from "../Controller/compilercontroller.js"

const router = express.Router();

router.post("/",compileCode)

export default router