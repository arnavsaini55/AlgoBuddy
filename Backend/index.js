import express from "express"; // default import

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  console.log(`The server is running on port ${PORT}`); 
  res.send(`Hello! Server is running on port ${PORT}`); 
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

export default app;
