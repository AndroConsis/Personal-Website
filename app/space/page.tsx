'use client';

import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

// ─── Constants ────────────────────────────────────────────────────────────────

const STATIONS = [
  { id: 'profile',  name: 'PROFILE_HUB',   pos: [250, 60, -600]    as [number, number, number], color: '#00ff41', route: '/space/profile'  },
  { id: 'projects', name: 'PROJECTS_LAB',  pos: [-400, -80, -900]  as [number, number, number], color: '#00aaff', route: '/space/projects' },
  { id: 'skills',   name: 'SKILLS_CORE',   pos: [600, 150, -700]   as [number, number, number], color: '#ff6600', route: '/space/skills'   },
  { id: 'contact',  name: 'CONTACT_RELAY', pos: [-150, 300, -1100] as [number, number, number], color: '#ff00ff', route: '/space/contact'  },
] as const;

type Station = typeof STATIONS[number];

const DOCK_RANGE = 120;
const BASE_SPEED = 25;
const BOOST_SPEED = 80;

// ─── Types ────────────────────────────────────────────────────────────────────

interface HUDStation {
  id: string;
  name: string;
  distance: number;
  color: string;
  arrow: string;
}

interface HUDData {
  speed: number;
  boosting: boolean;
  braking: boolean;
  nearStation: Station | null;
  stations: HUDStation[];
}

// ─── Stars that follow the camera (fixes stars disappearing) ─────────────────

function FollowingStars() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.position.copy(camera.position);
  });
  return (
    <group ref={groupRef}>
      <Stars radius={350} depth={80} count={3500} factor={4} saturation={0} fade speed={0.3} />
    </group>
  );
}

// ─── Milky Way Sky ────────────────────────────────────────────────────────────
// Simulates the Milky Way as seen from inside a galaxy:
//   • Gaussian latitude distribution → dense band that fades to haze at edges
//   • Warm galactic core (yellow-orange) concentrated in one sky direction
//   • Blue-white disk stars in the main band
//   • AdditiveBlending so overlapping particles accumulate into a real glow
//   • Follows the camera so it stays fixed in the sky regardless of movement

