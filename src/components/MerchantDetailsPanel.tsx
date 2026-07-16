import React from 'react';
import { AnalyzedMerchant } from '../types';
import { RiskBadge } from './RiskBadge';
import { 
  Building2, 
  Calendar, 
  CreditCard, 
  Ticket, 
  Activity, 
  LogOut, 
  AlertCircle,
  Lightbulb,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface MerchantDetailsPanelProps {
  merchant: AnalyzedMerchant | null;
  onClose: () => void;
}

export function MerchantDetailsPanel({ merchant, onClose }: MerchantDetailsPanelProps) {
  if (!merchant) {
    return (
      <div className="h-full bg-slate-50 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <Building2 size={48} className="mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700 mb-2">No Merchant Selected</h3>
        <p className="text-sm">Select a merchant from the table to view their churn risk analysis and recommended actions.</p>
      </div>
    );
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // Mock historical activity data for the chart based on the merchant's risk profile
  const activityData = Array.from({ length: 6 }).map((_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (5 - i));
    
    // Decrease activity if daysSinceLastTransaction is high
    const baseActivity = Math.max(10, 100 - (merchant.daysSinceLastTransaction * 1.5));
    // Introduce some random fluctuation
    const activity = Math.max(0, Math.min(100, baseActivity + (Math.random() * 20 - 10)));
    
    return {
      name: month.toLocaleString('default', { month: 'short' }),
      activity: Math.round(activity)
    };
  });

  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto relative flex flex-col">
      <div className="p-6 border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">{merchant.name}</h2>
            <RiskBadge level={merchant.analysis.riskLevel} />
          </div>
          <p className="text-sm text-slate-500">{merchant.id} • {merchant.industry}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        
        {/* Recommended Action Alert */}
        <div className={`p-4 rounded-lg border ${
          merchant.analysis.riskLevel === 'Critical' ? 'bg-red-50 border-red-200 text-red-900' :
          merchant.analysis.riskLevel === 'High' ? 'bg-orange-50 border-orange-200 text-orange-900' :
          merchant.analysis.riskLevel === 'Medium' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <div className="flex gap-3">
            <Lightbulb className="shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold mb-1">Recommended Action</h4>
              <p className="text-sm">{merchant.analysis.recommendedAction}</p>
            </div>
          </div>
        </div>

        {/* Contributing Factors */}
        {merchant.analysis.contributingFactors.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Risk Factors</h3>
            <ul className="space-y-2">
              {merchant.analysis.contributingFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">
                  <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Merchant Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <CreditCard size={14} />
                <span className="text-xs font-medium">MRR</span>
              </div>
              <p className="text-lg font-semibold text-slate-900">{formatCurrency(merchant.mrr)}</p>
            </div>
            
            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Calendar size={14} />
                <span className="text-xs font-medium">Days Since Tx</span>
              </div>
              <p className={`text-lg font-semibold ${merchant.daysSinceLastTransaction > 30 ? 'text-red-600' : 'text-slate-900'}`}>
                {merchant.daysSinceLastTransaction} days
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Ticket size={14} />
                <span className="text-xs font-medium">Open Tickets</span>
              </div>
              <p className={`text-lg font-semibold ${merchant.supportTicketsOpen >= 3 ? 'text-orange-600' : 'text-slate-900'}`}>
                {merchant.supportTicketsOpen}
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Activity size={14} />
                <span className="text-xs font-medium">API Error Rate</span>
              </div>
              <p className={`text-lg font-semibold ${merchant.apiErrorRate > 5 ? 'text-red-600' : 'text-slate-900'}`}>
                {merchant.apiErrorRate}%
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg col-span-2">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <LogOut size={14} />
                <span className="text-xs font-medium">Avg Login Frequency</span>
              </div>
              <p className={`text-lg font-semibold ${merchant.loginFrequencyDays > 14 ? 'text-orange-600' : 'text-slate-900'}`}>
                Every {merchant.loginFrequencyDays} days
              </p>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="mt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Activity Trend (Last 6 Months)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <ReferenceLine y={40} stroke="#f87171" strokeDasharray="3 3" />
                <Bar 
                  dataKey="activity" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">Activity Score (0-100) based on platform usage</p>
        </div>

      </div>
    </div>
  );
}
