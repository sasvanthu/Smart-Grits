import { useRef, useMemo, useEffect, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sparkles, Trail, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// ─── GPU Particle Dust Field ──────────────────────────────────────────────────
function DustParticles({ count = 600, mouse }) {
  const meshRef = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => new Float32Array(count).map(() => 0.002 + Math.random() * 0.008), [count]);
  const offsets = useMemo(() => new Float32Array(count).map(() => Math.random() * Math.PI * 2), [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += Math.sin(t * speeds[i] + offsets[i]) * 0.003 + mouse.current.x * 0.001;
      pos[i * 3 + 1] += Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.004 + 0.005;
      pos[i * 3 + 2] += Math.sin(t * speeds[i] * 0.5) * 0.002;
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a0b8a0" opacity={0.35} transparent sizeAttenuation />
    </points>
  );
}

// ─── Laser Scanner Effect ─────────────────────────────────────────────────────
function LaserScanner({ active }) {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current || !active) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.x = -15 + (t % 4) * 7.5;
    matRef.current.opacity = active ? 0.7 : 0;
  });

  if (!active) return null;
  return (
    <mesh ref={meshRef} position={[-15, 0, 2]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.08, 20]} />
      <meshBasicMaterial ref={matRef} color="#22c55e" transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── Sparks ───────────────────────────────────────────────────────────────────
function Sparks({ active }) {
  if (!active) return null;
  return (
    <Sparkles
      count={60}
      scale={[3, 2, 2]}
      size={2}
      speed={1.5}
      color="#22c55e"
      position={[0, -1.5, 0]}
      noise={0.5}
    />
  );
}

// ─── Company Logo 3D Display ──────────────────────────────────────────────────
function CompanyLogo3D({ mouse, revealed }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const logoTexture = useTexture('/smart_grits_logo.png');

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Mouse parallax tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.3,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.3,
      0.04
    );

    // Floating bob
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;

    // Rotate tech rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.2;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.3;
      ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dynamic Tech Rings */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
      </group>
      
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.008, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
        <mesh position={[2.4, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[-2.4, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[1.9, 0.02, 16, 100]} />
          <meshStandardMaterial color="#1a1d20" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[4.2, 0.01, 0.01]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[4.2, 0.01, 0.01]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Center Display - Glass backing */}
      <mesh position={[0, 0, -0.1]}>
        <cylinderGeometry args={[1.5, 1.5, 0.05, 64]} />
        <meshPhysicalMaterial 
          color="#000000" 
          metalness={0.9} 
          roughness={0.1} 
          transmission={0.5} 
          thickness={0.5} 
          envMapIntensity={2} 
        />
      </mesh>

      {/* Logo Image */}
      <mesh position={[0, 0.3, 0.05]} castShadow receiveShadow>
        <planeGeometry args={[1.6, 0.7]} />
        <meshStandardMaterial 
          map={logoTexture} 
          transparent 
          opacity={1} 
          metalness={0.3} 
          roughness={0.2} 
          alphaTest={0.05}
        />
      </mesh>
      
      {/* Company Name Text */}
      <Text
        position={[0, -0.5, 0.05]}
        fontSize={0.35}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        fontWeight="black"
        letterSpacing={0.15}
        castShadow
      >
        SMARTGRIT
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#22c55e" 
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </Text>

      {/* Emerald glow from behind */}
      <pointLight color="#22c55e" intensity={2} distance={6} position={[0, 0, -1]} />
      
      {/* Highlight spotlight from front */}
      <spotLight
        position={[0, 0, 4]}
        angle={0.6}
        penumbra={0.8}
        intensity={4}
        color="#ffffff"
        distance={10}
        castShadow
      />
    </group>
  );
}

