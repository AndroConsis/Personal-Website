'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const TITLE = 'PROFILE_HUB';
const STATION_COLOR = '#00ff41';

const CONTENT = `Subject Profile: AndroConsis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGNATION: Engineering Manager
CLEARANCE LEVEL: 10+ Years Active Service
SPECIALIZATION: Full-stack Development,
                Scalable Architecture,
                Team Leadership

OPERATIONAL BACKGROUND:
Proven expertise in architecting high-performance
applications and leading cross-functional teams
across Fintech, Healthcare, and Analytics sectors.

CURRENT DEPLOYMENT: EXL Service
LOCATION: Pune, India
EDUCATION: Rajasthan Technical University Alumnus

STATUS: ACTIVE // CLEARED FOR CONTACT`;

export default function ProfilePage() {
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTyping(true);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayText(CONTENT.slice(0, i));
      if (i >= CONTENT.length) {
        clearInterval(id);
        setTyping(false);
      }
    }, 6);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [displayText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black flex flex-col items-center justify-center p-6 md:p-12"
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Station badge */}
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase" style={{ color: STATION_COLOR + '80' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: STATION_COLOR }} />
          <span>DOCKED AT {TITLE}</span>
        </div>

        {/* Glitch title */}
        <h1
          className="text-3xl md:text-4xl font-mono font-bold tracking-tighter glitch-text"
          data-text={TITLE}
          style={{ color: STATION_COLOR }}
        >
          {TITLE}
        </h1>

        {/* Content panel */}
        <div
          className="border rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.08)]"
          style={{ borderColor: STATION_COLOR + '30' }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-1.5 px-4 py-2.5 border-b"
            style={{ background: STATION_COLOR + '0a', borderColor: STATION_COLOR + '20' }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-[10px] font-mono tracking-widest uppercase" style={{ color: STATION_COLOR + '50' }}>
              ARCHIVE_OS // PROFILE_DATA
            </span>
          </div>

          {/* Typewriter content */}
          <div
            ref={scrollRef}
            className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[55vh] custom-scrollbar"
            style={{ color: STATION_COLOR + 'dd' }}
          >
            {displayText}
            {typing && <span className="inline-block w-2 h-4 ml-0.5 animate-pulse" style={{ background: STATION_COLOR }} />}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2 border-t"
            style={{ borderColor: STATION_COLOR + '15', background: '#00000080' }}
          >
            <div className="flex gap-4 text-[9px] font-mono uppercase tracking-widest" style={{ color: STATION_COLOR + '40' }}>
              <span>STATION: {TITLE}</span>
              <span>ACCESS: GRANTED</span>
              <span className="ml-auto">SYS: AI-OS v2.4</span>
            </div>
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/space"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors pointer-events-auto"
          style={{ color: STATION_COLOR + '60' }}
          onMouseOver={e => (e.currentTarget.style.color = STATION_COLOR)}
          onMouseOut={e => (e.currentTarget.style.color = STATION_COLOR + '60')}
        >
          ← RETURN TO SPACE
        </Link>
      </div>
    </motion.div>
  );
}
