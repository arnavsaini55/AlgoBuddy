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
    other: 0
  };

  // 1. Replace common problematic characters
  sanitized = sanitized
    // Non-breaking spaces to regular spaces
    .replace(/\u00A0/g, ' ')
    // Smart quotes to regular quotes
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // Smart single quotes
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"') // Smart double quotes
    // Zero-width spaces and joiners
    .replace(/[\u200B-\u200F\u2060\uFEFF]/g, '')
    // Other special spaces
    .replace(/[\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    // Special dashes
    .replace(/[\u2013\u2014\u2015]/g, '-');
  
  changes.smartQuotes = original.length - sanitized.length;

  // 2. Remove control chars except common whitespace: allow \t (09), \n (10), \r (13)
  const cleaned = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  changes.controlChars = sanitized.length - cleaned.length;
  sanitized = cleaned;

  // 3. Normalize line endings (CRLF -> LF)
  sanitized = sanitized.replace(/\r\n?/g, "\n");

  // 4. Normalize remaining whitespace
  sanitized = sanitized
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trimRight())
    .join('\n')
    .trim();
  
  changes.spaces = cleaned.length - sanitized.length;

  // 5. Truncate if too long
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
  const { language } = req.body || {};
  const rawCode = (req.body && req.body.code) || "";
  const rawInput = (req.body && req.body.input) || "";

  // sanitize user submitted code and input (with summary)
  const codeSan = sanitizeWithSummary(rawCode);
  const inputSan = sanitizeWithSummary(rawInput);
  const code = codeSan.cleaned;
  const input = inputSan.cleaned;

  const sanitizationSummary = {
    code: {
      changes: codeSan.changes,
      truncated: codeSan.truncated,
      originalLength: codeSan.originalLength,
      finalLength: codeSan.finalLength
    },
    input: {
      changes: inputSan.changes,
      truncated: inputSan.truncated,
      originalLength: inputSan.originalLength,
      finalLength: inputSan.finalLength
    }
  };

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

      // 1 = In Queue, 2 = Processing. Anything >2 = done
      if (statusId > 2) break;

      await delay(1000 * attempt); // exponential backoff
    }

    if (!submission) {
      return res.status(500).json({ error: "No submission result received" });
    }

  // Step 3: Decode base64 outputs (Judge0 returns base64 when requested)
  const stdout = tryDecode(submission.stdout);
  const stderr = tryDecode(submission.stderr);
  const compileOutput = tryDecode(submission.compile_output);

    // Step 4: Send final result including sanitization summary (for client debugging)
    return res.json({
      stdout,
      stderr,
      compileOutput,
      status: submission.status?.description,
      raw: submission,
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
