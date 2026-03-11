import { QuizAnswers, QuizResults, MiniPillarScores, ActionArea } from '../types';
import { INDUSTRY_BENCHMARKS, AREA_RECOMMENDATIONS, FOCUS_AREAS } from '../constants';

const FOCUS_AREAS_MAP: Record<string, string> = Object.fromEntries(
  FOCUS_AREAS.map(a => [a.id, a.label])
);

// --- Team multiplier from affectedPeople ---
function getTeamMultiplier(affectedPeople: string): number {
  const multipliers: Record<string, number> = {
    'solo': 1, '2-3': 2.5, '4-10': 6, '11-20': 14, '20+': 25
  };
  return multipliers[affectedPeople] || 1;
}

// --- TIME SAVINGS (total across team, hours/week) ---
export function calculateTimeSavings(answers: QuizAnswers): number {
  const baseHours = answers.weeklyRepetitiveHours;

  // Higher maturity = more savings per person (they have tools + processes to leverage)
  const maturityFactors: Record<number, number> = {
    1: 0.10, 2: 0.18, 3: 0.28, 4: 0.38, 5: 0.45
  };
  const maturityFactor = maturityFactors[answers.maturityLevel] || 0.20;

  const areaBonus = 1 + (answers.focusAreas.length * 0.04);

  const sizeFactors: Record<string, number> = {
    '1-10': 0.85, '11-50': 0.95, '51-250': 1.05, '251-1000': 1.10, '1000+': 1.15
  };
  const sizeFactor = sizeFactors[answers.companySize] || 1.0;

  const industryFactors: Record<string, number> = {
    tech: 1.25, consulting: 1.15, finance: 1.10, retail: 1.0,
    service: 0.95, manufacturing: 0.90, health: 0.85, other: 1.0
  };
  const industryFactor = industryFactors[answers.industry] || 1.0;

  const perPersonSavings = baseHours * maturityFactor * areaBonus * sizeFactor * industryFactor;

  // Total across team
  const teamMultiplier = getTeamMultiplier(answers.affectedPeople);
  const totalSavings = perPersonSavings * teamMultiplier;

  // Clamp: min 1h, max 120h (realistic for large teams)
  return Math.max(1, Math.min(120, Math.round(totalSavings)));
}

// --- COST SAVINGS (€/month, from time saved) ---
export function calculateCostSavings(timeSavingsPerWeek: number, companySize: string): number {
  const hourlyRates: Record<string, number> = {
    '1-10': 50, '11-50': 60, '51-250': 70, '251-1000': 80, '1000+': 95
  };
  const hourlyRate = hourlyRates[companySize] || 60;

  const monthlySavings = timeSavingsPerWeek * 4.33 * hourlyRate;
  return Math.round(monthlySavings / 100) * 100;
}

// --- REVENUE POTENTIAL (€/month) ---
// What AI can ADDITIONALLY generate beyond cost savings:
// more leads, higher close rates, faster product dev, better retention
export function calculateRevenuePotential(answers: QuizAnswers): number {
  // Revenue potential per area per person/month
  // Based on documented industry benchmarks:
  // - AI content marketing: 20-40% more leads (HubSpot 2024)
  // - AI sales outreach: 15-30% higher response rates (Gartner)
  // - AI code generation: 30-50% faster development (GitHub)
  const areaRevenuePotential: Record<string, number> = {
    marketing:   1800,  // more leads, better campaigns, content at scale
    vertrieb:    2200,  // higher close rates, personalized outreach
    support:     1200,  // customer retention, upsell via better service
    hr:           600,  // faster hiring, better candidate matching
    produkt:     2000,  // faster go-to-market, better decisions
    verwaltung:   400,  // fewer errors, compliance automation
    it:          2500,  // faster development (Claude Code, Copilot etc.)
    logistik:    1000,  // optimized routes, fewer stockouts
    finanzen:     800,  // better forecasting, faster reporting
    operations:  1200,  // process optimization, capacity planning
  };

  // KEY INSIGHT: Lower maturity = MORE untapped potential!
  // A Level 1 company has everything ahead of them.
  // A Level 5 company already captures most of this value.
  const maturityOpportunityFactor: Record<number, number> = {
    1: 1.0, 2: 0.85, 3: 0.65, 4: 0.40, 5: 0.20
  };
  const opportunityFactor = maturityOpportunityFactor[answers.maturityLevel] || 0.70;

  // Company size affects scale of revenue impact
  const sizeRevenueFactors: Record<string, number> = {
    '1-10': 0.5, '11-50': 0.8, '51-250': 1.2, '251-1000': 1.6, '1000+': 2.0
  };
  const sizeFactor = sizeRevenueFactors[answers.companySize] || 1.0;

  // Industry affects how directly AI translates to revenue
  const industryRevenueFactors: Record<string, number> = {
    tech: 1.3, consulting: 1.2, finance: 1.15, retail: 1.1,
    service: 1.0, manufacturing: 0.85, health: 0.80, other: 1.0
  };
  const industryFactor = industryRevenueFactors[answers.industry] || 1.0;

  // Sum potential across selected areas
  const areaTotal = answers.focusAreas.reduce((sum, areaId) => {
    return sum + (areaRevenuePotential[areaId] || 800);
  }, 0);

  // Team multiplier (dampened — revenue doesn't scale linearly)
  const teamMultiplier = getTeamMultiplier(answers.affectedPeople);
  const dampenedTeamFactor = Math.pow(teamMultiplier, 0.6);

  const rawPotential = areaTotal * opportunityFactor * sizeFactor * industryFactor * dampenedTeamFactor;

  // Round to nearest 100, min 500€, max 50.000€
  return Math.max(500, Math.min(50000, Math.round(rawPotential / 100) * 100));
}

