'use client';

import React, { useState, useEffect } from 'react';

export default function SpeechBubble() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the bubble before
    const dismissed = localStorage.getItem('speechBubbleDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show the speech bubble after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    // Remember dismissal for future visits
    localStorage.setItem('speechBubbleDismissed', 'true');
  };

  // Don't render if dismissed or not visible
  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="speech-bubble">
      <div className="speech-bubble-content">
        <div className="speech-bubble-text">
          Send us a quick message!
        </div>
        <button 
          onClick={handleDismiss}
          className="speech-bubble-close"
          aria-label="Close speech bubble"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="speech-bubble-arrow"></div>
    </div>
  );
}
