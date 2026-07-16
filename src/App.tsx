import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { KpiCards } from './components/KpiCards';
import { MerchantTable } from './components/MerchantTable';
import { MerchantDetailsPanel } from './components/MerchantDetailsPanel';
import { AnalyzedMerchant } from './types';
import { generateMockMerchants } from './utils/mockData';
import { analyzeMerchantRisk } from './utils/riskEngine';

const STORAGE_KEY = 'churn_merchants_data';

function App() {
  const [merchants, setMerchants] = useState<AnalyzedMerchant[]>([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);

  // Load from local storage or generate mock data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMerchants(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored merchants", e);
        initializeData();
      }
    } else {
      initializeData();
    }
  }, []);

  const initializeData = () => {
    const rawMerchants = generateMockMerchants();
    const analyzed = rawMerchants.map(m => ({
      ...m,
      analysis: analyzeMerchantRisk(m)
    }));
    setMerchants(analyzed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyzed));
    setSelectedMerchantId(null);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset demo data? This will overwrite local storage.')) {
      initializeData();
    }
  };

  const selectedMerchant = merchants.find(m => m.id === selectedMerchantId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <DashboardHeader onReset={handleResetData} />
      
      <main className="flex-1 p-4 lg:p-6 flex flex-col max-w-[1600px] mx-auto w-full">
        {merchants.length > 0 && (
          <KpiCards merchants={merchants} />
        )}

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[600px]">
          {/* Main Table Area */}
          <div className={`flex-1 transition-all duration-300 ${selectedMerchantId ? 'hidden lg:block lg:w-2/3' : 'w-full'}`}>
            <MerchantTable 
              merchants={merchants} 
              onSelectMerchant={(m) => setSelectedMerchantId(m.id)}
              selectedMerchantId={selectedMerchantId}
            />
          </div>

          {/* Details Panel */}
          <div className={`w-full lg:w-1/3 transition-all duration-300 ${!selectedMerchantId ? 'hidden lg:block' : 'block'}`}>
            <MerchantDetailsPanel 
              merchant={selectedMerchant} 
              onClose={() => setSelectedMerchantId(null)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