// ─── Scene Lighting ───────────────────────────────────────────────────────────
function SceneLighting() {
  const rimRef = useRef();
  useFrame(({ clock }) => {
    if (rimRef.current) {
      rimRef.current.intensity = 2.5 + Math.sin(clock.getElapsedTime() * 0.8) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow color="#e8f4ff" />
      <pointLight position={[-4, 3, 2]} intensity={1.5} color="#22c55e" distance={12} />
      <pointLight ref={rimRef} position={[4, -1, -3]} intensity={2.5} color="#22c55e" distance={10} />
      <spotLight position={[0, 8, 3]} angle={0.3} penumbra={0.8} intensity={2} color="#ffffff" castShadow />
      {/* God ray sim - top light shaft */}
      <spotLight position={[-3, 10, 0]} angle={0.15} penumbra={1} intensity={3} color="#f0ffe8" />
    </>
  );
}

// ─── Camera Rig with mouse follow ─────────────────────────────────────────────
function CameraRig({ mouse }) {
  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 1.5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.8 + 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── HUD Brackets (disabled) ─────────────────────────────────────────────────
function HUDOverlay({ visible }) {
  return null;
}

// ─── Cinematic Text Reveal ────────────────────────────────────────────────────
function HeroText() {
  const words1 = ['Industrial', 'Concrete'];
  const words2 = ['Polishing', 'Systems'];

  return (
    <div className="relative group">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"
      />

      <h1 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight uppercase">
        {/* Shadow layers */}
        <div className="absolute top-0 left-0 select-none pointer-events-none" style={{ transform: 'translate(-8px,8px)' }}>
          <span className="block whitespace-nowrap text-primary/20">Industrial Concrete</span>
          <span className="block mt-2 whitespace-nowrap text-[#0f3a1d]/60">Polishing Systems</span>
        </div>
        <div className="absolute top-0 left-0 select-none pointer-events-none" style={{ transform: 'translate(-4px,4px)' }}>
          <span className="block whitespace-nowrap text-primary/40">Industrial Concrete</span>
          <span className="block mt-2 whitespace-nowrap text-[#0f3a1d]/80">Polishing Systems</span>
        </div>

        {/* Main text with word-by-word reveal */}
        <div className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400">
            {words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 2.5 + i * 0.4, duration: 0.8, ease: 'easeOut' }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block whitespace-nowrap mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-green-300">
            {words2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 3.3 + i * 0.4, duration: 0.8, ease: 'easeOut' }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </div>

        {/* Metallic scanning highlight sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ delay: 4, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6 }}
        />
      </h1>
    </div>
  );
}

// ─── Main Cinematic Hero ──────────────────────────────────────────────────────
export default function CinematicHero() {
  const mouse = useRef({ x: 0, y: 0 });
  const bgRef = useRef(null);
  const sectionRef = useRef(null);
  const [phase, setPhase] = useState('dark');   // dark → scanning → revealed
  const [hudVisible, setHudVisible] = useState(false);

  // Phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('scanning'), 400);
    const t2 = setTimeout(() => setPhase('revealed'), 2800);
    const t3 = setTimeout(() => setHudVisible(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Parallax background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        x: mouse.current.x * 12,
        y: mouse.current.y * 8,
        duration: 1.2,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] flex items-center justify-center bg-[#0a0c0e] overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* ── Background Image with cinematic parallax ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          ref={bgRef}
          className="absolute inset-[-5%]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        >
          <video
            src="/video_20260804_133006.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.38 }}
          />
        </motion.div>
        {/* Cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-[#0a0c0e]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0e] via-[#0a0c0e]/60 to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      {/* ── Cinematic dark overlay on initial load ── */}
      <motion.div
        className="absolute inset-0 z-30 bg-black pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
      />

      {/* ── Green laser scan overlay ── */}
      <AnimatePresence>
        {phase === 'scanning' && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-green-400 to-transparent"
              style={{ boxShadow: '0 0 30px 8px rgba(34,197,94,0.5)' }}
              initial={{ left: '-2%' }}
              animate={{ left: '102%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Three.js 3D Canvas (left side) ── */}
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full z-10"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: phase === 'revealed' ? 1 : 0, y: phase === 'revealed' ? 0 : 80 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 1, 6], fov: 42 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <Environment preset="warehouse" />
            <CameraRig mouse={mouse} />

            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
              <CompanyLogo3D mouse={mouse} revealed={phase === 'revealed'} />
            </Float>

            <DustParticles count={500} mouse={mouse} />
            <LaserScanner active={phase === 'scanning'} />
            <Sparks active={phase === 'revealed'} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* ── HUD Overlay ── */}
      <HUDOverlay visible={hudVisible} />

      {/* ── Floating Concrete Dust particles (CSS) ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80 - Math.random() * 120],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* ── Right: Typography block ── */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: 'easeOut' }}
          className="absolute right-6 lg:right-12 xl:right-16 bottom-12 lg:bottom-20 flex flex-col items-end text-right pointer-events-auto"
        >


          <HeroText />

          {/* Decorative corner bracket */}
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-lg pointer-events-none" />
        </motion.div>
      </div>



      {/* ── Bottom fog layer ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-5 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,12,14,0.9) 0%, transparent 100%)' }}
      />
    </section>
  );
}
