import React from 'react';
import { LayoutDashboard, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onReset: () => void;
}

export function DashboardHeader({ onReset }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <LayoutDashboard size={20} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Merchant Churn Intelligence
        </h1>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
      >
        <RefreshCw size={16} />
        Reset Demo Data
      </button>
    </header>
  );
}
