import React from 'react';
import AnimatedNumber from './AnimatedNumber';
import { COLORS } from '../constants';

interface Props {
  totalPotential: number;
  costSavings: number;
  revenuePotential: number;
  timeSavings: number;
  maturityLabel: string;
  maturityLevel: number;
}

const ResultsTeaser: React.FC<Props> = ({ totalPotential, costSavings, revenuePotential, timeSavings, maturityLabel, maturityLevel }) => {
  return (
    <div className="text-center space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Dein KI-Potenzial</div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">So viel steckt für euch drin</h2>
      </div>

      {/* Hero number: Total potential */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(100, 22, 45, 0.06)' }}>
        <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: COLORS.PRIMARY }}>
          <AnimatedNumber value={totalPotential} suffix=" €" duration={2200} />
        </div>
        <div className="text-xs font-black uppercase tracking-widest text-gray-500">Gesamtpotenzial / Monat</div>
      </div>

      {/* Breakdown: 3 sub-metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-gray-50">
          <div className="text-lg md:text-xl font-black text-gray-800">
            <AnimatedNumber value={costSavings} suffix=" €" duration={1800} />
          </div>
          <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-0.5">Kostenersparnis</div>
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <div className="text-lg md:text-xl font-black text-gray-800">
            <AnimatedNumber value={revenuePotential} suffix=" €" duration={2000} />
          </div>
          <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-0.5">Umsatzpotenzial</div>
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <div className="text-lg md:text-xl font-black text-gray-800">
            <AnimatedNumber value={timeSavings} suffix="h" duration={1500} />
          </div>
          <div className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-0.5">Zeit / Woche</div>
        </div>
      </div>

      {/* Maturity badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2" style={{ borderColor: COLORS.PRIMARY, backgroundColor: 'rgba(100, 22, 45, 0.05)' }}>
        <span className="text-sm font-black" style={{ color: COLORS.PRIMARY }}>Level {maturityLevel}:</span>
        <span className="text-sm font-black text-gray-700">{maturityLabel}</span>
      </div>

      {/* Explanation */}
      <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
        Kostenersparnis = eingesparte Arbeitsstunden. Umsatzpotenzial = mehr Leads, höhere Abschlussraten und schnellere Produktentwicklung durch KI.
      </p>
    </div>
  );
};

export default ResultsTeaser;
