import { MiniPillarScores } from './types';

export const COLORS = {
  PRIMARY: '#64162D',
  PRIMARY_LIGHT: '#8E2442',
  ACCENT: '#4A5568',
  GOLD: '#8E6D2F',
  SURFACE: '#FDFCFD',
  TEXT_DARK: '#111827',
  TEXT_MUTED: '#374151',
  WHITE: '#FFFFFF',
  SUCCESS: '#065F46',
  BG_GRADIENT: 'linear-gradient(135deg, #FDFCFD 0%, #F7F2F4 100%)'
};

export const LOGO_URL = 'https://2bahead.com/svg/header/logo-dark.svg';

export const PILLAR_NAMES = {
  automatisierung: 'Automatisierung',
  kiTools: 'KI-Tools',
  datenstrategie: 'Datenstrategie',
  teamkompetenz: 'Teamkompetenz',
  innovation: 'Innovation'
};

export const INDUSTRIES = [
  { id: 'tech', label: 'Technologie & IT', icon: '💻' },
  { id: 'finance', label: 'Finanzen & Banken', icon: '🏦' },
  { id: 'health', label: 'Gesundheit & Medizin', icon: '🏥' },
  { id: 'retail', label: 'Handel & E-Commerce', icon: '🛒' },
  { id: 'manufacturing', label: 'Industrie & Produktion', icon: '🏭' },
  { id: 'service', label: 'Dienstleistungen', icon: '🤝' },
  { id: 'consulting', label: 'Beratung', icon: '📊' },
  { id: 'other', label: 'Sonstige', icon: '✨' }
];

export const MATURITY_LEVELS = [
  {
    level: 1,
    label: 'Kein KI-Einsatz',
    short: 'Kein KI',
    desc: 'Wir nutzen KI noch gar nicht — alles läuft manuell oder mit klassischen Tools.'
  },
  {
    level: 2,
    label: 'Erste Gehversuche',
    short: 'Entdecker',
    desc: 'Einzelne Mitarbeiter nutzen ChatGPT & Co. privat — aber es gibt keine offizielle Strategie.'
  },
  {
    level: 3,
    label: 'Gezielte Nutzung',
    short: 'Befähigt',
    desc: 'Wir haben erste KI-Tools im Einsatz und testen aktiv, wo sie uns weiterhelfen.'
  },
  {
    level: 4,
    label: 'KI im Alltag',
    short: 'Etabliert',
    desc: 'KI ist fester Bestandteil unserer täglichen Arbeit — mit messbaren Ergebnissen.'
  },
  {
    level: 5,
    label: 'Voll integriert',
    short: 'Integriert',
    desc: 'KI steckt in fast jedem Prozess. Wir entwickeln eigene Automatisierungen und Agents.'
  }
];

export const COMPANY_SIZES = [
  { id: '1-10', label: '1–10', desc: 'Solo / Kleines Team' },
  { id: '11-50', label: '11–50', desc: 'Kleines Unternehmen' },
  { id: '51-250', label: '51–250', desc: 'Mittelstand' },
  { id: '251-1000', label: '251–1.000', desc: 'Großes Unternehmen' },
  { id: '1000+', label: '1.000+', desc: 'Konzern' }
];

export const FOCUS_AREAS = [
  { id: 'marketing', label: 'Marketing', icon: '📱' },
  { id: 'vertrieb', label: 'Vertrieb', icon: '💼' },
  { id: 'support', label: 'Support', icon: '🎧' },
  { id: 'hr', label: 'HR', icon: '👥' },
  { id: 'produkt', label: 'Produkt', icon: '🚀' },
  { id: 'verwaltung', label: 'Verwaltung', icon: '📋' },
  { id: 'it', label: 'IT / Entwicklung', icon: '💻' },
  { id: 'logistik', label: 'Logistik', icon: '📦' },
  { id: 'finanzen', label: 'Finanzen', icon: '💰' },
  { id: 'operations', label: 'Operations', icon: '⚙️' }
];

