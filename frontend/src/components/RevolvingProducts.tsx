import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './RevolvingProducts.css';

interface StickerProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
}

const STICKER_PRODUCTS: StickerProduct[] = [
  { id: 'ps-1', name: 'Polishing Pad', slug: 'concrete-polishing-system-120cm', image: '/brochure-images/diamond_pad.png' },
  { id: 'ch-1', name: 'Densifier', slug: 'concrete-densifier', image: '/brochure-images/ai_chemical_jug.png' },
  { id: 'ac-1', name: 'Edge Grinder', slug: 'edge-grinding-machine', image: '/brochure-images/ai_edge_grinding_machine.png' },
  { id: 'ac-2', name: 'Scrubber', slug: 'ride-on-scrubber-dryer', image: '/brochure-images/ai_ride_on_scrubber.png' },
  { id: 'ac-4', name: 'Vacuum', slug: 'vacuum-cleaner', image: '/brochure-images/ai_industrial_vacuum.png' },
  { id: 'ac-8', name: 'Burnisher', slug: 'burnishing-machine', image: '/brochure-images/ai_burnishing_machine.png' },
  { id: 'ac-6', name: 'Sprayer', slug: 'chemical-sprayer', image: '/brochure-images/ai_chemical_sprayer.png' },
  { id: 'ac-3', name: 'Auto Scrubber', slug: 'auto-scrubber-dryer', image: '/brochure-images/ai_auto_scrubber.png' },
];

// ─── Tuning Constants ────────────────────────────────────────────────────────
const SCROLL_SPEED = 0.5;   // slots per second during free scroll
const ORBIT_R_DESK = 550;   // orbit radius – desktop (larger to prevent collision)
const ORBIT_R_MOB = 300;   // orbit radius – mobile
// ─────────────────────────────────────────────────────────────────────────────

interface ProductVisual {
  x: number;       // px horizontal offset
  y: number;       // px vertical offset
  z: number;       // depth hint (larger = closer)
  scale: number;
  opacity: number;
  zIndex: number;
  isDocked: boolean;
}

const RevolvingProducts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visuals, setVisuals] = useState<ProductVisual[]>([]);

  const scrollRef = useRef(0);          // continuous scroll position (slot units)
  const rafRef = useRef<number>(0);
  const lastTRef = useRef<number>(0);

  const products = isMobile ? STICKER_PRODUCTS.slice(0, 6) : STICKER_PRODUCTS;
  const count = products.length;
  const orbitR = isMobile ? ORBIT_R_MOB : ORBIT_R_DESK;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const tick = useCallback((ts: number) => {
    const dt = lastTRef.current ? Math.min((ts - lastTRef.current) / 1000, 0.1) : 0;
    lastTRef.current = ts;

    // Continuous, equal-speed scrolling
    scrollRef.current += SCROLL_SPEED * dt;

    const newVisuals: ProductVisual[] = products.map((_, i) => {
      const offset = i - scrollRef.current;

      // Normalise offset to the shortest path around the wheel (-count/2 to +count/2)
      let o = ((offset % count) + count) % count;
      if (o > count / 2) o -= count;

      // Convert to angle
      const angle = (o * 360) / count;
      const rad = (angle * Math.PI) / 180;

      // Create a 2D Clock Dial orbit on the X-Y plane
      const orbitR = isMobile ? 320 : 500;

      // rad=0 is the 3 o'clock position (rightmost edge of the circle).
      // As angle increases, it moves around the circle.
      const y = Math.sin(rad) * orbitR;
      // Shift X so the docked product (rad=0) is exactly at x=0.
      // Other products will curve out to the left (negative X).
      const x = (Math.cos(rad) - 1) * orbitR;

      // Calculate opacity based on distance from the docked position (o=0).
      // Fade out products as they go around the back of the dial.
      const dist = Math.abs(o);
      let rawOpacity = Math.max(0, 1 - (dist / 2.5));
      let rawScale = 0.45;

      // Dynamic pop-up for the docking frame
      let popFactor = 0;

      if (dist < 0.15) {
        // Stay fully enlarged in the dead center
        popFactor = 1;
      } else if (dist < 0.6) {
        // Smoothly scale up/down as it approaches/leaves the center
        const mappedDist = (dist - 0.15) / 0.45;
        popFactor = Math.cos(mappedDist * (Math.PI / 2));
      }

      // Add the pop factor to the scale (up to +1.0)
      rawScale += popFactor * 1.15;
      // Ensure opacity reaches 1.0 when popped
      rawOpacity = Math.min(1, rawOpacity + popFactor * 0.5);

      return {
        x,
        y,
        z: 0,
        scale: rawScale,
        opacity: rawOpacity,
        zIndex: Math.round(20 - dist * 5) + Math.round(popFactor * 10),
        isDocked: dist < 0.15
      };
    });

    setVisuals(newVisuals);
    rafRef.current = requestAnimationFrame(tick);
  }, [count, products, orbitR]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <div
      className="revolving-orbit"
      style={{ '--orbit-radius': `${orbitR}px` } as React.CSSProperties}
    >
      {/* Background glow */}
      <div className="orbit-glow" />

      {/* 3D Ring has been removed to focus entirely on the metallic separator */}
      
      {/* Metallic separator and dark void that acts as the orbit curve */}
      <div className="orbit-separator" />

      {/* Company logo inside the ring */}
      <div className="orbit-brand-inner">
        <img src="/smart_grits_logo_white_transparent.png" alt="Smart Grits Logo" className="orbit-brand-logo" />
      </div>

      {/* Products — positioned via inline JS-computed styles */}
      {products.map((product, i) => {
        const v = visuals[i];
        if (!v) return null;

        return (
          <div
            key={product.id}
            className={`orbit-item-js ${v.isDocked ? 'is-docked' : ''}`}
            style={{
              // Place this zero-size anchor exactly at the orbit point.
              // .product-sticker uses translate(-50%,-50%) to center itself here.
              left: `calc(50% + ${v.x}px)`,
              top: `calc(50% + ${v.y}px)`,
              // Scale from center so the center stays pinned to the ring
              transform: `scale(${v.scale})`,
              transformOrigin: 'center center',
              opacity: v.opacity,
              zIndex: v.zIndex,
              position: 'absolute',
              width: 0,
              height: 0,
            }}
          >
            <Link
              to={`/products/${product.slug}`}
              className="product-sticker no-cursor-lock"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="sticker-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className="sticker-label">{product.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RevolvingProducts;