function MilkyWaySky() {
  const groupRef = useRef<THREE.Group>(null);

  const { geo, mat } = useMemo(() => {
    // Box-Muller: true gaussian sample
    const gauss = (std: number) => {
      const u = Math.max(1e-7, Math.random());
      return std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
    };

    const R = 480; // sky-sphere radius — stays at camera distance

    // Three layers give depth and realism
    const bandCount = 6000; // tight strip  ±~7°  — the bright "river"
    const hazeCount = 3000; // soft glow    ±~18° — outer fade
    const coreCount = 2500; // bright bulge concentated at lon≈0

    const total = bandCount + hazeCount + coreCount;
    const positions = new Float32Array(total * 3);
    const colors    = new Float32Array(total * 3);
    let n = 0;

    // ── Layer 1: Dense narrow band ──────────────────────────────────────────
    for (let i = 0; i < bandCount; i++, n++) {
      const lon = Math.random() * Math.PI * 2;
      const lat = gauss(0.12);                         // σ ≈ 7° — very tight
      const r   = R * (0.93 + Math.random() * 0.12);

      positions[n * 3]     = r * Math.cos(lat) * Math.cos(lon);
      positions[n * 3 + 1] = r * Math.sin(lat);
      positions[n * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);

      // Blue-white with occasional warm specks (mixed stellar populations)
      const b = 0.12 + Math.random() * 0.38;
      const warm = Math.random() < 0.15 ? 0.18 : 0; // 15% warm stars
      colors[n * 3]     = b * (0.88 + warm);
      colors[n * 3 + 1] = b * (0.92 + warm * 0.3);
      colors[n * 3 + 2] = b * (1.0  - warm * 0.5);
    }

    // ── Layer 2: Wider haze ─────────────────────────────────────────────────
    for (let i = 0; i < hazeCount; i++, n++) {
      const lon = Math.random() * Math.PI * 2;
      const lat = gauss(0.30);                         // σ ≈ 17° — wider glow
      const r   = R * (0.86 + Math.random() * 0.20);

      positions[n * 3]     = r * Math.cos(lat) * Math.cos(lon);
      positions[n * 3 + 1] = r * Math.sin(lat);
      positions[n * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);

      // Dim — individually barely visible, but many together = glow
      const b = 0.04 + Math.random() * 0.12;
      colors[n * 3] = b * 0.85; colors[n * 3 + 1] = b * 0.90; colors[n * 3 + 2] = b;
    }

    // ── Layer 3: Galactic core bulge (lon ≈ 0, warm yellow-orange) ──────────
    for (let i = 0; i < coreCount; i++, n++) {
      const lon = gauss(0.36);                         // concentrated around lon=0
      const lat = gauss(0.10);
      const r   = R * (0.90 + Math.random() * 0.10);

      positions[n * 3]     = r * Math.cos(lat) * Math.cos(lon);
      positions[n * 3 + 1] = r * Math.sin(lat);
      positions[n * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);

      // Warm yellow-orange bulge — the recognisable bright heart of the galaxy
      const b = 0.28 + Math.random() * 0.52;
      colors[n * 3]     = b;           // red: full
      colors[n * 3 + 1] = b * 0.78;   // green: reduced → orange hue
      colors[n * 3 + 2] = b * 0.42;   // blue: low → warm
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending, // particles sum their light → glow
      depthWrite: false,                // no z-fighting artefacts
    });

    return { geo: geometry, mat: material };
  }, []);

  // Move with camera so the sky band is always at the same sky position
  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.position.copy(camera.position);
  });

  // Tilt = galactic plane inclination relative to our scene horizontal
  return (
    <group ref={groupRef} rotation={[Math.PI * 0.52, 0.28, 0.18]}>
      <points>
        <primitive object={geo} attach="geometry" />
        <primitive object={mat} attach="material" />
      </points>
    </group>
  );
}

// ─── Nebula cloud ─────────────────────────────────────────────────────────────

function Nebula({ position, color, radius = 220, count = 500 }: {
  position: [number, number, number];
  color: string;
  radius?: number;
  count?: number;
}) {
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.55) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count, radius]);

  return (
    <points position={position}>
      <primitive object={geo} attach="geometry" />
      <pointsMaterial color={color} size={9} sizeAttenuation transparent opacity={0.10} />
    </points>
  );
}

// ─── Space Station ────────────────────────────────────────────────────────────

function SpaceStation({ station }: { station: Station }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.15 * delta;
  });

  const spokes: { pos: [number, number, number]; rot: [number, number, number] }[] = [
    { pos: [10.5, 0, 0],  rot: [0, 0, Math.PI / 2] },
    { pos: [-10.5, 0, 0], rot: [0, 0, Math.PI / 2] },
    { pos: [0, 10.5, 0],  rot: [0, 0, 0] },
    { pos: [0, -10.5, 0], rot: [0, 0, 0] },
  ];

  return (
    <group ref={groupRef} position={station.pos}>
      <mesh>
        <torusGeometry args={[15, 0.55, 8, 48]} />
        <meshBasicMaterial color={station.color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[6, 16, 16]} />
        <meshBasicMaterial color={station.color} wireframe />
      </mesh>
      {spokes.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <cylinderGeometry args={[0.18, 0.18, 9, 4]} />
          <meshBasicMaterial color={station.color} />
        </mesh>
      ))}
      <pointLight color={station.color} intensity={4} distance={100} />
      <Html position={[0, 24, 0]} center distanceFactor={200}>
        <div
          className="font-mono text-xs tracking-widest whitespace-nowrap pointer-events-none select-none px-2 py-0.5 border"
          style={{ color: station.color, borderColor: station.color + '55', background: '#00000099' }}
        >
          {station.name}
        </div>
      </Html>
    </group>
  );
}

