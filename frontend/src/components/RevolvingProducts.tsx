import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './RevolvingProducts.css';

interface StickerProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// Curated list of products with their local brochure images (AI-generated PNGs with transparent-ish backgrounds)
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

const RevolvingProducts = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products = isMobile ? STICKER_PRODUCTS.slice(0, 5) : STICKER_PRODUCTS;
  const count = products.length;

  // Orbit radius - for the large XY arc on the left side
  const orbitRadius = isMobile ? 200 : 400;

  const orbitItems = useMemo(() => {
    return products.map((product, i) => {
      // Calculate delay to perfectly space items along the 40s duration
      const delay = -40 * (i / count);

      return {
        ...product,
        style: {
          '--orbit-radius': `${orbitRadius}px`,
          '--orbit-delay': `${delay}s`,
        } as React.CSSProperties,
      };
    });
  }, [count, orbitRadius, products]);

  return (
    <div className="revolving-orbit">
      {/* Background glow for the central axis */}
      <div className="orbit-glow" />

      {/* 3D Ring */}
      <div className="orbit-ring" />

      {/* Orbiting product stickers */}
      {orbitItems.map((product) => (
        <div
          key={product.id}
          className="orbit-item"
          style={product.style}
        >
          <Link
            to={`/products/${product.slug}`}
            className="product-sticker"
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
      ))}
    </div>
  );
};

export default RevolvingProducts;
