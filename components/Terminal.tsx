'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function Terminal({ isOpen, onClose, title, content }: TerminalProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const cleanContent = content.trim();
      setDisplayText('');
      setIsTyping(true);
      
      let timeoutId: NodeJS.Timeout;
      let i = 0;
      
      const type = () => {
        if (i < cleanContent.length) {
          setDisplayText(cleanContent.slice(0, i + 1));
          i++;
          timeoutId = setTimeout(type, 5);
        } else {
          setIsTyping(false);
        }
      };
      
      timeoutId = setTimeout(type, 100); // 100ms delay for stability
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, content]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayText]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-none"
        >
          <div className="w-full max-w-3xl h-[70vh] bg-black/90 border border-emerald-500/30 rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.1)] flex flex-col pointer-events-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-500/10 border-bottom border-emerald-500/30">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
                  {title}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-emerald-500/20 rounded transition-colors"
              >
                <X className="w-4 h-4 text-emerald-500" />
              </button>
            </div>

            {/* Content */}
            <div
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-sm text-emerald-500/90 overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1 flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="whitespace-pre-wrap leading-relaxed flex-1 pl-1">
                  {displayText}
                  {isTyping && <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1" />}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-emerald-500/10 bg-black/50">
              <div className="flex items-center gap-4 text-[10px] font-mono text-emerald-500/50 uppercase tracking-tighter">
                <span>Status: Decrypted</span>
                <span>Access: Level 4</span>
                <span className="ml-auto">System: AI-OS v2.4</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
