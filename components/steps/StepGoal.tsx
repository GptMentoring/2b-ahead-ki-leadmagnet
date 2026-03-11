import React from 'react';
import { COLORS } from '../../constants';

interface Props {
  value: 'efficiency' | 'innovation' | '';
  onChange: (value: 'efficiency' | 'innovation') => void;
}

const StepGoal: React.FC<Props> = ({ value, onChange }) => {
  const goals = [
    {
      id: 'efficiency' as const,
      icon: '⚡',
      label: 'Zeit & Geld sparen',
      desc: 'Wiederkehrende Aufgaben automatisieren und Prozesse beschleunigen'
    },
    {
      id: 'innovation' as const,
      icon: '💡',
      label: 'Neue Chancen entdecken',
      desc: 'Neue Produkte, Services oder Geschäftsmodelle mit KI entwickeln'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Was ist euer Hauptziel mit KI?</h2>
        <p className="text-sm text-gray-500 font-semibold">Worauf wollt ihr euch primär konzentrieren?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(goal => (
          <button
            key={goal.id}
            onClick={() => onChange(goal.id)}
            className={`p-6 md:p-8 border-2 rounded-2xl text-left transition-all active:scale-95 ${
              value === goal.id
                ? 'shadow-lg scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            style={value === goal.id ? {
              borderColor: COLORS.PRIMARY,
              backgroundColor: 'rgba(100, 22, 45, 0.05)'
            } : {}}
          >
            <span className="text-4xl block mb-3">{goal.icon}</span>
            <span className={`block text-lg font-black mb-1 ${value === goal.id ? 'text-primary' : 'text-gray-900'}`}>
              {goal.label}
            </span>
            <span className="block text-xs font-semibold text-gray-500 leading-relaxed">{goal.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepGoal;
