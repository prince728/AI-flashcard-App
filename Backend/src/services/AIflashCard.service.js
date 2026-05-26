const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function AiService(text) {
  const prompt = `
  You are an AI that generates study flashcards.
  Task:
  - Read the following text.
  - Create 5 flashcards in JSON format.
  - Each flashcard must have a "question" and an "answer".
  - Keep questions short and clear.
  - Answers should be concise but informative.
  - Subject should be a school/college subject if possible, otherwise "general".
  - Do not include extra commentary, only return JSON.

  Text:
  ${text}

  Output format:
  {
    "flashcards": [
      { "question": "What is ...?", "answer": "...","subject": "..."}
    ]
  }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  const rawText = response.candidates[0].content.parts[0].text;


  try {
    return JSON.parse(rawText);
  } catch (err) {
    console.error("Failed to parse AI response:", err);

  
    const match = rawText.match(/\{[\s\S]*\}/);
    
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerErr) {
        console.error("Still invalid JSON:", innerErr);
      }
    }
    return { error: "Invalid AI output", raw: rawText };
  }
}

module.exports = AiService;
