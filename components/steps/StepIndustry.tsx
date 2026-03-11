import React from 'react';
import { INDUSTRIES, COLORS } from '../../constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const StepIndustry: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">In welcher Branche bist du?</h2>
        <p className="text-sm text-gray-500 font-semibold">Wähle die Branche, die am besten passt.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {INDUSTRIES.map(ind => (
          <button
            key={ind.id}
            onClick={() => onChange(ind.id)}
            className={`p-4 md:p-5 border-2 rounded-2xl text-left transition-all active:scale-95 ${
              value === ind.id
                ? 'shadow-lg scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            style={value === ind.id ? {
              borderColor: COLORS.PRIMARY,
              backgroundColor: 'rgba(100, 22, 45, 0.05)'
            } : {}}
          >
            <span className="text-2xl block mb-1">{ind.icon}</span>
            <span className={`block text-xs font-black ${value === ind.id ? 'text-primary' : 'text-gray-800'}`}>
              {ind.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepIndustry;
