import React from 'react';
import { COLORS } from '../../constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TEAM_OPTIONS = [
  { id: 'solo', label: 'Nur ich', desc: 'Ich arbeite allein oder bin Einzelunternehmer', icon: '👤' },
  { id: '2-3', label: '2–3 Personen', desc: 'Ein kleines Kernteam', icon: '👥' },
  { id: '4-10', label: '4–10 Personen', desc: 'Eine ganze Abteilung oder Teamgruppe', icon: '👥' },
  { id: '11-20', label: '11–20 Personen', desc: 'Mehrere Teams oder Abteilungen', icon: '🏢' },
  { id: '20+', label: 'Mehr als 20', desc: 'Große Teile des Unternehmens', icon: '🏢' },
];

const StepTeamAffected: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Wie viele Personen machen regelmäßig repetitive Aufgaben?</h2>
        <p className="text-sm text-gray-500 font-semibold">Denk an E-Mails, Berichte, Datenerfassung, Abstimmungen etc.</p>
      </div>

      <div className="space-y-3">
        {TEAM_OPTIONS.map(opt => {
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`w-full p-4 md:p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] flex items-center gap-3.5 ${
                isSelected
                  ? 'shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              style={isSelected ? {
                borderColor: COLORS.PRIMARY,
                backgroundColor: 'rgba(100, 22, 45, 0.05)',
              } : {}}
            >
              <span className="text-2xl flex-shrink-0">{opt.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-black ${isSelected ? '' : 'text-gray-900'}`} style={isSelected ? { color: COLORS.PRIMARY } : {}}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.PRIMARY }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepTeamAffected;
