import React from 'react';
import { COMPANY_SIZES, COLORS } from '../../constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const StepCompanySize: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Wie viele Mitarbeiter hat dein Unternehmen?</h2>
        <p className="text-sm text-gray-500 font-semibold">Ungefähre Teamgröße reicht.</p>
      </div>

      <div className="flex flex-col gap-3">
        {COMPANY_SIZES.map(size => (
          <button
            key={size.id}
            onClick={() => onChange(size.id)}
            className={`p-4 border-2 rounded-2xl text-left transition-all active:scale-95 flex items-center justify-between ${
              value === size.id
                ? 'shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            style={value === size.id ? {
              borderColor: COLORS.PRIMARY,
              backgroundColor: 'rgba(100, 22, 45, 0.05)'
            } : {}}
          >
            <div>
              <span className={`block text-lg font-black ${value === size.id ? 'text-primary' : 'text-gray-900'}`}>
                {size.label}
              </span>
              <span className="block text-xs font-semibold text-gray-500">{size.desc}</span>
            </div>
            {value === size.id && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.PRIMARY }}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepCompanySize;
