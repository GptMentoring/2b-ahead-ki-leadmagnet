import React from 'react';
import PentagonRadar from './RadarChart';
import { Button } from './UIComponents';
import { MiniPillarScores, ActionArea } from '../types';
import { COLORS } from '../constants';

interface Props {
  miniPillarScores: MiniPillarScores;
  benchmarkScores: MiniPillarScores;
  topActionAreas: ActionArea[];
  onUnlockClick: () => void;
}

const ResultsGated: React.FC<Props> = ({ miniPillarScores, benchmarkScores, topActionAreas, onUnlockClick }) => {
  return (
    <div className="relative mt-8">
      {/* Blurred content */}
      <div className="blurred-gate space-y-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-2xl p-4 border-2 border-gray-100">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 text-center">Dein Profil vs. Branche</h3>
          <PentagonRadar scores={miniPillarScores} benchmarkScores={benchmarkScores} />
        </div>

        {/* Action Areas */}
        <div className="space-y-3">
          {topActionAreas.map(area => (
            <div key={area.areaId} className="bg-white rounded-2xl p-4 border-2 border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">#{area.priority}</span>
                <span className="text-sm font-black text-gray-900">{area.areaLabel}</span>
              </div>
              <p className="text-xs text-gray-500">{area.description}</p>
              <p className="text-xs font-bold mt-1" style={{ color: COLORS.PRIMARY }}>Empfohlen: {area.recommendedTool}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gate overlay */}
      <div className="gate-overlay absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(253, 252, 253, 0.7)', backdropFilter: 'blur(2px)' }}>
        <div className="bg-white rounded-[28px] shadow-2xl border-2 border-gray-100 p-6 md:p-8 mx-4 max-w-sm w-full text-center">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Dein vollständiger Report ist fertig</h3>
          <ul className="text-xs text-gray-500 font-semibold mb-5 space-y-1.5 text-left">
            <li className="flex items-center gap-2">
              <span style={{ color: COLORS.PRIMARY }}>✓</span> Dein Profil vs. Branchendurchschnitt
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: COLORS.PRIMARY }}>✓</span> Top-3 KI-Bereiche mit Tool-Empfehlungen
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: COLORS.PRIMARY }}>✓</span> Konkreter Einstiegs-Aktionsplan
            </li>
          </ul>
          <Button onClick={onUnlockClick} className="w-full text-sm">
            Kostenlos freischalten
          </Button>
          <p className="text-[9px] text-gray-400 font-semibold mt-3">Nur Vorname + E-Mail — kein Spam</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsGated;
