'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Scene from '@/components/Scene';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center p-8"
          >
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2">
                <h2 className="text-emerald-500 font-mono text-sm tracking-widest uppercase animate-pulse">
                  Establishing Secure Connection...
                </h2>
                <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-emerald-500/40 uppercase">
                <div className="space-y-1">
                  <p>Bypassing Firewall...</p>
                  <p>Decrypting Packets...</p>
                  <p>Injecting Payload...</p>
                </div>
                <div className="space-y-1 text-right">
                  <p>{progress.toFixed(0)}% Complete</p>
                  <p>Node: 127.0.0.1</p>
                  <p>Status: {progress < 100 ? 'In Progress' : 'Success'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full"
          >
            <Scene />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Background Noise/Grain */}
      <div className="fixed inset-0 z-[400] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}} />
    </main>
  );
}
