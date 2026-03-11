import React from 'react';
import { COLORS } from '../../constants';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const StepHours: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Wie viele Stunden pro Woche verbringst du mit repetitiven Aufgaben?</h2>
        <p className="text-sm text-gray-500 font-semibold">E-Mails, Reports, Daten kopieren, manuelle Prozesse...</p>
      </div>

      <div className="space-y-6 pt-4">
        {/* Big number display */}
        <div className="text-center">
          <span className="text-5xl md:text-6xl font-black" style={{ color: COLORS.PRIMARY }}>
            {value}
          </span>
          <span className="text-lg font-bold text-gray-400 ml-2">h / Woche</span>
        </div>

        {/* Slider */}
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={value}
            onChange={e => onChange(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Wenig</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Viel</span>
          </div>
        </div>

        {/* Context hint */}
        {value > 0 && (
          <div
            className="text-center p-3 rounded-xl text-xs font-bold animate-in fade-in duration-300"
            style={{ backgroundColor: 'rgba(100, 22, 45, 0.05)', color: COLORS.PRIMARY }}
          >
            {value <= 5 && 'Auch kleine Einsparungen summieren sich!'}
            {value > 5 && value <= 15 && 'Hier steckt ordentlich Potenzial drin.'}
            {value > 15 && value <= 25 && 'Das ist eine Menge Zeit - KI kann hier viel bewegen!'}
            {value > 25 && 'Wow, das ist fast ein ganzer Arbeitstag pro Woche!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepHours;
