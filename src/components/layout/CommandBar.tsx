'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');

  const commands = [
    'about',
    'projects',
    'skills',
    'contact',
    'experience',
    'education'
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.toLowerCase().includes(command.toLowerCase())
  );

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-panel border border-panel-border rounded-lg shadow-lg"
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">COMMAND TERMINAL</span>
          </div>
          
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            placeholder="Type a command..."
            className="w-full px-3 py-2 bg-background border border-panel-border rounded-md text-foreground font-mono text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all"
          />
          
          {isOpen && filteredCommands.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 border border-panel-border rounded-md bg-background"
            >
              {filteredCommands.map((cmd) => (
                <div
                  key={cmd}
                  className="px-3 py-2 hover:bg-panel hover:text-neon-cyan cursor-pointer transition-colors font-mono text-sm"
                >
                  {cmd}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}