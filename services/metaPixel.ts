declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const metaPixel = {
  pageView: () => {
    window.fbq?.('track', 'PageView');
  },

  quizStarted: () => {
    window.fbq?.('trackCustom', 'QuizStarted');
  },

  quizStepCompleted: (stepNumber: number, stepName: string) => {
    window.fbq?.('trackCustom', 'QuizStepCompleted', {
      step_number: stepNumber,
      step_name: stepName
    });
  },

  quizCompleted: (industry: string, timeSavings: number, costSavings: number) => {
    window.fbq?.('trackCustom', 'QuizCompleted', {
      industry,
      time_savings: timeSavings,
      cost_savings: costSavings
    });
  },

  leadCaptured: (value: number) => {
    window.fbq?.('track', 'Lead', {
      currency: 'EUR',
      value
    });
  },

  ctaClicked: () => {
    window.fbq?.('trackCustom', 'CTAtoFullAssessment');
  },

  resultShared: () => {
    window.fbq?.('trackCustom', 'ResultShared');
  }
};

export function captureUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    adId: params.get('fbclid') || params.get('ad_id') || ''
  };
}
