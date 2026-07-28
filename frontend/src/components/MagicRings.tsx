import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagicRingsProps {
  color?: string;
  colorTwo?: string;
  ringCount?: number;
  speed?: number;
  attenuation?: number;
  lineThickness?: number;
  baseRadius?: number;
  radiusStep?: number;
  scaleRate?: number;
  opacity?: number;
  blur?: number;
  noiseAmount?: number;
  rotation?: number;
  ringGap?: number;
  fadeIn?: number;
  fadeOut?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  hoverScale?: number;
  parallax?: number;
  clickBurst?: boolean;
}

const MagicRings: React.FC<MagicRingsProps> = ({
  color = "#A855F7",
  colorTwo = "#6366F1",
  ringCount = 6,
  speed = 1,
  attenuation = 10,
  lineThickness = 2,
  baseRadius = 0.35,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  blur = 0,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  parallax = 0.05,
  clickBurst = false,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!followMouse && parallax === 0) return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: hoverScale }}
      whileTap={clickBurst ? { scale: 1.5 } : {}}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ opacity, filter: `blur(${blur}px)` }}
    >
      {/* Background noise approximation using SVG grain */}
      {noiseAmount > 0 && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay z-10"
          style={{ 
            opacity: noiseAmount * 2,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
      )}

      {Array.from({ length: ringCount }).map((_, i) => {
        const radius = (baseRadius + i * radiusStep * ringGap) * 100; // percentage
        const isEven = i % 2 === 0;
        const ringColor = isEven ? color : colorTwo;
        
        return (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0, rotate: rotation }}
            animate={{ 
              scale: [1, 1 + scaleRate, 1],
              opacity: [fadeIn, 1, fadeOut],
              rotate: [rotation, rotation + (isEven ? 360 : -360)],
              x: mousePos.x * 100 * (followMouse ? mouseInfluence : 0) * (i + 1) * parallax,
              y: mousePos.y * 100 * (followMouse ? mouseInfluence : 0) * (i + 1) * parallax
            }}
            transition={{ 
              duration: (10 / speed) - (i * 0.5), // Outer rings rotate slightly slower/differently
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: 2 / speed,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: "easeInOut",
                delay: i * 0.2
              },
              scale: {
                duration: 3 / speed,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: "easeInOut",
                delay: i * 0.3
              }
            }}
            style={{
              position: 'absolute',
              width: `${radius}%`,
              height: `${radius}%`,
              border: `${lineThickness}px solid ${ringColor}`,
              borderRadius: '50%',
              boxShadow: `0 0 ${attenuation}px ${ringColor}, inset 0 0 ${attenuation}px ${ringColor}`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default MagicRings;
