import React, { useState } from 'react';
import { Button } from './UIComponents';
import { metaPixel } from '../services/metaPixel';

interface ShareButtonProps {
  timeSavings: number;
  totalPotential: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ timeSavings, totalPotential }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Mein KI-Potenzial: ${totalPotential.toLocaleString('de-DE')} EUR/Monat und ${timeSavings}h/Woche! Finde heraus, wie viel Potenzial in deinem Unternehmen steckt:`;
  const shareUrl = window.location.origin + window.location.pathname;

  const handleShare = async () => {
    metaPixel.resultShared();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KI-Spar-Rechner | 2b AHEAD',
          text: shareText,
          url: shareUrl
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" className="w-full text-sm">
      {copied ? 'Link kopiert!' : 'Ergebnis teilen'}
    </Button>
  );
};

export default ShareButton;
