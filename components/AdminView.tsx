import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Button } from './UIComponents';
import { leadService } from '../services/leadService';
import { LeadDocument, QuizResultDocument } from '../types';
import { COLORS, LOGO_URL, INDUSTRIES } from '../constants';

const AdminView: React.FC = () => {
  const [leads, setLeads] = useState<LeadDocument[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResultDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [l, q] = await Promise.all([
        leadService.getAllLeads(),
        leadService.getAllQuizResults()
      ]);
      setLeads(l);
      setQuizResults(q);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const quizResultMap = useMemo(() => {
    const map: Record<string, QuizResultDocument> = {};
    quizResults.forEach(qr => { map[qr.id] = qr; });
    return map;
  }, [quizResults]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const qr = quizResultMap[lead.quizResultId];
      const matchSearch = !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase());
      const matchIndustry = filterIndustry === 'all' || qr?.industry === filterIndustry;
      return matchSearch && matchIndustry;
    });
  }, [leads, search, filterIndustry, quizResultMap]);

  const exportCSV = () => {
    const header = 'Name,E-Mail,Firma,Branche,Unternehmensgröße,KI-Level,Ziel,Bereiche,Stunden/Woche,Zeitersparnis(h),Kostenersparnis(EUR),Score,Tool,Datum,UTM Source,UTM Campaign\n';
    const rows = filteredLeads.map(lead => {
      const qr = quizResultMap[lead.quizResultId];
      return [
        `"${lead.name}"`,
        `"${lead.email}"`,
        `"${lead.company}"`,
        qr?.industry || '',
        qr?.companySize || '',
        qr?.maturityLevel || '',
        qr?.primaryGoal || '',
        `"${qr?.focusAreas?.join(', ') || ''}"`,
        qr?.weeklyRepetitiveHours || '',
        qr?.timeSavingsHoursPerWeek || '',
        qr?.costSavingsEuroPerMonth || '',
        qr?.overallScore || '',
        qr?.recommendedTool || '',
        lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('de-DE') : '',
        `"${lead.source}"`,
        `"${lead.campaign}"`
      ].join(',');
    }).join('\n');

    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: COLORS.BG_GRADIENT }}>
        <div className="text-gray-400 font-black text-sm uppercase tracking-widest">Lade Daten...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: COLORS.BG_GRADIENT }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="2b AHEAD" className="h-8" />
            <div>
              <h1 className="text-xl font-black text-gray-900">Lead-Magnet Admin</h1>
              <p className="text-xs text-gray-500 font-semibold">{leads.length} Leads · {quizResults.length} Quiz-Ergebnisse</p>
            </div>
          </div>
          <Button onClick={exportCSV} variant="secondary" className="text-xs">
            CSV Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-black" style={{ color: COLORS.PRIMARY }}>{leads.length}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Leads</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-black" style={{ color: COLORS.PRIMARY }}>{quizResults.length}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Quiz-Starts</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-black" style={{ color: COLORS.PRIMARY }}>
              {quizResults.length > 0 ? Math.round((leads.length / quizResults.length) * 100) : 0}%
            </div>
            <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Conversion</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-black" style={{ color: COLORS.PRIMARY }}>
              {quizResults.length > 0 ? Math.round(quizResults.reduce((s, q) => s + q.costSavingsEuroPerMonth, 0) / quizResults.length) : 0} €
            </div>
            <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ø Ersparnis</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Suche nach Name, E-Mail oder Firma..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-gray-400"
            />
            <select
              value={filterIndustry}
              onChange={e => setFilterIndustry(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-gray-400 bg-white"
            >
              <option value="all">Alle Branchen</option>
              {INDUSTRIES.map(ind => (
                <option key={ind.id} value={ind.id}>{ind.icon} {ind.label}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Lead Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3">Name</th>
                  <th className="text-left text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3">E-Mail</th>
                  <th className="text-left text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3 hidden md:table-cell">Firma</th>
                  <th className="text-left text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3 hidden md:table-cell">Branche</th>
                  <th className="text-right text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3">Ersparnis</th>
                  <th className="text-right text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3 hidden md:table-cell">Score</th>
                  <th className="text-right text-[9px] font-black uppercase tracking-widest text-gray-400 px-4 py-3 hidden md:table-cell">Datum</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="text-3xl mb-2">🔍</div>
                      <p className="text-gray-400 font-bold text-sm">Keine Leads gefunden.</p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => {
                    const qr = quizResultMap[lead.quizResultId];
                    const industry = INDUSTRIES.find(i => i.id === qr?.industry);
                    return (
                      <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">{lead.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{lead.email}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 hidden md:table-cell">{lead.company || '–'}</td>
                        <td className="px-4 py-3 text-xs text-gray-600 hidden md:table-cell">{industry ? `${industry.icon} ${industry.label}` : '–'}</td>
                        <td className="px-4 py-3 text-sm font-black text-right" style={{ color: COLORS.PRIMARY }}>
                          {qr?.costSavingsEuroPerMonth?.toLocaleString('de-DE')} €
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-right text-gray-600 hidden md:table-cell">
                          {qr?.overallScore}/100
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400 text-right hidden md:table-cell">
                          {new Date(lead.createdAt).toLocaleDateString('de-DE')}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminView;
