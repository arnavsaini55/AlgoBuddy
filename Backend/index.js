// index.js
import express from "express";
import questionRoutes from "./Routes/questionRoutes.js";

const app = express();

app.use(express.json()); // ✅ parse JSON body
app.use("/api", questionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