// ─── Spaceship (brighter, more visible) ───────────────────────────────────────

function Spaceship({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={groupRef}>
      {/* Fill light that rides with the ship so it's always visible */}
      <pointLight position={[0, 6, -3]} color="#aabbff" intensity={12} distance={20} decay={2} />

      {/* Main fuselage */}
      <mesh>
        <boxGeometry args={[2, 0.5, 4.5]} />
        <meshStandardMaterial
          color="#3a5c8a"
          emissive="#1a2f50"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Cockpit – bright translucent cyan */}
      <mesh position={[0, 0.38, -0.8]}>
        <boxGeometry args={[1, 0.32, 1.4]} />
        <meshStandardMaterial
          color="#00ddff"
          emissive="#004466"
          emissiveIntensity={1}
          transparent
          opacity={0.75}
          metalness={0.9}
        />
      </mesh>

      {/* Left wing */}
      <mesh position={[-2.2, 0, 0.5]}>
        <boxGeometry args={[1.8, 0.1, 2.6]} />
        <meshStandardMaterial
          color="#2a4a70"
          emissive="#0f1f35"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Right wing */}
      <mesh position={[2.2, 0, 0.5]}>
        <boxGeometry args={[1.8, 0.1, 2.6]} />
        <meshStandardMaterial
          color="#2a4a70"
          emissive="#0f1f35"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Engine cone (tip points backward) */}
      <mesh position={[0, 0, 2.7]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.6, 1.8, 8]} />
        <meshStandardMaterial
          color="#0055ff"
          emissive="#3377ff"
          emissiveIntensity={4}
        />
      </mesh>

      {/* Engine exhaust glow */}
      <pointLight position={[0, 0, 3.5]} color="#5599ff" intensity={4} distance={12} decay={2} />
    </group>
  );
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────

interface SpaceSceneProps {
  keysRef: React.MutableRefObject<Set<string>>;
  onHUDUpdate: (data: HUDData) => void;
  onDock: (route: string) => void;
  flashing: boolean;
}

