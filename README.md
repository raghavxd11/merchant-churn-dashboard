# 📊 Merchant Churn Intelligence Dashboard

A modern, high-performance analytics web application built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS 4**. This dashboard helps customer success teams and account managers identify, analyze, and proactively engage with merchants who are at risk of churning.

---

## 🚀 Features

- **Key Performance Indicators (KPIs):** Instant visibility into total merchants, critical-risk count, high-risk count, and total Monthly Recurring Revenue (MRR) currently at risk.
- **Dynamic Merchant Table:** Searchable, sortable, and filterable list of all merchants. Quickly sort by MRR, Risk Score, and filter by specific Risk Levels.
- **Risk Score Indicator:** Visual color-coded health meters showing individual risk levels (Low, Medium, High, Critical).
- **Proactive Intervention Engine:** Automatically generates context-aware recommended actions and identifies key risk factors based on merchant activity.
- **Deep-Dive Profile Panel:** Select a merchant to view their full profile:
  - Account MRR & support ticket status
  - API performance metrics
  - 6-month historical platform activity chart (powered by **Recharts**)
  - Automated diagnostic alerts
- **Interactive Demo Controls:** Reset and re-generate simulated merchant records in local storage to experience different churn risk scenarios.

---

## 🧠 Risk Scoring Engine Heuristics

The application computes a churn risk score from `0` to `100` using key activity and technical signals:

1. **Transaction Recency (Up to 40 Points):**
   - No transactions in > 30 days: `+40` risk points
   - No transactions in 15–30 days: `+15` risk points
2. **Support Ticket Load (Up to 25 Points):**
   - $\ge$ 3 open support tickets: `+25` risk points
   - 1–2 open support tickets: `+10` risk points
3. **API Stability (Up to 20 Points):**
   - API error rate > 5%: `+20` risk points
   - API error rate 2%–5%: `+10` risk points
4. **Login Frequency (Up to 15 Points):**
   - Average days between logins > 14 days: `+15` risk points

### Risk Level Classifications

- **Low Risk** (Score: `< 20`): Normal account management.
- **Medium Risk** (Score: `20–39`): Trigger automated re-engagement campaign.
- **High Risk** (Score: `40–69`): Proactive technical/account escalation.
- **Critical Risk** (Score: `$\ge$ 70`): Immediate executive outreach required.

---

## 🛠️ Technology Stack

- **Core:** [React 19](https://react.dev/) & [Vite](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed)
- **Styling:** [Tailwind CSS v4.0](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts v3](https://recharts.org/)
- **Linter:** [Oxlint](https://github.com/oxc-project/oxlint) (Fast, modern rust-based linting)

---

## 📂 Project Structure

```text
├── src/
│   ├── components/            # Interactive UI Components
│   │   ├── DashboardHeader.tsx       # Top navigation & demo reset
│   │   ├── KpiCards.tsx              # Summary metric cards
│   │   ├── MerchantTable.tsx         # Searchable, filterable table
│   │   ├── MerchantDetailsPanel.tsx  # Detailed inspection & activity chart
│   │   └── RiskBadge.tsx             # Risk level badge styling
│   ├── utils/                 # Business logic & simulation helpers
│   │   ├── mockData.ts               # Demo merchant generators
│   │   └── riskEngine.ts             # Risk calculation engine
│   ├── types.ts               # Core TypeScript definitions
│   ├── App.tsx                # Main layout coordinator
│   ├── index.css              # Global styles & Tailwind entry
│   └── main.tsx               # Application entry point
├── package.json               # Node dependencies and scripts
└── tsconfig.json              # TypeScript compilation rules
```

---

## 🏃 Getting Started

### 📋 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 🔧 Installation

Clone the repository and install the dependencies:

```bash
# Clone the repository
cd Merchant-Churn-Dashboard

# Install dependencies
npm install
```

### 💻 Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will run at `http://localhost:5173`.

### 🏗️ Build & Preview

Compile and optimize the project for production, then preview the build locally:

```bash
# Build the production bundle
npm run build

# Preview the built application
npm run preview
```

### 🧹 Linting

Run Oxlint to check code quality:

```bash
npm run lint
```
