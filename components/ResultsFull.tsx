import React from 'react';
import { Card, Button } from './UIComponents';
import PentagonRadar from './RadarChart';
import ShareButton from './ShareButton';
import { QuizResults, QuizAnswers, LeadData } from '../types';
import { COLORS, LOGO_URL, ONBOARDING_APP_URL, INDUSTRIES } from '../constants';
import { metaPixel } from '../services/metaPixel';

interface Props {
  results: QuizResults;
  quizAnswers: QuizAnswers;
  leadData: LeadData;
}

const ResultsFull: React.FC<Props> = ({ results, quizAnswers, leadData }) => {
  const industryLabel = INDUSTRIES.find(i => i.id === quizAnswers.industry)?.label || quizAnswers.industry;

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `KI-Potenzial-Report-${leadData.name}`;
    window.print();
    document.title = originalTitle;
  };

  const handleCTA = () => {
    metaPixel.ctaClicked();
    window.open(ONBOARDING_APP_URL, '_blank');
  };

  return (
    <div className="min-h-screen relative" style={{ background: COLORS.BG_GRADIENT }}>
      {/* Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: '#F1E6E9' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#FEF3C7' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pb-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={LOGO_URL} alt="2b AHEAD" className="h-8" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Dein persönlicher</div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">KI-Potenzial-Report</h1>
          <p className="text-sm text-gray-500 font-semibold">Hallo {leadData.name} — hier ist dein Ergebnis.</p>
        </div>

        {/* Total potential hero */}
        <Card className="p-6 md:p-8 mb-6">
          <div className="text-center p-5 rounded-2xl mb-5" style={{ backgroundColor: 'rgba(100, 22, 45, 0.06)' }}>
            <div className="text-4xl md:text-5xl font-black" style={{ color: COLORS.PRIMARY }}>
              {results.totalPotentialEuroPerMonth.toLocaleString('de-DE')} €
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-gray-500 mt-1">Gesamtpotenzial / Monat</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <div className="text-lg font-black text-gray-800">{results.costSavingsEuroPerMonth.toLocaleString('de-DE')} €</div>
              <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-0.5">Kostenersparnis</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <div className="text-lg font-black text-gray-800">{results.revenuePotentialEuroPerMonth.toLocaleString('de-DE')} €</div>
              <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-0.5">Umsatzpotenzial</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <div className="text-lg font-black text-gray-800">{results.timeSavingsHoursPerWeek}h</div>
              <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-0.5">Zeit / Woche</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2" style={{ borderColor: COLORS.PRIMARY, backgroundColor: 'rgba(100, 22, 45, 0.05)' }}>
              <span className="text-xs font-black" style={{ color: COLORS.PRIMARY }}>Level {quizAnswers.maturityLevel}:</span>
              <span className="text-xs font-black text-gray-700">{results.maturityLabel}</span>
            </div>
          </div>
        </Card>

        {/* Radar Chart */}
        <Card className="p-6 md:p-8 mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1 text-center">Dein Profil vs. {industryLabel}</h2>
          <PentagonRadar scores={results.miniPillarScores} benchmarkScores={results.industryBenchmark} />

          <div className="mt-4 p-3 rounded-xl text-center" style={{ backgroundColor: 'rgba(100, 22, 45, 0.04)' }}>
            <span className="text-xs font-bold text-gray-600">
              Dein Gesamtscore: <span className="font-black" style={{ color: COLORS.PRIMARY }}>{results.overallScore}/100</span>
            </span>
          </div>
        </Card>

        {/* Top 3 Action Areas */}
        <Card className="p-6 md:p-8 mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 text-center">Deine Top-3 KI-Bereiche</h2>
          <div className="space-y-4">
            {results.topActionAreas.map((area, index) => (
              <div
                key={area.areaId}
                className={`p-4 rounded-2xl border-2 ${index === 0 ? 'shadow-lg' : 'border-gray-100'}`}
                style={index === 0 ? { borderColor: COLORS.PRIMARY, backgroundColor: 'rgba(100, 22, 45, 0.03)' } : {}}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-black px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: index === 0 ? COLORS.PRIMARY : '#9CA3AF' }}
                  >
                    #{area.priority}
                  </span>
                  <span className="text-sm font-black text-gray-900">{area.areaLabel}</span>
                  {index === 0 && (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 ml-auto">Größtes Potenzial</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{area.description}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tool-Empfehlung:</span>
                  <span className="text-xs font-black" style={{ color: COLORS.PRIMARY }}>{area.recommendedTool}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Tool */}
        <Card className="p-6 md:p-8 mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 text-center">Unser Einstiegs-Tool für dich</h2>
          <div className="text-center">
            <div className="text-2xl font-black" style={{ color: COLORS.PRIMARY }}>{results.recommendedTool}</div>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Basierend auf deiner Unternehmensgröße und deinem aktuellen KI-Level.
            </p>
          </div>
        </Card>

        {/* CTA to full assessment */}
        <Card className="p-6 md:p-8 mb-6 no-print" style={{ backgroundColor: 'rgba(100, 22, 45, 0.03)', borderColor: COLORS.PRIMARY }}>
          <div className="text-center">
            <h2 className="text-lg font-black text-gray-900 mb-2">Du willst wissen, wie du startest?</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Der vollständige KI-Check (5 Min.) gibt dir einen konkreten Umsetzungsplan — Schritt für Schritt, passend zu deinem Level.
            </p>
            <Button onClick={handleCTA} className="w-full md:w-auto text-sm">
              Kostenlosen KI-Check starten
            </Button>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 no-print">
          <div className="flex-1">
            <ShareButton timeSavings={results.timeSavingsHoursPerWeek} totalPotential={results.totalPotentialEuroPerMonth} />
          </div>
          <div className="flex-1">
            <Button onClick={handlePrint} variant="secondary" className="w-full text-sm">
              PDF speichern
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[9px] text-gray-400 font-semibold">
          © 2026 2b AHEAD · KI-Spar-Rechner · Alle Angaben basieren auf Branchendurchschnitten
        </div>
      </div>
    </div>
  );
};

export default ResultsFull;