function SpaceScene({ keysRef, onHUDUpdate, onDock, flashing }: SpaceSceneProps) {
  const shipRef = useRef<THREE.Group>(null);
  const yawRef   = useRef(0);
  const pitchRef = useRef(0);
  const speedRef = useRef(0);
  const isDockingRef = useRef(false);

  // Pre-allocated scratch objects (avoid GC per frame)
  const _euler     = useMemo(() => new THREE.Euler(0, 0, 0, 'YXZ'), []);
  const _forward   = useMemo(() => new THREE.Vector3(), []);
  const _offset    = useMemo(() => new THREE.Vector3(), []);
  const _camTarget = useMemo(() => new THREE.Vector3(), []);
  const _lookAt    = useMemo(() => new THREE.Vector3(), []);
  const _toSt      = useMemo(() => new THREE.Vector3(), []);
  const _shipRight = useMemo(() => new THREE.Vector3(), []);
  const _shipUp    = useMemo(() => new THREE.Vector3(), []);
  const stationVecs = useMemo(() => STATIONS.map(s => new THREE.Vector3(...s.pos)), []);

  // Asteroid field
  const asteroids = useMemo(() =>
    Array.from({ length: 120 }, () => ({
      position: [
        (Math.random() - 0.5) * 2400,
        (Math.random() - 0.5) * 900,
        -60 - Math.random() * 1150,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 3.5,
      rx: (Math.random() - 0.5) * 0.6,
      ry: (Math.random() - 0.5) * 0.6,
    })), []);

  const asteroidRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!shipRef.current || flashing) return;

    const keys = keysRef.current;
    const rotSpeed = 0.9 * delta;

    if (keys.has('a') || keys.has('arrowleft'))  yawRef.current   += rotSpeed;
    if (keys.has('d') || keys.has('arrowright')) yawRef.current   -= rotSpeed;
    if (keys.has('w') || keys.has('arrowup'))    pitchRef.current  = Math.max(pitchRef.current - rotSpeed, -Math.PI / 2.1);
    if (keys.has('s') || keys.has('arrowdown'))  pitchRef.current  = Math.min(pitchRef.current + rotSpeed,  Math.PI / 2.1);

    const boosting = keys.has('shift');
    const braking  = keys.has(' ');
    const maxSpeed = boosting ? BOOST_SPEED : BASE_SPEED;

    if (braking) {
      speedRef.current = Math.max(0, speedRef.current - 100 * delta);
    } else {
      speedRef.current = Math.min(maxSpeed, speedRef.current + 35 * delta);
    }

    // Apply rotation
    _euler.set(pitchRef.current, yawRef.current, 0);
    shipRef.current.quaternion.setFromEuler(_euler);

    // Forward vector (-Z in local space)
    _forward.set(0, 0, -1).applyQuaternion(shipRef.current.quaternion);

    // Move ship
    shipRef.current.position.addScaledVector(_forward, speedRef.current * delta);

    // Smooth camera follow
    _offset.set(0, 6, 20).applyQuaternion(shipRef.current.quaternion);
    _camTarget.copy(shipRef.current.position).add(_offset);
    state.camera.position.lerp(_camTarget, 0.08);
    _lookAt.copy(shipRef.current.position).addScaledVector(_forward, 60);
    state.camera.lookAt(_lookAt);

    // Directional arrow helpers
    _shipRight.set(1, 0, 0).applyQuaternion(shipRef.current.quaternion);
    _shipUp.set(0, 1, 0).applyQuaternion(shipRef.current.quaternion);

    // Station proximity + arrows
    let nearStation: Station | null = null;
    const hudStations: HUDStation[] = STATIONS.map((s, i) => {
      const dist = shipRef.current!.position.distanceTo(stationVecs[i]);
      if (dist < DOCK_RANGE) nearStation = s;

      _toSt.copy(stationVecs[i]).sub(shipRef.current!.position).normalize();
      const rx = _toSt.dot(_shipRight);
      const ry = _toSt.dot(_shipUp);
      const rf = _toSt.dot(_forward);

      let arrow: string;
      if (dist < DOCK_RANGE) {
        arrow = '◎';
      } else if (Math.abs(rx) > Math.abs(ry) && Math.abs(rx) > 0.3) {
        arrow = rx > 0 ? '→' : '←';
      } else if (Math.abs(ry) > 0.3) {
        arrow = ry > 0 ? '↑' : '↓';
      } else {
        arrow = rf > 0 ? '●' : '○';
      }

      return { id: s.id, name: s.name, distance: Math.round(dist), color: s.color, arrow };
    });

    // Docking
    if (keys.has('e') && nearStation && !isDockingRef.current) {
      isDockingRef.current = true;
      onDock((nearStation as Station).route);
    }

    // Spin asteroids
    for (let i = 0; i < asteroidRefs.current.length; i++) {
      const mesh = asteroidRefs.current[i];
      if (mesh) {
        mesh.rotation.x += asteroids[i].rx * delta;
        mesh.rotation.y += asteroids[i].ry * delta;
      }
    }

    onHUDUpdate({
      speed: Math.round(speedRef.current),
      boosting,
      braking,
      nearStation,
      stations: hudStations,
    });
  });

  return (
    <>
      {/* Stars always surrounding the player */}
      <FollowingStars />

      {/* Milky Way sky band */}
      <MilkyWaySky />

      {/* Nebula clouds at strategic positions */}
      <Nebula position={[-700, 120, -1300]} color="#3355ff" radius={260} count={550} />
      <Nebula position={[850, -180, -1800]} color="#ff3366" radius={210} count={450} />
      <Nebula position={[-100, 380, -650]}  color="#8833ff" radius={170} count={380} />

      {/* Ambient + key lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[80, 100, 40]}  intensity={0.9} color="#ffffff" />
      <directionalLight position={[-60, -40, 100]} intensity={0.2} color="#4466bb" />

      {/* Spaceship */}
      <Spaceship groupRef={shipRef} />

      {/* Asteroid field */}
      {asteroids.map((a, i) => (
        <mesh
          key={i}
          ref={el => { asteroidRefs.current[i] = el; }}
          position={a.position}
          scale={a.scale}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#2a1f0e" roughness={1} metalness={0} />
        </mesh>
      ))}

      {/* Stations */}
      {STATIONS.map(s => (
        <SpaceStation key={s.id} station={s} />
      ))}
    </>
  );
}

