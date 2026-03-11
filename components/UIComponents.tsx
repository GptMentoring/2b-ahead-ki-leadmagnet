import React from 'react';
import { COLORS, TOTAL_STEPS } from '../constants';

export const Card = ({ children, className = "", ...props }: any) => (
  <div className={`bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-gray-100 card-print ${className}`} {...props}>
    {children}
  </div>
);

export const Button = ({ onClick, children, variant = "primary", className = "", disabled = false }: any) => {
  const base = "px-8 py-4 rounded-2xl font-black transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-md no-print ";
  const variants: any = {
    primary: `text-white hover:shadow-2xl`,
    secondary: `bg-gray-100 text-gray-900 border-2 border-gray-200 hover:bg-gray-200`,
    outline: `border-2 text-gray-900 hover:bg-gray-50`,
  };
  const style = variant === 'primary' ? { backgroundColor: COLORS.PRIMARY } : {};
  return (
    <button onClick={onClick} disabled={disabled} className={base + variants[variant] + " " + className} style={style}>
      {children}
    </button>
  );
};

export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Frage {currentStep + 1} von {TOTAL_STEPS}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: COLORS.PRIMARY }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner border-2 border-gray-100">
        <div
          className="h-full transition-all duration-700 ease-out rounded-full"
          style={{
            background: `linear-gradient(90deg, ${COLORS.PRIMARY}, ${COLORS.PRIMARY_LIGHT})`,
            width: `${progress}%`
          }}
        />
      </div>
    </div>
  );
};
