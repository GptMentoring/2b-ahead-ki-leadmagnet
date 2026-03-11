export interface QuizAnswers {
  industry: string;
  companySize: string;
  maturityLevel: number;
  affectedPeople: string;
  focusAreas: string[];
  weeklyRepetitiveHours: number;
}

export interface MiniPillarScores {
  automatisierung: number;
  kiTools: number;
  datenstrategie: number;
  teamkompetenz: number;
  innovation: number;
}

export interface ActionArea {
  areaId: string;
  areaLabel: string;
  description: string;
  recommendedTool: string;
  priority: number;
}

export interface QuizResults {
  timeSavingsHoursPerWeek: number;
  costSavingsEuroPerMonth: number;
  revenuePotentialEuroPerMonth: number;
  totalPotentialEuroPerMonth: number;
  maturityLabel: string;
  miniPillarScores: MiniPillarScores;
  overallScore: number;
  topActionAreas: ActionArea[];
  recommendedTool: string;
  industryBenchmark: MiniPillarScores;
}

export interface LeadData {
  name: string;
  email: string;
  company: string;
}

export interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  adId: string;
}

export interface QuizResultDocument {
  id: string;
  createdAt: number;
  leadId: string | null;
  industry: string;
  companySize: string;
  maturityLevel: number;
  affectedPeople: string;
  focusAreas: string[];
  weeklyRepetitiveHours: number;
  timeSavingsHoursPerWeek: number;
  costSavingsEuroPerMonth: number;
  revenuePotentialEuroPerMonth: number;
  totalPotentialEuroPerMonth: number;
  maturityLabel: string;
  miniPillarScores: MiniPillarScores;
  overallScore: number;
  topActionAreas: ActionArea[];
  recommendedTool: string;
  utmSource: string;
  utmCampaign: string;
  utmMedium: string;
}

export interface LeadDocument {
  id: string;
  name: string;
  email: string;
  company: string;
  createdAt: number;
  quizResultId: string;
  source: string;
  campaign: string;
  medium: string;
  adId: string;
}
