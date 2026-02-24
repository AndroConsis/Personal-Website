'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Environment, MeshWobbleMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import EvidenceItem from './EvidenceItem';
import Terminal from './Terminal';
import SystemLog from './SystemLog';

const DATA = {
  summary: {
    title: "Subject Profile: AndroConsis",
    content: `Engineering Manager | 10+ Years Experience
Specialization: Full-stack Development, Scalable Architecture, Team Leadership.

Proven expertise in architecting high-performance applications and leading cross-functional teams across Fintech, Healthcare, and Analytics sectors.

Current Status: Active (EXL Service)
Location: Rajasthan Technical University Alumnus`
  },
  skills: {
    title: "Technical Arsenal",
    content: `[FRONTEND]
- React.js, React Native
- JavaScript (ES6+), TypeScript
- Redux, MobX, Tailwind CSS

[BACKEND]
- Node.js, Java, Spring Boot
- GraphQL, REST APIs

[CLOUD & DEVOPS]
- AWS (Certified Cloud Practitioner)
- Terraform, CI/CD Pipelines
- Git, Agile/Scrum, JIRA

[DATABASE]
- SQL, Synapse Analytics`
  },
  experience: {
    title: "Operational History",
    content: `EXL SERVICE | Engineering Manager (2021 - Present)
- Leading Fintech platform team (React, Spring Boot, GraphQL).
- Integrated Power BI metrics with Synapse SQL Pool.

FIGMD | Senior Software Developer (2018 - 2021)
- Developed cross-platform mobile apps (React Native).
- Built CI pipelines and maintained clean architecture.

KRIXI SOLUTIONS | Software Analyst (2017)
- Led healthcare product delivery for Android/Cross-platform.

EDUCO TECHNOLOGY | Software Engineer (2016 - 2017)
- Delivered hybrid mobile apps (PhoneGap, Android SDK).`
  },
  projects: {
    title: "Classified Projects",
    content: `PROJECT: PAYPAL EDQ
- Built UX and React components for data quality dashboard.

PROJECT: RIVIAN BI DASHBOARD
- Sole developer of full-stack analytics application.

PROJECT: MAKEMYTRIP HOLIDAY AMBASSADOR
- Referral and rewards mobile application.

PROJECT: KARE NURSE APP
- Streamlined hospital workflows via barcode scanning.

PROJECT: LOKAL APP
- Location-based service discovery platform.`
  },
  github: {
    title: "External Intelligence: GitHub",
    content: `SOURCE: github.com/AndroConsis/

REPOSITORIES:
- Consistenza Technologies Repos
- Mobile App Frameworks
- Full-stack Architectures

The subject maintains a significant presence in the open-source community, focusing on mobile frameworks and scalable backend solutions.`
  },
  credentials: {
    title: "Verified Credentials",
    content: `[CERTIFICATIONS]
- AWS Certified Cloud Practitioner (Valid until Dec 2027)
- Java and Spring Framework - Udemy
- Android Development Training - Seed Infotech

[EDUCATION]
- B.Tech/B.E. - Rajasthan Technical University, Jaipur`
  },
  contact: {
    title: "Establish Communication",
    content: `SUBJECT: Prateek Rathore
ROLE: Engineering Manager
LOCATION: Pune, India

[DIRECT CHANNELS]
- Email: p.rathore.2903@gmail.com
- Phone: +91-9527053469
- LinkedIn: in.linkedin.com/in/prateek-rathore
- Web: socialprateek.com
- GitHub: github.com/AndroConsis/

The subject is available for strategic consultations and engineering leadership opportunities.

INITIATE_HANDSHAKE: [SECURE]`
  }
};

