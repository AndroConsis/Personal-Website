'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const TITLE = 'CONTACT_RELAY';
const STATION_COLOR = '#ff00ff';

const CONTENT = `Establish Communication: AndroConsis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUBJECT:   Prateek Rathore
ROLE:      Engineering Manager
LOCATION:  Pune, India

[DIRECT CHANNELS]

  EMAIL      p.rathore.2903@gmail.com
  PHONE      +91-9527053469
  LINKEDIN   in.linkedin.com/in/prateek-rathore
  GITHUB     github.com/AndroConsis/
  WEB        socialprateek.com

[AVAILABILITY]

The subject is available for:
  ► Strategic technical consultations
  ► Engineering leadership opportunities
  ► Full-stack architecture reviews
  ► Mentorship and team leadership roles

[ENCRYPTION]

All communications are end-to-end encrypted.
Response time: within 24-48 hours (business days).

INITIATE_HANDSHAKE: [SECURE]
// COMM_RELAY_ACTIVE`;

export default function ContactPage() {
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
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase" style={{ color: STATION_COLOR + '80' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: STATION_COLOR }} />
          <span>DOCKED AT {TITLE}</span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-mono font-bold tracking-tighter glitch-text"
          data-text={TITLE}
          style={{ color: STATION_COLOR }}
        >
          {TITLE}
        </h1>

        <div
          className="border rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,0,255,0.08)]"
          style={{ borderColor: STATION_COLOR + '30' }}
        >
          <div
            className="flex items-center gap-1.5 px-4 py-2.5 border-b"
            style={{ background: STATION_COLOR + '0a', borderColor: STATION_COLOR + '20' }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-[10px] font-mono tracking-widest uppercase" style={{ color: STATION_COLOR + '50' }}>
              ARCHIVE_OS // COMM_CHANNEL
            </span>
          </div>

          <div
            ref={scrollRef}
            className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[55vh] custom-scrollbar"
            style={{ color: STATION_COLOR + 'dd' }}
          >
            {displayText}
            {typing && <span className="inline-block w-2 h-4 ml-0.5 animate-pulse" style={{ background: STATION_COLOR }} />}
          </div>

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
