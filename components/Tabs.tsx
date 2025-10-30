
import React from 'react';

export interface Tab {
  id: string;
  name: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="inline-flex bg-gray-800 rounded-lg p-1 space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-2 text-sm sm:text-base rounded-md transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
            activeTab === tab.id
              ? 'bg-gray-700 text-white font-semibold shadow'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50 font-medium'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