export default function Scene() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [clickData, setClickData] = useState({ count: 0, lastX: 0, lastY: 0 });
  const [destructState, setDestructState] = useState<'stable' | 'warning' | 'blast' | 'destroyed'>('stable');

  const handleItemClick = (id: string) => {
    if (destructState === 'destroyed') return;
    setActiveId(id);
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    if (destructState === 'destroyed' || destructState === 'blast') return;

    const { clientX, clientY } = e;
    const dist = Math.sqrt(Math.pow(clientX - clickData.lastX, 2) + Math.pow(clientY - clickData.lastY, 2));

    if (dist < 30) {
      const newCount = clickData.count + 1;
      if (newCount >= 4) {
        triggerSelfDestruct();
      } else if (newCount === 3) {
        setDestructState('warning');
      }
      setClickData({ count: newCount, lastX: clientX, lastY: clientY });
    } else {
      setClickData({ count: 1, lastX: clientX, lastY: clientY });
      if (destructState === 'warning') setDestructState('stable');
    }
  };

  const triggerSelfDestruct = () => {
    setDestructState('blast');
    setActiveId(null);
    setTimeout(() => {
      setDestructState('destroyed');
    }, 2000);
  };

  return (
    <div 
      className="w-full h-screen relative bg-[#050505] cursor-crosshair"
      onClick={handleGlobalClick}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={15} 
          minDistance={5}
          autoRotate={destructState === 'stable'}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={destructState === 'destroyed' ? 0.01 : 0.2} />
        <pointLight position={[10, 10, 10]} intensity={destructState === 'blast' ? 5 : 1} />
        
        <Stars radius={100} depth={50} count={destructState === 'destroyed' ? 100 : 5000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <AnimatePresence>
            {destructState !== 'destroyed' && (
              <group>
                <group position={[0, 0, 0]}>
                  <EvidenceItem 
                    id="summary" 
                    title="PROFILE" 
                    position={[-3, 2, 0]} 
                    onClick={handleItemClick} 
                    type="sphere"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                  <EvidenceItem 
                    id="skills" 
                    title="ARSENAL" 
                    position={[3, 2, 0]} 
                    onClick={handleItemClick} 
                    type="box"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                  <EvidenceItem 
                    id="experience" 
                    title="HISTORY" 
                    position={[-3, -2, 0]} 
                    onClick={handleItemClick} 
                    type="torus"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                  <EvidenceItem 
                    id="projects" 
                    title="PROJECTS" 
                    position={[3, -2, 0]} 
                    onClick={handleItemClick} 
                    type="box"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                  <EvidenceItem 
                    id="github" 
                    title="GITHUB_INTEL" 
                    position={[0, -4, 0]} 
                    onClick={handleItemClick} 
                    type="sphere"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                  <EvidenceItem 
                    id="credentials" 
                    title="CREDENTIALS" 
                    position={[0, 4, 0]} 
                    onClick={handleItemClick} 
                    type="torus"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                  <EvidenceItem 
                    id="contact" 
                    title="COMMUNICATION" 
                    position={[0, 0, 3]} 
                    onClick={handleItemClick} 
                    type="sphere"
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"}
                  />
                </group>
                
                {/* Central Core */}
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[1.5, 64, 64]} />
                  <MeshWobbleMaterial 
                    color={destructState === 'warning' ? '#ff0000' : "#00ff41"} 
                    factor={destructState === 'warning' ? 2 : 0.5} 
                    speed={destructState === 'warning' ? 5 : 1} 
                    wireframe 
                    opacity={0.3} 
                    transparent 
                  />
                </mesh>
              </group>
            )}
          </AnimatePresence>
        </Suspense>

        <Environment preset="night" />
        <fog attach="fog" args={['#050505', 5, 20]} />
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h1 
          className={`text-4xl font-mono font-bold tracking-tighter glitch-text ${destructState === 'warning' || destructState === 'blast' ? 'text-red-500' : 'text-emerald-500'}`} 
          data-text={destructState === 'destroyed' ? 'SYSTEM_OFFLINE' : destructState === 'warning' ? 'CRITICAL_BREACH' : 'ARCHIVE_ACCESS'}
        >
          {destructState === 'destroyed' ? 'SYSTEM_OFFLINE' : destructState === 'warning' ? 'CRITICAL_BREACH' : 'ARCHIVE_ACCESS'}
        </h1>
        <p className={`text-xs font-mono mt-2 ${destructState === 'warning' || destructState === 'blast' ? 'text-red-500/50' : 'text-emerald-500/50'}`}>
          {destructState === 'destroyed' ? 'DATA_PURGED' : `SUBJECT: ANDROCONSIS // STATUS: ${destructState === 'warning' ? 'SELF_DESTRUCT_INITIATED' : 'CLASSIFIED'}`}
        </p>
      </div>

      <AnimatePresence>
        {destructState === 'warning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-red-500/10"
          >
            <div className="text-red-500 font-mono text-2xl animate-pulse border-2 border-red-500 p-4 bg-black/80">
              WARNING: REPEATED UNAUTHORIZED ATTEMPTS DETECTED. <br/>
              INITIATING SYSTEM PURGE IN 3... 2... 1...
            </div>
          </motion.div>
        )}
        
        {destructState === 'blast' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            <div className="w-20 h-20 bg-white rounded-full blur-3xl" />
          </motion.div>
        )}

        {destructState === 'destroyed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="text-emerald-500/20 font-mono text-sm space-y-2 text-center">
              <p>NO DATA FOUND</p>
              <p className="text-[10px]">CONNECTION TERMINATED BY HOST</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors pointer-events-auto"
              >
                RE-ESTABLISH CONNECTION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 z-10 text-right pointer-events-none">
        <p className="text-[10px] font-mono text-emerald-500/30 uppercase leading-tight">
          Neural Link: {destructState === 'destroyed' ? 'LOST' : 'ESTABLISHED'}<br />
          Decryption Engine: {destructState === 'destroyed' ? 'OFFLINE' : 'ACTIVE'}<br />
          Location: [REDACTED]
        </p>
      </div>

      <SystemLog />

      <Terminal 
        isOpen={!!activeId} 
        onClose={() => setActiveId(null)} 
        title={activeId ? DATA[activeId as keyof typeof DATA].title : ''}
        content={activeId ? DATA[activeId as keyof typeof DATA].content : ''}
      />

      {/* Hint */}
      {destructState === 'stable' && !activeId && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
        >
          <p className="text-xs font-mono text-emerald-500/40 animate-pulse">
            INTERACT WITH DATA NODES TO EXTRACT INFORMATION
          </p>
        </motion.div>
      )}
    </div>
  );
}
