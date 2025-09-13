import { GoogleGenAI } from "@google/genai";
import { UserProfile, Match } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMatches = async (profile: UserProfile): Promise<Match[]> => {
    const prompt = `
        You are a sophisticated matchmaking AI for an app called "VibesMatch".
        Your goal is to find compatible friends for a user based on their profile.
        The user's profile is as follows:
        - Name: ${profile.name}
        - Age: ${profile.age}
        - Gender: ${profile.gender}
        - Interests: ${profile.interests.join(', ')}
        - Personality Questionnaire Answers:
          ${profile.answers.map(a => `- ${a.question}: ${a.answer}`).join('\n          ')}

        Based on this information, please generate a list of 4 fictional, diverse, and compatible user profiles.
        Make their bios creative and reflective of someone who would get along well with ${profile.name}.
        For the 'avatarUrl', use a placeholder image from 'https://picsum.photos/200'.

        The output MUST be a valid JSON array of objects. Do not include any text, comments, or markdown fences outside of the JSON array itself.
        The 'age' property must be a number, not a string.
        Ensure that any double quotes inside of JSON string values are properly escaped (e.g., "He said \\"Hello\\"").
        
        Here is the required structure for each object in the array:
        {
          "id": "a-unique-string-id",
          "name": "Fictional Name",
          "age": 28,
          "shortBio": "A short, engaging bio, 1-2 sentences long. This must be a valid JSON string.",
          "avatarUrl": "https://picsum.photos/200"
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.8,
            }
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr);

        if (Array.isArray(parsedData)) {
            // Basic validation
            return parsedData.filter(item => 
                item.id && item.name && typeof item.age === 'number' && item.shortBio && item.avatarUrl
            );
        } else {
             throw new Error("Generated content is not a JSON array.");
        }

    } catch (e) {
        console.error("Failed to generate or parse matches:", e);
        throw new Error("Could not get matches from AI service.");
    }
};