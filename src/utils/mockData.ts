import { Merchant } from '../types';

export const generateMockMerchants = (): Merchant[] => {
  return [
    {
      id: 'M-1001', name: 'Acme Corp', industry: 'Retail', mrr: 15000,
      daysSinceLastTransaction: 2, supportTicketsOpen: 0, apiErrorRate: 0.1, loginFrequencyDays: 3, createdAt: '2023-01-15'
    },
    {
      id: 'M-1002', name: 'Globex Inc', industry: 'Software', mrr: 25000,
      daysSinceLastTransaction: 35, supportTicketsOpen: 1, apiErrorRate: 1.2, loginFrequencyDays: 20, createdAt: '2022-05-10'
    },
    {
      id: 'M-1003', name: 'Soylent Corp', industry: 'Food & Bev', mrr: 4500,
      daysSinceLastTransaction: 5, supportTicketsOpen: 4, apiErrorRate: 0.5, loginFrequencyDays: 5, createdAt: '2023-11-20'
    },
    {
      id: 'M-1004', name: 'Initech', industry: 'Software', mrr: 12000,
      daysSinceLastTransaction: 1, supportTicketsOpen: 0, apiErrorRate: 6.5, loginFrequencyDays: 2, createdAt: '2023-08-05'
    },
    {
      id: 'M-1005', name: 'Umbrella Corp', industry: 'Healthcare', mrr: 55000,
      daysSinceLastTransaction: 42, supportTicketsOpen: 3, apiErrorRate: 8.2, loginFrequencyDays: 30, createdAt: '2021-02-14'
    },
    {
      id: 'M-1006', name: 'Stark Industries', industry: 'Manufacturing', mrr: 125000,
      daysSinceLastTransaction: 0, supportTicketsOpen: 1, apiErrorRate: 0.0, loginFrequencyDays: 1, createdAt: '2020-10-01'
    },
    {
      id: 'M-1007', name: 'Wayne Enterprises', industry: 'Logistics', mrr: 85000,
      daysSinceLastTransaction: 12, supportTicketsOpen: 0, apiErrorRate: 1.5, loginFrequencyDays: 15, createdAt: '2021-12-01'
    },
    {
      id: 'M-1008', name: 'Cyberdyne Systems', industry: 'Technology', mrr: 34000,
      daysSinceLastTransaction: 25, supportTicketsOpen: 5, apiErrorRate: 3.4, loginFrequencyDays: 7, createdAt: '2022-07-22'
    },
    {
      id: 'M-1009', name: 'Massive Dynamic', industry: 'Healthcare', mrr: 42000,
      daysSinceLastTransaction: 4, supportTicketsOpen: 1, apiErrorRate: 0.2, loginFrequencyDays: 4, createdAt: '2023-03-15'
    },
    {
      id: 'M-1010', name: 'Hooli', industry: 'Software', mrr: 8900,
      daysSinceLastTransaction: 18, supportTicketsOpen: 2, apiErrorRate: 4.1, loginFrequencyDays: 21, createdAt: '2023-09-09'
    },
    {
      id: 'M-1011', name: 'Aperture Science', industry: 'Research', mrr: 67000,
      daysSinceLastTransaction: 1, supportTicketsOpen: 0, apiErrorRate: 0.8, loginFrequencyDays: 2, createdAt: '2020-04-12'
    },
    {
      id: 'M-1012', name: 'Tyrell Corp', industry: 'Manufacturing', mrr: 21000,
      daysSinceLastTransaction: 31, supportTicketsOpen: 2, apiErrorRate: 2.5, loginFrequencyDays: 18, createdAt: '2022-01-30'
    },
    {
      id: 'M-1013', name: 'Virtucon', industry: 'Entertainment', mrr: 11000,
      daysSinceLastTransaction: 8, supportTicketsOpen: 3, apiErrorRate: 5.5, loginFrequencyDays: 10, createdAt: '2023-06-18'
    },
    {
      id: 'M-1014', name: 'Dunder Mifflin', industry: 'Retail', mrr: 5400,
      daysSinceLastTransaction: 2, supportTicketsOpen: 1, apiErrorRate: 0.5, loginFrequencyDays: 1, createdAt: '2023-10-05'
    },
    {
      id: 'M-1015', name: 'Pied Piper', industry: 'Software', mrr: 3200,
      daysSinceLastTransaction: 45, supportTicketsOpen: 0, apiErrorRate: 0.0, loginFrequencyDays: 40, createdAt: '2024-01-11'
    },
    {
      id: 'M-1016', name: 'Oceanic Airlines', industry: 'Travel', mrr: 95000,
      daysSinceLastTransaction: 1, supportTicketsOpen: 6, apiErrorRate: 1.2, loginFrequencyDays: 3, createdAt: '2021-08-20'
    },
    {
      id: 'M-1017', name: 'Wonka Industries', industry: 'Food & Bev', mrr: 18500,
      daysSinceLastTransaction: 15, supportTicketsOpen: 0, apiErrorRate: 2.1, loginFrequencyDays: 16, createdAt: '2022-11-15'
    },
    {
      id: 'M-1018', name: 'Gringotts', industry: 'Finance', mrr: 150000,
      daysSinceLastTransaction: 0, supportTicketsOpen: 0, apiErrorRate: 0.1, loginFrequencyDays: 1, createdAt: '2019-05-05'
    },
    {
      id: 'M-1019', name: 'Ollivanders', industry: 'Retail', mrr: 2800,
      daysSinceLastTransaction: 20, supportTicketsOpen: 1, apiErrorRate: 0.0, loginFrequencyDays: 25, createdAt: '2023-04-10'
    },
    {
      id: 'M-1020', name: 'Los Pollos Hermanos', industry: 'Food & Bev', mrr: 45000,
      daysSinceLastTransaction: 2, supportTicketsOpen: 2, apiErrorRate: 0.4, loginFrequencyDays: 2, createdAt: '2021-06-25'
    }
  ];
};
