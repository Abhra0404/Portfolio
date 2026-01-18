'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const bootSteps = [
    'INITIALIZING SYSTEM...',
    'LOADING KERNEL MODULES...',
    'ESTABLISHING SECURE CONNECTION...',
    'ACCESSING PORTFOLIO DATABASE...',
    'RENDERING INTERFACE COMPONENTS...',
    'SYSTEM READY'
  ];

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setDisplayText(bootSteps[currentStep]);
        setCurrentStep(currentStep + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-black text-neon-green font-mono flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-neon-cyan animate-pulse">
            ABHRA's PORTFOLIO
          </h1>
          <div className="text-lg md:text-xl text-neon-green/80">
            {displayText}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span className="text-sm text-neon-green/60">SYSTEM BOOTING</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-neon-green/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon-green rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / bootSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <div className="text-xs text-neon-green/40 space-y-1">
          <div>VERSION 2.0.26</div>
          <div>SECURE CONNECTION ESTABLISHED</div>
        </div>
      </motion.div>
    </div>
  );
}