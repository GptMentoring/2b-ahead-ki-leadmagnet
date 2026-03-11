import React from 'react';
import { FOCUS_AREAS, COLORS } from '../../constants';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const MAX_SELECTIONS = 3;

const StepAreas: React.FC<Props> = ({ value, onChange }) => {
  const handleToggle = (areaId: string) => {
    if (value.includes(areaId)) {
      onChange(value.filter(id => id !== areaId));
    } else if (value.length < MAX_SELECTIONS) {
      onChange([...value, areaId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Welche Bereiche interessieren dich am meisten?</h2>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 font-semibold">Wähle bis zu 3 Bereiche.</p>
          <span
            className="text-xs font-black px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: value.length === MAX_SELECTIONS ? 'rgba(100, 22, 45, 0.1)' : '#F3F4F6',
              color: value.length === MAX_SELECTIONS ? COLORS.PRIMARY : '#6B7280'
            }}
          >
            {value.length}/{MAX_SELECTIONS}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {FOCUS_AREAS.map(area => {
          const isSelected = value.includes(area.id);
          const isDisabled = !isSelected && value.length >= MAX_SELECTIONS;

          return (
            <button
              key={area.id}
              onClick={() => handleToggle(area.id)}
              disabled={isDisabled}
              className={`p-3 md:p-4 border-2 rounded-2xl text-left transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                isSelected
                  ? 'shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              style={isSelected ? {
                borderColor: COLORS.PRIMARY,
                backgroundColor: 'rgba(100, 22, 45, 0.05)'
              } : {}}
            >
              <span className="text-lg block mb-0.5">{area.icon}</span>
              <span className={`block text-xs font-black ${isSelected ? 'text-primary' : 'text-gray-800'}`}>
                {area.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepAreas;
