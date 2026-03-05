'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

interface CommandTerminalProps {
  onNodeOpen: (id: string) => void;
}

// Canonical command -> aliases
const COMMANDS: Record<string, string[]> = {
  help:        ['?', 'h'],
  resume:      ['cv'],
  profile:     ['about', 'whoami'],
  skills:      ['arsenal'],
  experience:  ['exp'],
  projects:    ['proj'],
  github:      ['git'],
  credentials: ['certs'],
  contact:     ['comm'],
  space:       ['launch', 'fly'],
  clear:       ['cls'],
};

// Build reverse lookup: alias -> canonical
const ALIAS_MAP: Record<string, string> = {};
for (const [cmd, aliases] of Object.entries(COMMANDS)) {
  ALIAS_MAP[cmd] = cmd;
  for (const alias of aliases) {
    ALIAS_MAP[alias] = cmd;
  }
}

const ALL_COMMANDS = Object.keys(ALIAS_MAP);

type OutputLine = {
  text: string;
  type: 'input' | 'output' | 'info' | 'error';
};

const WELCOME_LINES: OutputLine[] = [
  { text: '╔══════════════════════════════════════════╗', type: 'info' },
  { text: '║   ARCHIVE_ACCESS // COMMAND INTERFACE    ║', type: 'info' },
  { text: '║   Type "help" or "?" for all commands    ║', type: 'info' },
  { text: '║   Press ` (backtick) to toggle           ║', type: 'info' },
  { text: '╚══════════════════════════════════════════╝', type: 'info' },
];

const HELP_TEXT = `AVAILABLE COMMANDS:
  help / ? / h         — Show this help
  profile / about      — View subject profile
  skills / arsenal     — View technical skills
  experience / exp     — View work history
  projects / proj      — View classified projects
  github / git         — View GitHub intelligence
  credentials / certs  — View certifications
  contact / comm       — Establish communication
  resume / cv          — Download resume (PDF)
  space / launch / fly — Launch space explorer
  clear / cls          — Clear terminal`;

// Map canonical command -> node id + display text
const NODE_MAP: Record<string, { id: string; label: string }> = {
  profile:     { id: 'summary',     label: 'PROFILE_HUB' },
  skills:      { id: 'skills',      label: 'ARSENAL_CORE' },
  experience:  { id: 'experience',  label: 'HISTORY_LOG' },
  projects:    { id: 'projects',    label: 'PROJECTS_VAULT' },
  github:      { id: 'github',      label: 'GITHUB_INTEL' },
  credentials: { id: 'credentials', label: 'CREDENTIALS' },
  contact:     { id: 'contact',     label: 'COMM_CHANNEL' },
};

function lineColor(type: OutputLine['type']): string {
  switch (type) {
    case 'input':  return 'text-white';
    case 'output': return 'text-emerald-400';
    case 'info':   return 'text-cyan-400';
    case 'error':  return 'text-red-400';
  }
}

export default function CommandTerminal({ onNodeOpen }: CommandTerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const hasOpened = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Backtick toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input + show welcome on first open
  useEffect(() => {
    if (!isOpen) return;
    if (!hasOpened.current) {
      hasOpened.current = true;
      setOutput(WELCOME_LINES);
    }
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Auto-scroll on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const addLines = useCallback((lines: OutputLine[]) => {
    setOutput(prev => [...prev, ...lines]);
  }, []);

  const handleCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    addLines([{ text: `> ${trimmed}`, type: 'input' }]);
    setHistory(prev => [cmd, ...prev]);
    setHistoryIdx(-1);

    const canonical = ALIAS_MAP[cmd];
    if (!canonical) {
      addLines([{ text: `Unknown command: "${cmd}". Try "help".`, type: 'error' }]);
      return;
    }

    switch (canonical) {
      case 'clear':
        setOutput([]);
        break;

      case 'help':
        addLines([{ text: HELP_TEXT, type: 'output' }]);
        break;

      case 'resume': {
        addLines([{ text: 'Initiating resume download...', type: 'info' }]);
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'resume.pdf';
        link.click();
        addLines([{ text: 'Download started. Check your downloads folder.', type: 'output' }]);
        break;
      }

      case 'space':
        addLines([{ text: 'LAUNCHING HYPERDRIVE... Routing to /space', type: 'info' }]);
        setTimeout(() => router.push('/space'), 600);
        break;

      default: {
        const node = NODE_MAP[canonical];
        if (node) {
          addLines([{ text: `Decrypting ${node.label}...`, type: 'info' }]);
          onNodeOpen(node.id);
        }
        break;
      }
    }
  }, [addLines, onNodeOpen, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      if (history[idx] !== undefined) setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? '' : history[idx] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;
      const matches = ALL_COMMANDS.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        addLines([{ text: `Tab: ${matches.join('  ')}`, type: 'info' }]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-8 right-40 z-[300] px-3 py-1 font-mono text-[10px] border border-emerald-500/40 text-emerald-500/70 hover:text-emerald-500 hover:border-emerald-500/70 hover:bg-emerald-500/5 transition-colors bg-black/80 tracking-widest uppercase"
      >
        {isOpen ? '◼ CLOSE' : '◉ TERMINAL'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 right-8 z-[290] w-[520px] max-w-[calc(100vw-2rem)] h-80 bg-black/95 border border-emerald-500/30 rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.08)] flex flex-col overflow-hidden"
          >
            {/* macOS-style title bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d0d0d] border-b border-emerald-500/20 flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-[10px] font-mono text-emerald-500/40 uppercase tracking-widest">
                ARCHIVE_OS // CMD_INTERFACE
              </span>
            </div>

            {/* Output area */}
            <div
              ref={scrollRef}
              className="flex-1 px-4 py-3 font-mono text-xs overflow-y-auto custom-scrollbar space-y-0.5"
            >
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap leading-relaxed ${lineColor(line.type)}`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-t border-emerald-500/20 bg-[#080808] flex-shrink-0">
              <span className="text-emerald-500 font-mono text-xs flex-shrink-0 select-none">{'>'}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent font-mono text-xs text-white outline-none caret-emerald-500 placeholder:text-emerald-500/25"
                placeholder="type a command..."
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