// --- MINI PILLAR SCORES (0-100, for radar chart) ---
export function calculateMiniPillarScores(answers: QuizAnswers): MiniPillarScores {
  const { maturityLevel, focusAreas, weeklyRepetitiveHours, companySize } = answers;

  const automatisierung = Math.min(100, Math.round(
    (weeklyRepetitiveHours / 40) * 50 +
    maturityLevel * 6 +
    (focusAreas.includes('verwaltung') || focusAreas.includes('operations') ? 10 : 0) +
    10
  ));

  const sizeToolReadiness: Record<string, number> = {
    '1-10': 40, '11-50': 55, '51-250': 65, '251-1000': 72, '1000+': 78
  };
  const kiTools = Math.min(100, Math.round(
    maturityLevel * 13 +
    (sizeToolReadiness[companySize] || 55) * 0.4 +
    5
  ));

  const datenstrategie = Math.min(100, Math.round(
    maturityLevel * 14 +
    (companySize === '1000+' || companySize === '251-1000' ? 15 : 5) +
    (focusAreas.includes('finanzen') || focusAreas.includes('it') ? 10 : 0) +
    5
  ));

  const teamkompetenz = Math.min(100, Math.round(
    maturityLevel * 13 +
    focusAreas.length * 4 +
    (focusAreas.includes('produkt') || focusAreas.includes('it') ? 10 : 5) +
    5
  ));

  const innovation = Math.min(100, Math.round(
    maturityLevel * 11 +
    (focusAreas.includes('produkt') || focusAreas.includes('marketing') ? 20 : 10) +
    focusAreas.length * 4 +
    (companySize === '1-10' ? 5 : 0)
  ));

  return { automatisierung, kiTools, datenstrategie, teamkompetenz, innovation };
}

export function calculateOverallScore(scores: MiniPillarScores): number {
  return Math.round(
    scores.automatisierung * 0.25 +
    scores.kiTools * 0.20 +
    scores.datenstrategie * 0.15 +
    scores.teamkompetenz * 0.20 +
    scores.innovation * 0.20
  );
}

export function getMaturityLabel(maturityLevel: number): string {
  const labels: Record<number, string> = {
    1: 'Einsteiger', 2: 'Entdecker', 3: 'Anwender', 4: 'Fortgeschritten', 5: 'KI-Native'
  };
  return labels[maturityLevel] || 'Einsteiger';
}

export function calculateTopActionAreas(answers: QuizAnswers): ActionArea[] {
  const scored = answers.focusAreas.map(areaId => {
    const rec = AREA_RECOMMENDATIONS[areaId];
    const maturityGap = 6 - answers.maturityLevel;

    // Revenue-weighted: areas with higher revenue potential rank higher
    const revenueWeight: Record<string, number> = {
      vertrieb: 3, marketing: 3, it: 3, produkt: 2, support: 2,
      operations: 2, logistik: 1, finanzen: 1, hr: 1, verwaltung: 1
    };
    const revBonus = revenueWeight[areaId] || 1;

    return {
      areaId,
      areaLabel: FOCUS_AREAS_MAP[areaId] || areaId,
      description: rec?.desc || '',
      recommendedTool: rec?.tools[answers.companySize] || 'ChatGPT Plus',
      priority: 0,
      _score: maturityGap + revBonus
    };
  });

  return scored
    .sort((a, b) => b._score - a._score)
    .slice(0, 3)
    .map((item, index) => ({
      areaId: item.areaId,
      areaLabel: item.areaLabel,
      description: item.description,
      recommendedTool: item.recommendedTool,
      priority: index + 1
    }));
}

export function calculateRecommendedTool(companySize: string, maturityLevel: number): string {
  if (companySize === '1000+' || companySize === '251-1000') return 'Microsoft Copilot';
  if (maturityLevel <= 2) return 'ChatGPT Plus';
  if (companySize === '51-250') return 'Microsoft Copilot';
  return 'ChatGPT Plus';
}

export function calculateAllResults(answers: QuizAnswers): QuizResults {
  const timeSavings = calculateTimeSavings(answers);
  const costSavings = calculateCostSavings(timeSavings, answers.companySize);
  const revenuePotential = calculateRevenuePotential(answers);
  const totalPotential = costSavings + revenuePotential;
  const miniPillarScores = calculateMiniPillarScores(answers);
  const overallScore = calculateOverallScore(miniPillarScores);
  const maturityLabel = getMaturityLabel(answers.maturityLevel);
  const topActionAreas = calculateTopActionAreas(answers);
  const recommendedTool = calculateRecommendedTool(answers.companySize, answers.maturityLevel);
  const industryBenchmark = INDUSTRY_BENCHMARKS[answers.industry] || INDUSTRY_BENCHMARKS.other;

  return {
    timeSavingsHoursPerWeek: timeSavings,
    costSavingsEuroPerMonth: costSavings,
    revenuePotentialEuroPerMonth: revenuePotential,
    totalPotentialEuroPerMonth: totalPotential,
    maturityLabel,
    miniPillarScores,
    overallScore,
    topActionAreas,
    recommendedTool,
    industryBenchmark
  };
}
