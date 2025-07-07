import React from 'react';

function DashboardLayout({ title, tabs, activeTab, setActiveTab, children }) {
  return (
    <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center md:text-left">{title}</h1>

        
        <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 rounded-t-lg text-lg font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-cyan-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

    
        <div className="bg-white p-6 rounded-b-lg rounded-tr-lg shadow-inner min-h-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
