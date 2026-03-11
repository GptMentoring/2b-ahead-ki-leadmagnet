import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { MiniPillarScores } from '../types';
import { PILLAR_NAMES, COLORS } from '../constants';

interface Props {
  scores: MiniPillarScores;
  benchmarkScores?: MiniPillarScores | null;
}

const PentagonRadar: React.FC<Props> = ({ scores, benchmarkScores }) => {
  const data = [
    { subject: PILLAR_NAMES.automatisierung, User: scores.automatisierung, Benchmark: benchmarkScores?.automatisierung || 0, fullMark: 100 },
    { subject: PILLAR_NAMES.kiTools, User: scores.kiTools, Benchmark: benchmarkScores?.kiTools || 0, fullMark: 100 },
    { subject: PILLAR_NAMES.datenstrategie, User: scores.datenstrategie, Benchmark: benchmarkScores?.datenstrategie || 0, fullMark: 100 },
    { subject: PILLAR_NAMES.teamkompetenz, User: scores.teamkompetenz, Benchmark: benchmarkScores?.teamkompetenz || 0, fullMark: 100 },
    { subject: PILLAR_NAMES.innovation, User: scores.innovation, Benchmark: benchmarkScores?.innovation || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[350px] min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: COLORS.TEXT_DARK, fontSize: 10, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />

          {benchmarkScores && (
            <Radar
              name="Branchenschnitt"
              dataKey="Benchmark"
              stroke="#CBD5E0"
              fill="#CBD5E0"
              fillOpacity={0.3}
              strokeDasharray="4 4"
            />
          )}

          <Radar
            name="Dein Score"
            dataKey="User"
            stroke={COLORS.PRIMARY}
            fill={COLORS.PRIMARY}
            fillOpacity={0.6}
          />

          {benchmarkScores && (
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: '10px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PentagonRadar;
