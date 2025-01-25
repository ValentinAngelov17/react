import OpenAI from 'openai'
import { openaiApiKey } from './openaiConfig';

// OpenAI configuration
const openai = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true
});

// System prompt for ChatGPT
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

/**
 * Fetches a recipe suggestion from GPT based on a list of ingredients.
 * @param {Array<string>} ingredientsArr - List of ingredients (e.g., ["eggs", "milk", "flour"]).
 * @returns {Promise<string>} - The generated recipe in markdown format.
 */
export default async function getRecipeFromGPT(ingredientsArr) {
    // Validate the ingredients array
    if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
        throw new Error("Invalid ingredients list. Please provide an array of ingredients.");
    }

    const ingredientsString = ingredientsArr.join(", ");

    try {
        // Make API call to OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have these ingredients: ${ingredientsString}. What recipe can I make with them?` },
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        // Extract and return recipe content
        return response.choices[0]?.message?.content?.trim() || "No recipe generated. Try again!";
    } catch (error) {
        console.error("API Error:", error.message);
        throw new Error("Failed to fetch the recipe. Please try again.");
    }
}
