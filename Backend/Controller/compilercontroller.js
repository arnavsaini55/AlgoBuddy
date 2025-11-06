import axios from "axios";

// Helper to safely decode base64 strings
const tryDecode = (maybeBase64) => {
  if (!maybeBase64) return maybeBase64;
  try {
    return Buffer.from(maybeBase64, "base64").toString("utf-8");
  } catch (err) {
    return maybeBase64;
  }
};

export const compileCode = async (req, res) => {
  const { language, code, input = "" } = req.body || {};

  // Validate input
  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'code' in request body" });
  }

  if (!language || typeof language !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'language' in request body" });
  }

  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPIDAPI_KEY) {
    return res.status(500).json({ error: "Server missing RAPIDAPI_KEY environment variable" });
  }

  // Map languages to Judge0 IDs
  const languageMap = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
  };

  const languageId = languageMap[language.toLowerCase()] || 63; // default JS

  try {
    // Step 1: Create submission
    const createRes = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
      {
        source_code: code, // plain string like "console.log('Hello AlgoBuddy!')"
    stdin: input,
    language_id: languageId,
      },
      {
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": RAPIDAPI_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const token = createRes.data.token;
    if (!token) {
      return res.status(500).json({ error: "No token received from Judge0" });
    }

    // Step 2: Poll for result
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const maxAttempts = 15;
    let attempt = 0;
    let submission = null;

    while (attempt < maxAttempts) {
      attempt++;

      const out = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=stdout,stderr,status,compile_output`,
        {
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        }
      );

      submission = out.data;
      const statusId = submission?.status?.id ?? 0;

      // 1 = In Queue, 2 = Processing. Anything >2 = done
      if (statusId > 2) break;

      await delay(1000 * attempt); // exponential backoff
    }

    if (!submission) {
      return res.status(500).json({ error: "No submission result received" });
    }

    // Step 3: Decode base64 outputs
    const stdout = tryDecode(submission.stdout);
    const stderr = tryDecode(submission.stderr);
    const compileOutput = tryDecode(submission.compile_output);

    // Step 4: Send final result
    return res.json({
      stdout,
      stderr,
      compileOutput,
      status: submission.status?.description,
      raw: submission,
    });
  } catch (error) {
    console.error("compileCode error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      error: "Compilation failed",
      details: error?.response?.data || error?.message || error,
    });
  }
};
