const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function AiService(text) {
    const prompt = `
        You are an AI that generates study flashcards.

        Task:
        - Read the provided text.
        - Generate exactly 5 flashcards.
        - Each flashcard must have question, answer and subject.
        - Keep questions short and clear.
        - Answers should be concise but informative.
        - Subject should be a school/college subject if possible,
          otherwise use "general".
        - Return only valid JSON.

        Text:
        ${text}

        Required JSON structure:
        {
            "flashcards": [
                {
                    "question": "What is ...?",
                    "answer": "...",
                    "subject": "Computer Science"
                }
            ]
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const rawText = response.text;

        if (!rawText) {
            throw new Error("Empty response from Gemini");
        }

        const cleanedResponse = rawText
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/\s*```$/, "")
            .trim();

        
        const parsedResponse = JSON.parse(cleanedResponse);

        if (
            !parsedResponse ||
            !Array.isArray(parsedResponse.flashcards)
        ) {
            throw new Error("Invalid flashcard response structure");
        }

        if (parsedResponse.flashcards.length !== 5) {
            throw new Error("Gemini did not generate exactly 5 flashcards");
        }

        const flashcards = parsedResponse.flashcards.map((card) => {
            if (
                typeof card.question !== "string" ||
                typeof card.answer !== "string"
            ) {
                throw new Error("Invalid flashcard question or answer");
            }

            return {
                question: card.question,
                answer: card.answer,
                subject:
                    typeof card.subject === "string"
                        ? card.subject
                        : "general"
            };
        });

        return { flashcards };

    } catch (error) {
        console.error("Gemini AI Service Error:", error.message);
        throw new Error(`Flashcard generation failed: ${error.message}`);
    }
}

module.exports = AiService;
