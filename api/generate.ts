import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");
const MODEL_NAME = "gemini-2.0-flash";

/**
 * 🔄 RETRY UTILITY for Gemini 429 Errors (Server-side)
 */
const callWithRetry = async (fn: () => Promise<any>, retries = 1, delay = 2000): Promise<any> => {
    try {
        return await fn();
    } catch (error: any) {
        const is429 = error?.status === 429 ||
            error?.message?.includes("429") ||
            error?.message?.toLowerCase().includes("too many requests");

        if (is429 && retries > 0) {
            console.warn(`Gemini 429 detected on server. Retrying in ${delay / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return callWithRetry(fn, retries - 1, delay);
        }
        throw error;
    }
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    try {
        const { prompt, contents } = req.body;

        if (!contents || !Array.isArray(contents)) {
            return res.status(400).json({ error: 'Invalid request body. "contents" array is required.' });
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await callWithRetry(() => model.generateContent(contents));
        const response = await result.response;

        return res.status(200).json({
            text: response.text(),
            usageMetadata: response.usageMetadata
        });

    } catch (error: any) {
        console.error("Gemini Server Error:", error);
        const status = error.status || 500;
        return res.status(status).json({
            error: error.message || 'An error occurred during AI generation.',
            details: error
        });
    }
}
