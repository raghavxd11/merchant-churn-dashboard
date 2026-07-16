export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Merchant {
  id: string;
  name: string;
  industry: string;
  mrr: number; // Monthly Recurring Revenue
  daysSinceLastTransaction: number;
  supportTicketsOpen: number;
  apiErrorRate: number; // Percentage
  loginFrequencyDays: number; // Average days between logins
  createdAt: string;
}

export interface ChurnAnalysis {
  riskScore: number;
  riskLevel: RiskLevel;
  recommendedAction: string;
  contributingFactors: string[];
}

export interface AnalyzedMerchant extends Merchant {
  analysis: ChurnAnalysis;
}
