import React from 'react';
import { MATURITY_LEVELS, COLORS } from '../../constants';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const StepMaturity: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Wo steht ihr gerade mit KI?</h2>
        <p className="text-sm text-gray-500 font-semibold">Wähle die Stufe, die am besten passt.</p>
      </div>

      <div className="space-y-3">
        {MATURITY_LEVELS.map(m => {
          const isSelected = value === m.level;
          return (
            <button
              key={m.level}
              onClick={() => onChange(m.level)}
              className={`w-full p-4 md:p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] flex items-start gap-3.5 ${
                isSelected
                  ? 'shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              style={isSelected ? {
                borderColor: COLORS.PRIMARY,
                backgroundColor: 'rgba(100, 22, 45, 0.05)',
              } : {}}
            >
              <span
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black ${
                  isSelected ? 'text-white' : 'bg-gray-100 text-gray-500'
                }`}
                style={isSelected ? { backgroundColor: COLORS.PRIMARY } : {}}
              >
                {m.level}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-black ${isSelected ? '' : 'text-gray-900'}`} style={isSelected ? { color: COLORS.PRIMARY } : {}}>
                    {m.label}
                  </span>
                  {isSelected && (
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.PRIMARY }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{m.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepMaturity;
