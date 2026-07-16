import React from 'react';
import { Activity, AlertTriangle, Users, DollarSign } from 'lucide-react';
import { AnalyzedMerchant } from '../types';

interface KpiCardsProps {
  merchants: AnalyzedMerchant[];
}

export function KpiCards({ merchants }: KpiCardsProps) {
  const totalMerchants = merchants.length;
  const criticalRisk = merchants.filter(m => m.analysis.riskLevel === 'Critical').length;
  const highRisk = merchants.filter(m => m.analysis.riskLevel === 'High').length;
  
  const mrrAtRisk = merchants
    .filter(m => ['High', 'Critical'].includes(m.analysis.riskLevel))
    .reduce((sum, m) => sum + m.mrr, 0);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center">
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
          <Users size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Merchants</p>
          <p className="text-2xl font-bold text-slate-800">{totalMerchants}</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center">
        <div className="p-3 rounded-lg bg-red-50 text-red-600 mr-4">
          <AlertTriangle size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Critical Risk</p>
          <p className="text-2xl font-bold text-slate-800">{criticalRisk}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center">
        <div className="p-3 rounded-lg bg-orange-50 text-orange-600 mr-4">
          <Activity size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">High Risk</p>
          <p className="text-2xl font-bold text-slate-800">{highRisk}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center">
        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 mr-4">
          <DollarSign size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">MRR at Risk</p>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(mrrAtRisk)}</p>
        </div>
      </div>
    </div>
  );
}
