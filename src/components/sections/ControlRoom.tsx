'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ControlRoom() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'OVERVIEW', icon: '📊' },
    { id: 'projects', label: 'PROJECTS', icon: '💻' },
    { id: 'skills', label: 'SKILLS', icon: '⚡' },
    { id: 'experience', label: 'EXPERIENCE', icon: '🚀' },
    { id: 'contact', label: 'CONTACT', icon: '📡' }
  ];

  return (
    <div className="fixed top-4 left-4 z-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-panel border border-panel-border rounded-lg p-4 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">CONTROL PANEL</span>
        </div>
        
        <div className="space-y-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-md font-mono text-sm transition-all ${
                activeSection === section.id
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-panel-border/20'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </motion.button>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-panel-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>SYSTEM STATUS: ONLINE</div>
            <div>UPTIME: 99.9%</div>
            <div>RESPONSE: &lt;1ms</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}