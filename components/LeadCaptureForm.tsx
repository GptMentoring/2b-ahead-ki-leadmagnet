import React, { useState } from 'react';
import { Button } from './UIComponents';
import { LeadData } from '../types';
import { COLORS } from '../constants';

interface Props {
  onSubmit: (data: LeadData) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

const LeadCaptureForm: React.FC<Props> = ({ onSubmit, onClose, isSubmitting }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!name.trim()) {
      setError('Bitte gib deinen Namen ein.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), company: company.trim() });
  };

  const inputClass = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:border-[#64162D] focus:ring-4 focus:ring-[rgba(100,22,45,0.08)] transition-all text-sm font-bold text-gray-900 placeholder-gray-400";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] shadow-2xl border-2 border-gray-100 p-6 md:p-8 max-w-md w-full animate-in zoom-in-95 fade-in duration-300 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Schließen"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Letzter Schritt</div>
          <h3 className="text-xl font-black text-gray-900 mb-1">Wohin dürfen wir deinen Report senden?</h3>
          <p className="text-xs text-gray-500 font-semibold">Dein Radar-Chart, Top-3 Bereiche und Tool-Empfehlungen warten.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border-2 border-rose-100 rounded-xl text-rose-700 text-xs font-black text-center animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Vorname *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Dein Vorname"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">E-Mail *</label>
            <input
              type="email"
              className={inputClass}
              placeholder="deine@email.de"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Firma <span className="text-gray-300">(optional)</span></label>
            <input
              type="text"
              className={inputClass}
              placeholder="Dein Unternehmen"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Wird geladen...' : 'Report jetzt freischalten'}
            </Button>
          </div>

          <p className="text-[9px] text-gray-400 text-center leading-relaxed">
            Kein Spam. Jederzeit abmeldbar. Daten werden nicht weitergegeben.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
