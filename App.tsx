import React, { useState, useEffect, useCallback } from 'react';
import { QuizAnswers, QuizResults, LeadData, UTMParams } from './types';
import { calculateAllResults } from './services/scoringService';
import { metaPixel, captureUTMParams } from './services/metaPixel';
import { leadService } from './services/leadService';
import { COLORS, LOGO_URL } from './constants';

import QuizShell from './components/QuizShell';
import StepIndustry from './components/steps/StepIndustry';
import StepCompanySize from './components/steps/StepCompanySize';
import StepMaturity from './components/steps/StepMaturity';
import StepTeamAffected from './components/steps/StepTeamAffected';
import StepAreas from './components/steps/StepAreas';
import StepHours from './components/steps/StepHours';
import ResultsTeaser from './components/ResultsTeaser';
import ResultsGated from './components/ResultsGated';
import LeadCaptureForm from './components/LeadCaptureForm';
import ResultsFull from './components/ResultsFull';
import { Card, Button } from './components/UIComponents';

// Lazy import admin view
const AdminView = React.lazy(() => import('./components/AdminView'));

type AppPhase = 'landing' | 'quiz' | 'results_teaser' | 'lead_capture' | 'results_full' | 'admin';

const STEP_NAMES = ['industry', 'companySize', 'maturity', 'teamAffected', 'areas', 'hours'];

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [quizStep, setQuizStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const [answers, setAnswers] = useState<QuizAnswers>({
    industry: '',
    companySize: '',
    maturityLevel: 0,
    affectedPeople: '',
    focusAreas: [],
    weeklyRepetitiveHours: 15
  });

  const [results, setResults] = useState<QuizResults | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [quizResultId, setQuizResultId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utm] = useState<UTMParams>(captureUTMParams);

  // Check for admin mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminKey = params.get('admin');
    if (adminKey && adminKey === (process.env.ADMIN_KEY || '2bahead2025')) {
      setPhase('admin');
    }
  }, []);

  // Can proceed to next step?
  const canProceed = useCallback((): boolean => {
    switch (quizStep) {
      case 0: return answers.industry !== '';
      case 1: return answers.companySize !== '';
      case 2: return answers.maturityLevel > 0;
      case 3: return answers.affectedPeople !== '';
      case 4: return answers.focusAreas.length > 0;
      case 5: return true; // Slider always has a value
      default: return false;
    }
  }, [quizStep, answers]);

  const handleNext = useCallback(() => {
    // Track first interaction
    if (!quizStarted) {
      metaPixel.quizStarted();
      setQuizStarted(true);
    }

    // Track step completion
    metaPixel.quizStepCompleted(quizStep + 1, STEP_NAMES[quizStep]);

    if (quizStep < 5) {
      setQuizStep(s => s + 1);
    } else {
      // Quiz complete — calculate results
      const calculatedResults = calculateAllResults(answers);
      setResults(calculatedResults);

      metaPixel.quizCompleted(
        answers.industry,
        calculatedResults.timeSavingsHoursPerWeek,
        calculatedResults.totalPotentialEuroPerMonth
      );

      // Save quiz result to Firestore
      leadService.saveQuizResult(answers, calculatedResults, utm)
        .then(id => setQuizResultId(id))
        .catch(console.error);

      setPhase('results_teaser');
    }
  }, [quizStep, answers, quizStarted, utm]);

  const handlePrev = useCallback(() => {
    if (quizStep > 0) setQuizStep(s => s - 1);
  }, [quizStep]);

  const handleUnlock = () => {
    setPhase('lead_capture');
  };

  const handleLeadSubmit = async (data: LeadData) => {
    setIsSubmitting(true);
    try {
      await leadService.saveLead(data, quizResultId, utm);
      metaPixel.leadCaptured(results?.totalPotentialEuroPerMonth || 0);
      setLeadData(data);
      setPhase('results_full');
    } catch (err) {
      console.error('Lead save error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startQuiz = () => {
    setPhase('quiz');
  };

  // Admin mode
  if (phase === 'admin') {
    return (
      <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-400 font-black">Laden...</div>}>
        <AdminView />
      </React.Suspense>
    );
  }

  // Landing page
  if (phase === 'landing') {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ background: COLORS.BG_GRADIENT }}>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: '#F1E6E9' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#FEF3C7' }} />

        <Card className="relative z-10 max-w-md w-full p-8 md:p-10 text-center animate-in fade-in zoom-in-95 duration-500">
          <img src={LOGO_URL} alt="2b AHEAD" className="h-8 mx-auto mb-6" />

          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Kostenloser KI-Potenzial-Rechner</div>

          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight">
            Wie viel <span style={{ color: COLORS.PRIMARY }}>Potenzial</span> steckt in KI für dein Unternehmen?
          </h1>
          <p className="text-sm text-gray-500 font-semibold mb-6 leading-relaxed">
            6 kurze Fragen. Nur Tippen. Sofort dein persönliches Ergebnis.
          </p>

          <Button onClick={startQuiz} className="w-full text-base py-5 shadow-xl">
            Jetzt berechnen lassen
          </Button>

          <div className="flex items-center justify-center gap-4 mt-5 text-[10px] text-gray-400 font-semibold">
            <span>Kostenlos</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Dauert 60 Sek.</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Keine Anmeldung</span>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold">
              Bereits über 500 Unternehmen haben ihren KI-Report erhalten
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz
  if (phase === 'quiz') {
    return (
      <QuizShell
        currentStep={quizStep}
        onNext={handleNext}
        onPrev={handlePrev}
        canProceed={canProceed()}
      >
        {quizStep === 0 && (
          <StepIndustry value={answers.industry} onChange={v => setAnswers({ ...answers, industry: v })} />
        )}
        {quizStep === 1 && (
          <StepCompanySize value={answers.companySize} onChange={v => setAnswers({ ...answers, companySize: v })} />
        )}
        {quizStep === 2 && (
          <StepMaturity value={answers.maturityLevel} onChange={v => setAnswers({ ...answers, maturityLevel: v })} />
        )}
        {quizStep === 3 && (
          <StepTeamAffected value={answers.affectedPeople} onChange={v => setAnswers({ ...answers, affectedPeople: v })} />
        )}
        {quizStep === 4 && (
          <StepAreas value={answers.focusAreas} onChange={v => setAnswers({ ...answers, focusAreas: v })} />
        )}
        {quizStep === 5 && (
          <StepHours value={answers.weeklyRepetitiveHours} onChange={v => setAnswers({ ...answers, weeklyRepetitiveHours: v })} />
        )}
      </QuizShell>
    );
  }

  // Results teaser + gated content
  if (phase === 'results_teaser' && results) {
    return (
      <div className="min-h-screen relative" style={{ background: COLORS.BG_GRADIENT }}>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: '#F1E6E9' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#FEF3C7' }} />

        <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
          <div className="flex justify-center mb-6">
            <img src={LOGO_URL} alt="2b AHEAD" className="h-8" />
          </div>

          <Card className="p-6 md:p-8 mb-4">
            <ResultsTeaser
              totalPotential={results.totalPotentialEuroPerMonth}
              costSavings={results.costSavingsEuroPerMonth}
              revenuePotential={results.revenuePotentialEuroPerMonth}
              timeSavings={results.timeSavingsHoursPerWeek}
              maturityLabel={results.maturityLabel}
              maturityLevel={answers.maturityLevel}
            />
          </Card>

          <ResultsGated
            miniPillarScores={results.miniPillarScores}
            benchmarkScores={results.industryBenchmark}
            topActionAreas={results.topActionAreas}
            onUnlockClick={handleUnlock}
          />
        </div>
      </div>
    );
  }

  // Lead capture modal
  if (phase === 'lead_capture' && results) {
    return (
      <>
        <div className="min-h-screen relative" style={{ background: COLORS.BG_GRADIENT }}>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: '#F1E6E9' }} />

          <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
            <div className="flex justify-center mb-6">
              <img src={LOGO_URL} alt="2b AHEAD" className="h-8" />
            </div>

            <Card className="p-6 md:p-8 mb-4">
              <ResultsTeaser
                totalPotential={results.totalPotentialEuroPerMonth}
                costSavings={results.costSavingsEuroPerMonth}
                revenuePotential={results.revenuePotentialEuroPerMonth}
                timeSavings={results.timeSavingsHoursPerWeek}
                maturityLabel={results.maturityLabel}
                maturityLevel={answers.maturityLevel}
              />
            </Card>
          </div>
        </div>
        <LeadCaptureForm onSubmit={handleLeadSubmit} onClose={() => setPhase('results_teaser')} isSubmitting={isSubmitting} />
      </>
    );
  }

  // Full report
  if (phase === 'results_full' && results && leadData) {
    return (
      <ResultsFull results={results} quizAnswers={answers} leadData={leadData} />
    );
  }

  return null;
};

export default App;
