import axios from "axios";

const MAX_CODE_LENGTH = 20000;

const sanitizeWithSummary = (s) => {
  const original = s == null ? "" : typeof s === "string" ? s : String(s);
  const originalLength = original.length;

  let sanitized = original;
  const changes = {
    controlChars: 0,
    smartQuotes: 0,
    spaces: 0,
    other: 0,
  };

  // Replace problematic characters and normalize spacing
  sanitized = sanitized
    .replace(/\u00A0/g, " ")
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
    .replace(/[\u200B-\u200F\u2060\uFEFF]/g, "")
    .replace(/[\u2000-\u200A\u202F\u205F\u3000]/g, " ")
    .replace(/[\u2013\u2014\u2015]/g, "-");

  changes.smartQuotes = original.length - sanitized.length;

  const cleaned = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  changes.controlChars = sanitized.length - cleaned.length;
  sanitized = cleaned;

  sanitized = sanitized.replace(/\r\n?/g, "\n");

  sanitized = sanitized
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trimRight())
    .join("\n")
    .trim();

  changes.spaces = cleaned.length - sanitized.length;

  let truncated = false;
  if (sanitized.length > MAX_CODE_LENGTH) {
    sanitized = sanitized.slice(0, MAX_CODE_LENGTH);
    truncated = true;
  }

  return {
    cleaned: sanitized,
    changes,
    truncated,
    originalLength,
    finalLength: sanitized.length,
  };
};

const tryDecode = (maybeBase64) => {
  if (!maybeBase64) return maybeBase64;
  try {
    return Buffer.from(maybeBase64, "base64").toString("utf-8");
  } catch (err) {
    return maybeBase64;
  }
};

const normalize = (s) => {
  if (!s || typeof s !== "string") return "";
  return s.replace(/\s+/g, " ").trim().toLowerCase();
};

// Enhanced comparison function that handles arrays, objects, strings, numbers, booleans
const compareOutputs = (userOutput, expectedOutput) => {
  if (!userOutput && !expectedOutput) return true;
  if (!userOutput || !expectedOutput) return false;

  // Clean strings - remove quotes and whitespace
  const cleanString = (str) => {
    if (typeof str !== "string") str = String(str);
    return str.replace(/^['"`]|['"`]$/g, "").trim();
  };

  let cleanUser = cleanString(userOutput);
  let cleanExpected = cleanString(expectedOutput);

  // Try to parse as JSON for structured data
  try {
    const parsedUser = JSON.parse(cleanUser);
    const parsedExpected = JSON.parse(cleanExpected);
    
    // Deep comparison using JSON stringify
    return JSON.stringify(parsedUser) === JSON.stringify(parsedExpected);
  } catch {
    // If not valid JSON, do normalized string comparison
    const normUser = normalize(cleanUser);
    const normExpected = normalize(cleanExpected);
    return normUser === normExpected;
  }
};

export const compileCode = async (req, res) => {
  const { language, expectedOutput } = req.body || {};
  const rawCode = (req.body && req.body.code) || "";
  const rawInput = (req.body && req.body.input) || "";

  const codeSan = sanitizeWithSummary(rawCode);
  const inputSan = sanitizeWithSummary(rawInput);
  const code = codeSan.cleaned;
  const input = inputSan.cleaned;

  const sanitizationSummary = {
    code: {
      changes: codeSan.changes,
      truncated: codeSan.truncated,
      originalLength: codeSan.originalLength,
      finalLength: codeSan.finalLength,
    },
    input: {
      changes: inputSan.changes,
      truncated: inputSan.truncated,
      originalLength: inputSan.originalLength,
      finalLength: inputSan.finalLength,
    },
  };

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

  const languageMap = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
  };

  const languageId = languageMap[language.toLowerCase()] || 63;

  try {
    const createRes = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false",
      {
        source_code: Buffer.from(code, "utf-8").toString("base64"),
        stdin: Buffer.from(input || "", "utf-8").toString("base64"),
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

      // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5=Time Limit, 6=Compilation Error, 7=Runtime Error, etc.
      if (statusId > 2) break;

      await delay(1000 * attempt);
    }

    if (!submission) {
      return res.status(500).json({ error: "No submission result received" });
    }

    const stdout = tryDecode(submission.stdout);
    const stderr = tryDecode(submission.stderr);
    const compileOutput = tryDecode(submission.compile_output);
    const finalStatusId = submission?.status?.id ?? 0;
    const statusDescription = submission?.status?.description || "Unknown";

    // Check for errors first
    if (finalStatusId === 6 || compileOutput) {
      return res.json({
        stdout: null,
        stderr: null,
        compileOutput: compileOutput || "Compilation error occurred",
        status: statusDescription,
        isCorrect: false,
        expectedOutput: expectedOutput || null,
        error: "Compilation failed",
        sanitization: sanitizationSummary,
      });
    }

    if (finalStatusId === 7 || finalStatusId === 8 || stderr) {
      return res.json({
        stdout: stdout || null,
        stderr: stderr || "Runtime error occurred",
        compileOutput: null,
        status: statusDescription,
        isCorrect: false,
        expectedOutput: expectedOutput || null,
        error: "Runtime error",
        sanitization: sanitizationSummary,
      });
    }

    // Use enhanced comparison function
    const isCorrect = compareOutputs(stdout || "", expectedOutput || "");

    return res.json({
      stdout,
      stderr,
      compileOutput,
      status: statusDescription,
      isCorrect,
      expectedOutput: expectedOutput || null,
      sanitization: sanitizationSummary,
    });
  } catch (error) {
    console.error("compileCode error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      error: "Compilation failed",
      details: error?.response?.data || error?.message || error,
    });
  }
};