export const INDUSTRY_BENCHMARKS: Record<string, MiniPillarScores> = {
  tech:          { automatisierung: 72, kiTools: 78, datenstrategie: 70, teamkompetenz: 75, innovation: 80 },
  finance:       { automatisierung: 65, kiTools: 70, datenstrategie: 75, teamkompetenz: 60, innovation: 55 },
  health:        { automatisierung: 45, kiTools: 50, datenstrategie: 60, teamkompetenz: 45, innovation: 50 },
  retail:        { automatisierung: 55, kiTools: 60, datenstrategie: 55, teamkompetenz: 50, innovation: 60 },
  manufacturing: { automatisierung: 50, kiTools: 45, datenstrategie: 50, teamkompetenz: 40, innovation: 45 },
  service:       { automatisierung: 60, kiTools: 55, datenstrategie: 50, teamkompetenz: 55, innovation: 55 },
  consulting:    { automatisierung: 68, kiTools: 72, datenstrategie: 65, teamkompetenz: 70, innovation: 70 },
  other:         { automatisierung: 55, kiTools: 55, datenstrategie: 55, teamkompetenz: 55, innovation: 55 }
};

export const AREA_RECOMMENDATIONS: Record<string, { desc: string; tools: Record<string, string> }> = {
  marketing:   { desc: 'Content-Erstellung, Social Media Planung und Kampagnen-Analyse automatisieren', tools: { '1-10': 'ChatGPT Plus', '11-50': 'ChatGPT + Canva AI', '51-250': 'HubSpot AI', '251-1000': 'Adobe Sensei', '1000+': 'Salesforce Einstein' } },
  vertrieb:    { desc: 'Lead-Qualifizierung, Outreach-Personalisierung und CRM-Automatisierung', tools: { '1-10': 'ChatGPT Plus', '11-50': 'Apollo.io', '51-250': 'HubSpot AI', '251-1000': 'Salesforce Einstein', '1000+': 'Salesforce Einstein' } },
  support:     { desc: 'Ticket-Triage, FAQ-Automatisierung und Kundenkommunikation beschleunigen', tools: { '1-10': 'Intercom Fin', '11-50': 'Zendesk AI', '51-250': 'Zendesk AI', '251-1000': 'ServiceNow', '1000+': 'ServiceNow' } },
  hr:          { desc: 'Stellenanzeigen generieren, Bewerbungen vorfiltern und Onboarding automatisieren', tools: { '1-10': 'ChatGPT Plus', '11-50': 'Personio AI', '51-250': 'Personio AI', '251-1000': 'Workday AI', '1000+': 'Workday AI' } },
  produkt:     { desc: 'Feature-Priorisierung, User-Research-Analyse und Prototyping beschleunigen', tools: { '1-10': 'ChatGPT + Figma AI', '11-50': 'Notion AI + Figma AI', '51-250': 'Productboard AI', '251-1000': 'Productboard AI', '1000+': 'Custom AI' } },
  verwaltung:  { desc: 'Dokumentenverarbeitung, Rechnungswesen und Compliance-Checks automatisieren', tools: { '1-10': 'ChatGPT Plus', '11-50': 'Microsoft Copilot', '51-250': 'Microsoft Copilot', '251-1000': 'UiPath', '1000+': 'UiPath' } },
  it:          { desc: 'Code-Generierung, Testing-Automatisierung und Incident-Management optimieren', tools: { '1-10': 'GitHub Copilot', '11-50': 'GitHub Copilot', '51-250': 'GitHub Copilot Enterprise', '251-1000': 'GitHub Copilot Enterprise', '1000+': 'Custom AI + Copilot' } },
  logistik:    { desc: 'Bestandsvorhersage, Routenoptimierung und Lieferkettenplanung verbessern', tools: { '1-10': 'ChatGPT Plus', '11-50': 'Microsoft Copilot', '51-250': 'Blue Yonder AI', '251-1000': 'Blue Yonder AI', '1000+': 'Custom ML' } },
  finanzen:    { desc: 'Finanzanalysen, Forecasting und Reporting automatisieren', tools: { '1-10': 'ChatGPT + Excel', '11-50': 'Microsoft Copilot', '51-250': 'Microsoft Copilot', '251-1000': 'Anaplan AI', '1000+': 'Anaplan AI' } },
  operations:  { desc: 'Workflow-Orchestrierung, Prozessanalyse und Kapazitätsplanung optimieren', tools: { '1-10': 'Make + ChatGPT', '11-50': 'Make + n8n', '51-250': 'Microsoft Power Automate', '251-1000': 'Microsoft Power Automate', '1000+': 'Custom Automation' } }
};

export const TOTAL_STEPS = 6;

export const ONBOARDING_APP_URL = 'https://2bahead-onboarding.netlify.app';
