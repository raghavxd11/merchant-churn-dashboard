import React from 'react';
import { AnalyzedMerchant, RiskLevel } from '../types';
import { RiskBadge } from './RiskBadge';
import { Search, ArrowUpDown, ChevronRight } from 'lucide-react';

interface MerchantTableProps {
  merchants: AnalyzedMerchant[];
  onSelectMerchant: (merchant: AnalyzedMerchant) => void;
  selectedMerchantId: string | null;
}

export function MerchantTable({ merchants, onSelectMerchant, selectedMerchantId }: MerchantTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortField, setSortField] = React.useState<keyof AnalyzedMerchant | 'riskScore'>('riskScore');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc');
  const [filterRisk, setFilterRisk] = React.useState<RiskLevel | 'All'>('All');

  const filteredMerchants = merchants.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'All' || m.analysis.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const sortedMerchants = [...filteredMerchants].sort((a, b) => {
    let valA: any;
    let valB: any;
    
    if (sortField === 'riskScore') {
      valA = a.analysis.riskScore;
      valB = b.analysis.riskScore;
    } else {
      valA = a[sortField as keyof AnalyzedMerchant];
      valB = b[sortField as keyof AnalyzedMerchant];
    }

    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });



  const handleSort = (field: keyof AnalyzedMerchant | 'riskScore') => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc'); // Default to desc for risk score/mrr
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search merchants..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm text-slate-500 font-medium">Filter Risk:</span>
          <select
            className="border border-slate-300 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500"
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value as RiskLevel | 'All')}
          >
            <option value="All">All Levels</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">Merchant <ArrowUpDown size={14} /></div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('mrr')}>
                <div className="flex items-center gap-1">MRR <ArrowUpDown size={14} /></div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('riskScore')}>
                <div className="flex items-center gap-1">Risk Score <ArrowUpDown size={14} /></div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedMerchants.map((merchant) => (
              <tr 
                key={merchant.id} 
                onClick={() => onSelectMerchant(merchant)}
                className={`hover:bg-indigo-50 cursor-pointer transition-colors ${
                  selectedMerchantId === merchant.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{merchant.name}</span>
                    <span className="text-xs text-slate-500">{merchant.id} • {merchant.industry}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                  {formatCurrency(merchant.mrr)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">{merchant.analysis.riskScore}</span>
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          merchant.analysis.riskScore >= 70 ? 'bg-red-500' :
                          merchant.analysis.riskScore >= 40 ? 'bg-orange-500' :
                          merchant.analysis.riskScore >= 20 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${merchant.analysis.riskScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RiskBadge level={merchant.analysis.riskLevel} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ChevronRight size={18} className="text-slate-400 inline-block" />
                </td>
              </tr>
            ))}
            {sortedMerchants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No merchants found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
