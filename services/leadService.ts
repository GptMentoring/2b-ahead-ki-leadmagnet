import { collection, doc, setDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { QuizResultDocument, LeadDocument, QuizAnswers, QuizResults, UTMParams, LeadData } from '../types';

function generateId(): string {
  return 'qr-' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export const leadService = {
  saveQuizResult: async (answers: QuizAnswers, results: QuizResults, utm: UTMParams): Promise<string> => {
    const id = generateId();
    const docData: QuizResultDocument = {
      id,
      createdAt: Date.now(),
      leadId: null,
      industry: answers.industry,
      companySize: answers.companySize,
      maturityLevel: answers.maturityLevel,
      affectedPeople: answers.affectedPeople,
      focusAreas: answers.focusAreas,
      weeklyRepetitiveHours: answers.weeklyRepetitiveHours,
      timeSavingsHoursPerWeek: results.timeSavingsHoursPerWeek,
      costSavingsEuroPerMonth: results.costSavingsEuroPerMonth,
      revenuePotentialEuroPerMonth: results.revenuePotentialEuroPerMonth,
      totalPotentialEuroPerMonth: results.totalPotentialEuroPerMonth,
      maturityLabel: results.maturityLabel,
      miniPillarScores: results.miniPillarScores,
      overallScore: results.overallScore,
      topActionAreas: results.topActionAreas,
      recommendedTool: results.recommendedTool,
      utmSource: utm.source,
      utmCampaign: utm.campaign,
      utmMedium: utm.medium
    };
    await setDoc(doc(db, 'quiz_results', id), docData);
    return id;
  },

  saveLead: async (leadData: LeadData, quizResultId: string, utm: UTMParams): Promise<string> => {
    const id = 'lead-' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    const docData: LeadDocument = {
      id,
      name: leadData.name,
      email: leadData.email,
      company: leadData.company || '',
      createdAt: Date.now(),
      quizResultId,
      source: utm.source,
      campaign: utm.campaign,
      medium: utm.medium,
      adId: utm.adId
    };
    await setDoc(doc(db, 'leads', id), docData);

    // Link lead to quiz result
    await updateDoc(doc(db, 'quiz_results', quizResultId), { leadId: id });

    return id;
  },

  getAllLeads: async (): Promise<LeadDocument[]> => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as LeadDocument);
  },

  getAllQuizResults: async (): Promise<QuizResultDocument[]> => {
    const q = query(collection(db, 'quiz_results'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as QuizResultDocument);
  }
};
