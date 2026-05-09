import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("resume") as File | null;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const allowed = ["application/pdf", "text/plain"];
  if (!allowed.includes(file.type)) {
    return Response.json(
      { error: "Only PDF and plain text files are supported" },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return Response.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  let text: string;

  if (file.type === "application/pdf") {
    const data = new Uint8Array(await file.arrayBuffer());
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data });
    const result = await parser.getText();
    text = result.text;
  } else {
    text = await file.text();
  }

  if (!text.trim()) {
    return Response.json(
      { error: "Could not extract text from the file" },
      { status: 400 }
    );
  }

  const { text: raw } = await generateText({
    model: anthropic("claude-haiku-4-5"),
    system: `Extract technical skills from resume text. Return ONLY valid JSON with exactly two fields:
- "skills": array of skill strings (languages, frameworks, tools, platforms, methodologies)
- "summary": one sentence describing the candidate's background

Example: {"skills":["React","TypeScript","Node.js","PostgreSQL"],"summary":"Full-stack developer with 5 years building web applications."}`,
    prompt: `Extract skills from this resume:\n\n${text.slice(0, 8000)}`,
  });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return Response.json({ error: "Failed to parse skills from resume" }, { status: 500 });
  }

  try {
    const result = JSON.parse(jsonMatch[0]);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to parse skills from resume" }, { status: 500 });
  }
}
