
import express from "express";
import questionRoutes from "./Routes/questionRoutes.js";
import userRoutes from "./Routes/UsersRoutes.js";


const app = express();

app.use(express.json()); // ✅ parse JSON body
app.use("/api", questionRoutes);

app.use("/api/users", userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
