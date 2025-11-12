import cors from "cors";
import express from "express";
import questionRoutes from "./Routes/questionRoutes.js";
import userRoutes from "./Routes/UsersRoutes.js";
import submissionRoutes from "./Routes/submissionRoutes.js";
import authRoutes from "./Routes/AuthenticationRoutes.js";
import { getquesid } from "./Controller/questioncontroller.js";
import compilerRoutes from "./Routes/compilerRoutes.js"


const app = express();

app.use(express.json());


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API routes
app.use("/api/questions", questionRoutes);
app.use("/api/questions/:id",getquesid);
app.use("/api/users", userRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/compile",compilerRoutes)



// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
// Listen on all network interfaces (0.0.0.0) to allow access from mobile devices
app.listen(PORT, () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
  console.log(`Server accessible at http://localhost:${PORT}`);
  console.log(`For mobile devices, use: http://192.168.29.114:${PORT}`);
});
