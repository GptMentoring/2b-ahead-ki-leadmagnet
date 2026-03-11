import React from 'react';
import { Card, ProgressBar, Button } from './UIComponents';
import { COLORS, LOGO_URL } from '../constants';

interface QuizShellProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
  children: React.ReactNode;
}

const STEP_LABELS = ['Branche', 'Teamgröße', 'KI-Level', 'Betroffene', 'Bereiche', 'Zeitaufwand'];

const QuizShell: React.FC<QuizShellProps> = ({ currentStep, onNext, onPrev, canProceed, children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: COLORS.BG_GRADIENT }}>
      {/* Background ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: '#F1E6E9' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#FEF3C7' }} />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-6 pb-32 min-h-screen flex flex-col">
        {/* Logo + Step indicator */}
        <div className="flex items-center justify-between mb-5">
          <img src={LOGO_URL} alt="2b AHEAD" className="h-7" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {currentStep + 1}/6 · {STEP_LABELS[currentStep]}
          </span>
        </div>

        {/* Progress */}
        <ProgressBar currentStep={currentStep} />

        {/* Content */}
        <Card className="mt-5 p-6 md:p-8 flex-1 animate-in fade-in slide-in-from-right-8 duration-500" key={currentStep}>
          {children}
        </Card>

        {/* Navigation - fixed bottom on mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t-2 border-gray-100 p-4 z-50 no-print">
          <div className="max-w-lg mx-auto flex gap-3">
            {currentStep > 0 && (
              <Button onClick={onPrev} variant="secondary" className="flex-1 text-sm py-4">
                Zurück
              </Button>
            )}
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className={`${currentStep > 0 ? 'flex-[2]' : 'w-full'} text-sm py-4`}
            >
              {currentStep === 5 ? 'Mein Ergebnis berechnen' : 'Weiter'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizShell;
