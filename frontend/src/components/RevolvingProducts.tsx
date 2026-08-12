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

// Speed: slots per second
const SCROLL_SPEED = 0.45;

interface ProductVisual {
  y: number;        // vertical offset (px) — products travel up/down
  z: number;        // depth: positive = toward viewer
  scale: number;
  opacity: number;
  zIndex: number;
  isDocked: boolean;
}

const RevolvingProducts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visuals, setVisuals] = useState<ProductVisual[]>([]);

  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const products = isMobile ? STICKER_PRODUCTS.slice(0, 5) : STICKER_PRODUCTS;
  const count = products.length;

  // Orbit radius — vertical loop height
  const orbitR = isMobile ? 280 : 450;

  const tick = useCallback((ts: number) => {
    const dt = lastTRef.current ? Math.min((ts - lastTRef.current) / 1000, 0.1) : 0;
    lastTRef.current = ts;

    scrollRef.current += SCROLL_SPEED * dt;

    const newVisuals: ProductVisual[] = products.map((_, i) => {
      // Normalized offset around the loop
      let o = ((i - scrollRef.current) % count + count) % count;
      if (o > count / 2) o -= count;

      // Convert slot offset → angle (0 = front/center, ±180 = back)
      const angle = (o / count) * 360;
      const rad = (angle * Math.PI) / 180;

      // Vertical loop: y goes up/down, z goes in/out toward viewer
      //  - At angle=0 (front):  y=0, z=+orbitR  → closest to viewer
      //  - At angle=180 (back): y=0, z=-orbitR  → farthest
      const y = Math.sin(rad) * orbitR;
      const z = Math.cos(rad) * orbitR;     // +ve = toward viewer

      // Normalize z from [-orbitR, +orbitR] → [0, 1]
      const zNorm = (z + orbitR) / (2 * orbitR);  // 1 = front, 0 = back

      // Distance from front dock (angle=0)
      const dist = Math.abs(o); // 0 = docked, increases as it moves away

      // Pop zone: within 0.5 slots of front
      const isDocked = dist < 0.15;

      let popFactor = 0;
      if (dist < 0.15) {
        popFactor = 1;
      } else if (dist < 0.6) {
        const t = (dist - 0.15) / 0.45;
        popFactor = Math.cos(t * (Math.PI / 2));
      }

      // Scale: small far away, big when docked
      const baseScale = 0.3 + zNorm * 0.4;          // 0.3 (back) → 0.7 (front)
      const scale = baseScale + popFactor * 1.1;      // pops to ~1.8 at front

      // Opacity: invisible at back, full at front
      const opacity = Math.max(0, zNorm * 1.4 - 0.1);

      return {
        y,
        z,
        scale,
        opacity: Math.min(1, opacity),
        zIndex: Math.round(zNorm * 20) + Math.round(popFactor * 15),
        isDocked,
      };
    });

    setVisuals(newVisuals);
    rafRef.current = requestAnimationFrame(tick);
  }, [count, products, orbitR]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="revolving-orbit"
      style={{ '--orbit-radius': `${orbitR}px` } as React.CSSProperties}
    >
      {/* Subtle ambient glow at the dock position */}
      <div className="orbit-dock-glow" />

      {/* Metallic UI Outline of the dial */}
      <div className="metallic-dial" />

      {/* Rectangular target frame where the product pops up */}
      <div className="orbit-dock-frame"></div>

      {products.map((product, i) => {
        const v = visuals[i];
        if (!v) return null;

        return (
          <div
            key={product.id}
            className={`orbit-item-js ${v.isDocked ? 'is-docked' : ''}`}
            style={{
              // Anchor at the center of the orbit container
              left: '50%',
              top: `calc(50% + ${v.y}px)`,
              transform: `translate(-50%, -50%) scale(${v.scale})`,
              opacity: v.opacity,
              zIndex: v.zIndex,
              position: 'absolute',
            }}
          >
            <Link
              to={`/products/${product.slug}`}
              className="product-sticker no-cursor-lock"
              style={{ pointerEvents: 'auto' }}
            >
              <div className={`sticker-image-wrapper ${v.isDocked ? 'is-docked' : ''}`}>
                <div className="target-corner t-tl" />
                <div className="target-corner t-tr" />
                <div className="target-corner t-bl" />
                <div className="target-corner t-br" />
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className={`sticker-label ${v.isDocked ? 'is-docked' : ''}`}>{product.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RevolvingProducts;