// ─── Controls key badge ───────────────────────────────────────────────────────

function KeyBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center px-1 min-w-[20px] h-[18px] border border-emerald-500/30 text-[9px] font-mono text-emerald-400/70 rounded-sm bg-emerald-500/5">
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SpacePage() {
  const [loading, setLoading]       = useState(true);
  const [progress, setProgress]     = useState(0);
  const [hud, setHud]               = useState<HUDData>({ speed: 0, boosting: false, braking: false, nearStation: null, stations: [] });
  const [flashing, setFlashing]     = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const flashRoute = useRef('');
  const keysRef = useRef<Set<string>>(new Set());
  const router = useRouter();

  // Loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 350);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 22);
      });
    }, 110);
    return () => clearInterval(timer);
  }, []);

  // Tutorial auto-dismiss
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setShowTutorial(false), 7000);
    return () => clearTimeout(t);
  }, [loading]);

  // Keyboard tracking
  useEffect(() => {
    const preventKeys = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ']);
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);
      if (preventKeys.has(key)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase());
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const handleHUDUpdate = useCallback((data: HUDData) => setHud(data), []);

  const handleDock = useCallback((route: string) => {
    flashRoute.current = route;
    setFlashing(true);
    setTimeout(() => router.push(route), 420);
  }, [router]);

  const nearStation   = hud.nearStation;
  const sortedStations = [...hud.stations].sort((a, b) => a.distance - b.distance);

  // Speed bar (0–100%)
  const speedPct = Math.round((hud.speed / BOOST_SPEED) * 100);
  const speedColor = hud.braking ? '#ff4444' : hud.boosting ? '#ffcc00' : '#00ff41';

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">

      {/* ── Loading screen ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-8"
          >
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2">
                <h2 className="text-emerald-500 font-mono text-sm tracking-widest uppercase animate-pulse">
                  INITIALIZING HYPERDRIVE...
                </h2>
                <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-emerald-500/40 uppercase">
                <div className="space-y-1">
                  <p>Calibrating nav systems...</p>
                  <p>Loading star charts...</p>
                  <p>Charging thrusters...</p>
                </div>
                <div className="space-y-1 text-right">
                  <p>{progress.toFixed(0)}% Complete</p>
                  <p>Sector: DEEP_SPACE</p>
                  <p>Status: {progress < 100 ? 'Standby' : 'Ready'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3D Canvas ── */}
      {!loading && (
        // far=10000 so the distant galaxy at z=-4800 is always visible
        <Canvas camera={{ position: [0, 6, 20], fov: 60, near: 0.1, far: 10000 }}>
          <SpaceScene
            keysRef={keysRef}
            onHUDUpdate={handleHUDUpdate}
            onDock={handleDock}
            flashing={flashing}
          />
        </Canvas>
      )}

      {/* ── HUD ── */}
      {!loading && (
        <div className="fixed inset-0 pointer-events-none z-10 font-mono select-none">

          {/* Speed – top left */}
          <div className="absolute top-6 left-6 space-y-1.5">
            <p className="text-[9px] tracking-widest uppercase" style={{ color: speedColor + '70' }}>VELOCITY</p>
            <p className="text-2xl leading-none font-bold" style={{ color: speedColor }}>
              {hud.speed}
              <span className="text-sm font-normal ml-1" style={{ color: speedColor + '80' }}>u/s</span>
            </p>
            {/* Speed bar */}
            <div className="w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{ width: `${speedPct}%`, background: speedColor }}
              />
            </div>
            {/* Mode badge */}
            {hud.boosting && (
              <p className="text-[10px] tracking-widest animate-pulse font-bold" style={{ color: '#ffcc00' }}>
                ⚡ BOOST
              </p>
            )}
            {hud.braking && (
              <p className="text-[10px] tracking-widest animate-pulse font-bold" style={{ color: '#ff4444' }}>
                ◼ BRAKING
              </p>
            )}
          </div>

          {/* Back to home – top right */}
          <Link
            href="/"
            className="absolute top-6 right-6 text-[10px] text-emerald-500/50 hover:text-emerald-500 tracking-widest uppercase border border-emerald-500/20 hover:border-emerald-500/50 px-3 py-1.5 transition-colors pointer-events-auto bg-black/50"
          >
            ← HOME
          </Link>

          {/* Crosshair – center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-10 h-10">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/35" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-500/35" />
              <div className="absolute inset-[28%] border border-emerald-500/55 rounded-sm" />
            </div>
          </div>

          {/* Station waypoints – top right (below back button) */}
          <div className="absolute top-16 right-6 mt-2 space-y-2 text-right">
            <p className="text-[9px] text-white/20 tracking-widest uppercase mb-3">STATIONS</p>
            {sortedStations.map(s => (
              <div key={s.id} className="flex items-center justify-end gap-2">
                <span className="text-[9px] text-white/40">{s.distance}u</span>
                <span className="text-[10px] tracking-widest" style={{ color: s.color + 'cc' }}>
                  {s.name}
                </span>
                <span className="text-sm w-5 text-center" style={{ color: s.color }}>
                  {s.arrow}
                </span>
              </div>
            ))}
          </div>

          {/* DOCK prompt – bottom center */}
          <AnimatePresence>
            {nearStation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
              >
                <p
                  className="text-sm tracking-widest uppercase border px-6 py-2 bg-black/80 animate-pulse"
                  style={{ color: nearStation.color, borderColor: nearStation.color + '77' }}
                >
                  DOCK [E] — {nearStation.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls legend – bottom left */}
          <div className="absolute bottom-6 left-6 space-y-2">
            <p className="text-[9px] text-white/20 tracking-widest uppercase mb-1">FLIGHT CONTROLS</p>
            {[
              { keys: ['W', 'S', '↑', '↓'], label: 'Pitch' },
              { keys: ['A', 'D', '←', '→'], label: 'Yaw' },
              { keys: ['SHIFT'], label: 'Boost', color: '#ffcc00' },
              { keys: ['SPACE'], label: 'Brake', color: '#ff6644' },
              { keys: ['E'],     label: 'Dock',  color: '#00aaff' },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-2">
                <div className="flex gap-1">
                  {row.keys.map(k => <KeyBadge key={k} label={k} />)}
                </div>
                <span
                  className="text-[9px] tracking-wider"
                  style={{ color: row.color ?? '#00ff4166' }}
                >
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tutorial overlay (auto-dismisses after 7s) ── */}
      <AnimatePresence>
        {!loading && showTutorial && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center space-y-3 p-6 border border-emerald-500/20 bg-black/70 rounded-lg max-w-sm">
              <p className="text-emerald-500 font-mono text-xs tracking-widest uppercase animate-pulse">
                NAVIGATION SYSTEMS ONLINE
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-emerald-500/70">
                <p>← → or A D  —  Turn left / right</p>
                <p>↑ ↓ or W S  —  Pitch up / down</p>
                <p>SHIFT  —  Boost engines  ⚡</p>
                <p>SPACE  —  Emergency brake  ◼</p>
                <p>E  —  Dock when near a station</p>
              </div>
              <p className="text-[9px] text-emerald-500/30 tracking-widest uppercase">
                Fly toward a station to explore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Flash transition overlay ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: flashing ? 1 : 0 }}
        transition={{ duration: 0.42 }}
        className="fixed inset-0 bg-white z-[500] pointer-events-none"
      />
    </div>
  );
}
