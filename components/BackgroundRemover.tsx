
import React, { useState, useCallback, useEffect } from 'react';
import { removeBackground } from '../services/geminiService';
import { fileToGenerativePart } from '../utils/fileUtils';
import { UploadIcon, DownloadIcon, MagicWandIcon, XCircleIcon } from './icons';

interface BackgroundRemoverProps {
  initialImage: string | null;
}

const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({ initialImage }) => {
  const [originalImage, setOriginalImage] = useState<{ url: string; part: { inlineData: { data: string; mimeType: string; } } } | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
        const processInitialImage = async () => {
            try {
                const response = await fetch(initialImage);
                const blob = await response.blob();
                const file = new File([blob], "generated_image.png", { type: blob.type });
                const part = await fileToGenerativePart(file);
                setOriginalImage({ url: initialImage, part });
                setProcessedImage(null);
                setError(null);
            } catch (err) {
                setError('Failed to load generated image.');
            }
        };
        processInitialImage();
    }
  }, [initialImage]);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      setProcessedImage(null);
      try {
        const part = await fileToGenerativePart(file);
        const url = URL.createObjectURL(file);
        setOriginalImage({ url, part });
      } catch (err) {
        setError('Failed to read file. Please try another image.');
      }
    }
  }, []);
  
  const handleRemoveBackground = async () => {
    if (!originalImage) return;
    setIsLoading(true);
    setError(null);
    setProcessedImage(null);
    try {
      const resultDataUrl = await removeBackground(originalImage.part.inlineData.data, originalImage.part.inlineData.mimeType);
      setProcessedImage(resultDataUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50">
      {!originalImage && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-12 text-center h-80">
          <UploadIcon className="w-12 h-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Upload an Image</h3>
          <p className="text-gray-400 mb-4">Drag and drop or click to select a file</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            Select Image
          </label>
        </div>
      )}

      {originalImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Original</h3>
            <div className="w-full aspect-square bg-gray-700/50 rounded-lg overflow-hidden relative">
              <img src={originalImage.url} alt="Original" className="w-full h-full object-contain" />
              <button onClick={clearImages} className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/80 transition-all">
                <XCircleIcon className="w-6 h-6"/>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Result</h3>
            <div className="w-full aspect-square bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%234a5568%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%234a5568%22%2F%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20y%3D%2210%22%20fill%3D%22%232d3748%22%2F%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20x%3D%2210%22%20fill%3D%22%232d3748%22%2F%3E%3C%2Fsvg%3E')]">
              {isLoading && <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>}
              {processedImage && !isLoading && <img src={processedImage} alt="Processed" className="w-full h-full object-contain" />}
              {!processedImage && !isLoading && <p className="text-gray-400">Result will appear here</p>}
            </div>
          </div>
        </div>
      )}

      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}

      {originalImage && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleRemoveBackground} disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            <MagicWandIcon className="w-6 h-6" />
            {isLoading ? 'Processing...' : 'Remove Background'}
          </button>
          {processedImage && (
            <a href={processedImage} download="background-removed.png" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-700 transition-colors">
              <DownloadIcon className="w-6 h-6" />
              Download
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;
