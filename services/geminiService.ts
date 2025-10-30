
import { GoogleGenAI, Modality } from "@google/genai";

const getGenAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const removeBackground = async (base64Data: string, mimeType: string): Promise<string> => {
    const ai = getGenAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: { data: base64Data, mimeType: mimeType },
                    },
                    {
                        text: 'Remove the background from this image. The main subject should be preserved. The background must be transparent. Output a PNG image.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const part = response.candidates?.[0]?.content?.parts?.[0];

        if (part?.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        throw new Error('Image processing failed: No image data returned from API.');

    } catch(error) {
        console.error('Gemini API error in removeBackground:', error);
        throw new Error('Failed to communicate with the AI model. Please check your connection and API key.');
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    const ai = getGenAI();
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        const image = response.generatedImages[0]?.image;

        if (image?.imageBytes) {
            return `data:image/png;base64,${image.imageBytes}`;
        }
        throw new Error('Image generation failed: No image data returned from API.');
    } catch (error) {
        console.error('Gemini API error in generateImage:', error);
        throw new Error('Failed to communicate with the AI model. Please check your connection and API key.');
    }
};
