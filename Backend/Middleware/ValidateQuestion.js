export const validateQuestion = (req, res, next) => {
  const { title, description, difficulty, answers } = req.body;

  if (!title || !description || !difficulty || !answers) {
    return res.status(400).json({
      error: "Missing required fields. All fields (title, description, difficulty, answers) are required"
    });
  }

  if (!["easy", "medium", "hard"].includes(difficulty.toLowerCase())) {
    return res.status(400).json({
      error: "Difficulty must be one of: easy, medium, hard"
    });
  }

  next();
};