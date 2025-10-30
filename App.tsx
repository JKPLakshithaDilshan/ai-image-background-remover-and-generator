import React, { useState, useCallback } from 'react';
import BackgroundRemover from './components/BackgroundRemover';
import ImageGenerator from './components/ImageGenerator';
import Tabs, { Tab } from './components/Tabs';
import { GithubIcon } from './components/icons';

type ActiveTab = 'remover' | 'generator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('remover');
  const [imageForRemover, setImageForRemover] = useState<string | null>(null);

  const handleImageGenerated = useCallback((imageDataUrl: string) => {
    setImageForRemover(imageDataUrl);
    setActiveTab('remover');
  }, []);

  const TABS: Tab[] = [
    { id: 'remover', name: 'Background Remover' },
    { id: 'generator', name: 'Image Generator' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Image Studio
        </h1>
        <a href="https://github.com/google/labs-prototypes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <GithubIcon className="w-7 h-7" />
        </a>
      </header>

      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col">
        {/* Fix: Wrap setActiveTab to cast the incoming 'id' to the 'ActiveTab' type. */}
        <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={(id) => setActiveTab(id as ActiveTab)} />

        <div className="mt-6 flex-grow">
          {activeTab === 'remover' && <BackgroundRemover initialImage={imageForRemover} />}
          {activeTab === 'generator' && <ImageGenerator onImageGenerated={handleImageGenerated} />}
        </div>
      </main>
      
      <footer className="w-full max-w-5xl mx-auto text-center text-gray-500 text-sm mt-8">
        <p>Powered by Google Gemini API. Images are not stored.</p>
      </footer>
    </div>
  );
};

export default App;
