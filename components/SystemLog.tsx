'use client';

import React, { useState, useEffect } from 'react';

const LOG_MESSAGES = [
  "Bypassing secure gateway...",
  "Packet inspection in progress...",
  "Neural link synchronized.",
  "Decryption engine at 84% capacity.",
  "Unauthorized access detected... masking IP.",
  "Subject dossier retrieved.",
  "Memory buffer overflow prevented.",
  "Tracing connection source...",
  "Signal strength: 98.4%",
  "Archive integrity verified."
];

export default function SystemLog() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]];
        if (next.length > 5) return next.slice(1);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-10 pointer-events-none font-mono text-[10px] text-emerald-500/30 uppercase space-y-1">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-emerald-500/10">[{new Date().toLocaleTimeString()}]</span>
          <span>{log}</span>
        </div>
      ))}
    </div>
  );
}
