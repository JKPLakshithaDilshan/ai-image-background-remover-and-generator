import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { SparklesIcon, CheckCircleIcon, DownloadIcon } from './icons';

interface ImageGeneratorProps {
  onImageGenerated: (imageDataUrl: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const resultDataUrl = await generateImage(prompt);
      setGeneratedImage(resultDataUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUseImage = () => {
    if (generatedImage) {
        onImageGenerated(generatedImage);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label htmlFor="prompt" className="text-lg font-semibold mb-2 text-gray-300">
            Image Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A photorealistic image of a majestic lion in the savanna at sunset"
            className="w-full flex-grow bg-gray-900/70 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            rows={4}
          />
          <button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SparklesIcon className="w-6 h-6" />
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Generated Image</h3>
            <div className="w-full aspect-square bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden">
                {isLoading && <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>}
                {generatedImage && !isLoading && <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />}
                {!generatedImage && !isLoading && <p className="text-gray-400">Your generated image will appear here</p>}
            </div>
             {generatedImage && (
                <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                        onClick={handleUseImage}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                        >
                        <CheckCircleIcon className="w-6 h-6" />
                        Use for Background Removal
                    </button>
                    <a
                        href={generatedImage}
                        download="generated-image.png"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-700 transition-colors"
                    >
                        <DownloadIcon className="w-6 h-6" />
                        Download
                    </a>
                </div>
            )}
        </div>
      </div>
      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
    </div>
  );
};

export default ImageGenerator;