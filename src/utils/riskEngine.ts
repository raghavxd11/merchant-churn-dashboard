import { Merchant, ChurnAnalysis, RiskLevel } from '../types';

export function analyzeMerchantRisk(merchant: Merchant): ChurnAnalysis {
  let riskScore = 0;
  const contributingFactors: string[] = [];
  let recommendedAction = "Continue standard account management.";

  // 1. Transaction Recency
  if (merchant.daysSinceLastTransaction > 30) {
    riskScore += 40;
    contributingFactors.push(`No transactions in ${merchant.daysSinceLastTransaction} days`);
  } else if (merchant.daysSinceLastTransaction > 14) {
    riskScore += 15;
    contributingFactors.push(`No transactions in ${merchant.daysSinceLastTransaction} days`);
  }

  // 2. Support Tickets
  if (merchant.supportTicketsOpen >= 3) {
    riskScore += 25;
    contributingFactors.push(`${merchant.supportTicketsOpen} open support tickets`);
  } else if (merchant.supportTicketsOpen > 0) {
    riskScore += 10;
  }

  // 3. API Error Rate
  if (merchant.apiErrorRate > 5) {
    riskScore += 20;
    contributingFactors.push(`High API error rate (${merchant.apiErrorRate.toFixed(1)}%)`);
  } else if (merchant.apiErrorRate > 2) {
    riskScore += 10;
  }

  // 4. Login Frequency
  if (merchant.loginFrequencyDays > 14) {
    riskScore += 15;
    contributingFactors.push(`Rare logins (avg ${merchant.loginFrequencyDays} days)`);
  }

  // Determine Risk Level
  let riskLevel: RiskLevel = 'Low';
  if (riskScore >= 70) {
    riskLevel = 'Critical';
  } else if (riskScore >= 40) {
    riskLevel = 'High';
  } else if (riskScore >= 20) {
    riskLevel = 'Medium';
  }

  // Determine Recommended Action
  if (riskLevel === 'Critical') {
    if (merchant.daysSinceLastTransaction > 30) {
      recommendedAction = "Immediate executive outreach required. Review pricing and offer account health check.";
    } else {
      recommendedAction = "Urgent Account Manager intervention. Resolve open issues immediately.";
    }
  } else if (riskLevel === 'High') {
    if (merchant.apiErrorRate > 5) {
      recommendedAction = "Technical Account Manager to review API logs and proactively reach out with solutions.";
    } else if (merchant.supportTicketsOpen >= 3) {
      recommendedAction = "Escalate open support tickets to Tier 2 support for faster resolution.";
    } else {
      recommendedAction = "Schedule a quarterly business review (QBR) to discuss platform engagement.";
    }
  } else if (riskLevel === 'Medium') {
    recommendedAction = "Send automated re-engagement campaign highlighting new features and best practices.";
  }

  return {
    riskScore: Math.min(riskScore, 100),
    riskLevel,
    recommendedAction,
    contributingFactors
  };
}
