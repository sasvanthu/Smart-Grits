import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Factory, Award, CheckCircle } from 'lucide-react';
import { CATEGORIES, CLIENTS, POLISHED_CONCRETE } from '../data/brochureData';
import { useState, useEffect } from 'react';
import ScrollStackSection from '../components/ScrollStackSection';
import RevolvingProducts from '../components/RevolvingProducts';

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  categories: { name: string } | null;
  product_images?: { image_url: string }[];
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<DbProduct[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedProducts(data.filter((p: any) => p.is_featured).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      }
    };
    fetchFeatured();
  }, []);
  const { scrollYProgress } = useScroll();
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <div className="w-full relative overflow-x-hidden">
      {/* Fixed Energy Beam */}
      <div className="fixed top-0 bottom-0 left-2 md:left-8 w-px z-40 pointer-events-none opacity-50 md:opacity-100">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent"></div>
        <motion.div 
          style={{ height: beamHeight }}
          className="absolute top-0 w-full bg-gradient-to-b from-transparent via-primary to-green-400 origin-top shadow-[0_0_20px_2px_rgba(34,197,94,0.6)]"
        ></motion.div>
        <motion.div
          style={{ top: beamHeight }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_15px_4px_rgba(34,197,94,1)]"
        />
      </div>
      <ScrollStackSection index={1} className="bg-neutral-900">
        {/* Hero Section */}
        <section
          className="relative h-[100dvh] pt-24 pb-12 min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
          style={{ perspective: '2000px' }}
        >
          <div className="absolute top-0 bottom-0 left-0 right-0 z-0">
            <video 
              src="/video_20260804_142213.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/30 to-transparent md:block hidden"></div>
          </div>

          {/* Left Container — Revolving Product Stickers */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ perspective: '2000px' }}>
            <RevolvingProducts />
          </div>

          {/* Text Container aligned bottom right */}
          <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
            {/* Right: High-Tech Typography Block (Bottom Right on Desktop, Bottom Center on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="absolute bottom-12 md:bottom-20 left-1/2 md:left-auto right-auto md:right-6 lg:right-12 xl:right-16 -translate-x-1/2 md:translate-x-0 flex flex-col items-center md:items-end text-center md:text-right pointer-events-auto w-full px-4 md:px-0"
            >
              {/* HUD Decoration */}
              <div className="flex items-center gap-3 mb-6 opacity-80">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-primary"></div>
                <span className="font-mono text-xs tracking-[0.4em] text-green-300 uppercase filter drop-shadow-[0_0_5px_rgba(34,197,94,1)]">
                  [ INIT_SYS_READY ]
                </span>
              </div>

              {/* Permanent Static 3D Text Container */}
              <div className="relative group">
                {/* Floating Ambient Glow */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"
                />

                <h1 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight uppercase">
                  {/* Static Heavy Offset Drop Shadow Text */}
                  <div
                    className="absolute top-0 left-0 text-primary/10 select-none pointer-events-none"
                    style={{ transform: 'translate(-8px, 8px)' }}
                  >
                    <span className="block whitespace-nowrap text-primary/20">Industrial Concrete</span>
                    <span className="block mt-2 whitespace-nowrap text-[#0f3a1d]/60">Polishing Systems</span>
                  </div>

                  <div
                    className="absolute top-0 left-0 text-primary/10 select-none pointer-events-none"
                    style={{ transform: 'translate(-4px, 4px)' }}
                  >
                    <span className="block whitespace-nowrap text-primary/40">Industrial Concrete</span>
                    <span className="block mt-2 whitespace-nowrap text-[#0f3a1d]/80">Polishing Systems</span>
                  </div>

                  {/* Main Foreground Text */}
                  <div className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400">
                      Industrial Concrete
                    </span>
                    <span className="block whitespace-nowrap mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-green-300 filter drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      Polishing Systems
                    </span>
                  </div>
                </h1>
              </div>

              {/* Decorative Corner Bracket */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-lg pointer-events-none"></div>
            </motion.div>
          </div>
        </section>
      </ScrollStackSection>

      <ScrollStackSection index={2} className="bg-white">
        <div className="flex flex-col min-h-screen">
          {/* Stats Strip */}
          <section className="bg-primary py-8 shrink-0 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 origin-left"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
                {[
                  { value: '11+', label: 'Years of R&D' },
                  { value: '1000+', label: 'm² per day coverage' },
                  { value: '12+', label: 'Marquee Clients' },
                  { value: '3', label: 'Finish Types' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black">{stat.value}</div>
                    <div className="text-sm font-medium opacity-80 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Teaser */}
          <section className="py-12 md:py-20 flex-grow flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
              <motion.div initial={{ opacity: 0, x: -30, rotateX: 15, z: -50 }} whileInView={{ opacity: 1, x: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.8, type: "spring" }} viewport={{ once: true, margin: "-50px" }} style={{ transformStyle: "preserve-3d" }}>
                <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Who We Are</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark uppercase tracking-wider mb-4">
                  SmartGrit Polishing System
                </h2>
                <div className="w-24 h-1 bg-primary mb-6"></div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  SmartGrit Polishing System is a joint venture between Kleanmax (Concrete Polishing Tools) and EM&TS (Industrial Flooring Consultants). Founded in 2012, we have over 11 years of R&D in abrasive products.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our revolutionary technology allows users to achieve an outstanding concrete finish in fewer steps — and at a lower cost — than with traditional finishing methods. We offer Ride On Trowel Wet Polishing Systems for industrial concrete flooring.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {['Affordable', 'Durable', 'Non-Slip', 'Low Maintenance', 'Reflective', 'Dust Free'].map((prop, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-dark">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {prop}
                    </div>
                  ))}
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-dark font-bold uppercase tracking-wider hover:text-primary transition-colors">
                  Learn More About Us <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30, rotateY: 15, z: -50 }} whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.8, type: "spring" }} viewport={{ once: true, margin: "-50px" }} style={{ transformStyle: "preserve-3d" }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 transform translate-x-4 translate-y-4 rounded-3xl -z-10"></div>
                  <img
                    src="/brochure-images/ai_walk_behind_trowel.png"
                    alt="KIA Motors — SmartGrit Polished Concrete Floor"
                    className="w-full h-64 sm:h-80 lg:h-[550px] object-cover rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </ScrollStackSection>

      {/* Why Choose SmartGrit */}
      <ScrollStackSection index={3} className="bg-gray-50">
        <section className="py-12 md:py-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Our Edge</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark uppercase tracking-wider mb-4">Why Choose SmartGrit</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[2000px]">
              {[
                { icon: Factory, title: 'Make in India', desc: 'Products made from high-quality hard resin bond and qualified diamonds. Proudly manufactured in India with world-class materials.' },
                { icon: ShieldCheck, title: 'Premium Quality', desc: 'Over 11 years of R&D in abrasive products. Excellent results with high shine, long life and low cost. Dry and wet polishing compatible.' },
                { icon: Award, title: 'Technical Support', desc: 'On-site technical support and consultation. We supply, distribute and support across all of India for every project.' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className="p-8 rounded-2xl border border-gray-100 bg-white group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 relative overflow-hidden transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-[0_10px_20px_-5px_rgba(34,197,94,0.5)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4 uppercase tracking-wide group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollStackSection>

      {/* Product Categories */}
      <ScrollStackSection index={4} className="bg-dark">
        <section className="py-12 md:py-20 w-full text-white min-h-[100dvh] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
              <div>
                <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">What We Offer</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4">Product Categories</h2>
                <div className="w-24 h-1 bg-primary"></div>
              </div>
              <Link to="/products" className="hidden md:flex items-center text-white font-semibold hover:text-primary transition-colors">
                View All Products <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[2000px]">
              {CATEGORIES.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9, rotateX: -15, z: -50 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className="group relative h-80 rounded-2xl overflow-hidden bg-dark border border-gray-700 cursor-pointer hover:border-primary/50 hover:shadow-[0_20px_50px_-10px_rgba(34,197,94,0.3)] transition-all duration-500 z-0 hover:z-10 transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors drop-shadow-md">{cat.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.description}</p>
                    <Link
                      to={`/products?category=${cat.slug}`}
                      className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-wider hover:text-white transition-colors bg-primary/20 hover:bg-primary px-4 py-2 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500 delay-150"
                    >
                      View Products <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollStackSection>

      {/* Featured Products */}
      <ScrollStackSection index={5} className="bg-gray-50">
        <section className="py-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Our Products</p>
              <h2 className="text-3xl font-bold text-dark uppercase tracking-wider mb-4">Featured Products</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[2000px]">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, type: "spring", stiffness: 100 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                  <div className="relative overflow-hidden h-56 bg-gray-100">
                    <img
                      src={product.product_images?.[0]?.image_url || 'https://via.placeholder.com/800x800'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x800';
                      }}
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-dark uppercase tracking-wider shadow-sm">
                      {product.categories?.name || 'Product'}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-dark mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">{product.description}</p>
                    <Link
                      to={`/products/${product.slug}`}
                      className="flex justify-center items-center gap-2 w-full rounded-xl border-2 border-primary/20 bg-primary/5 text-primary text-sm font-bold py-3 uppercase tracking-wider hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_10px_20px_-10px_rgba(34,197,94,0.6)] transition-all duration-300"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/products" className="inline-flex items-center gap-2 bg-dark text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary transition-colors">
                View All Products <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollStackSection>

      {/* Applications */}
      <ScrollStackSection index={6} className="bg-white">
        <section className="py-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Where We Work</p>
              <h2 className="text-3xl font-bold text-dark uppercase tracking-wider mb-4">Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 perspective-[2000px]">
              {POLISHED_CONCRETE.applications.map((app: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -15, z: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 30 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, type: "spring", stiffness: 100 }}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:border-primary/50 transition-all duration-300 group text-center relative overflow-hidden transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <p className="font-bold text-dark group-hover:text-primary text-sm uppercase tracking-wide transition-colors">{app}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/applications" className="inline-flex items-center gap-2 text-dark font-bold uppercase tracking-wider hover:text-primary transition-colors">
                Explore All Services <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollStackSection>

      {/* Clients & CTA Combined into final stack section */}
      <ScrollStackSection index={7} className="bg-gray-50">
        <div className="flex flex-col min-h-screen">
          {/* Clients */}
          <section className="py-12 md:py-20 flex-grow flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center mb-10 md:mb-12">
                <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Trusted By Leaders</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark uppercase tracking-wider mb-4">Our Clients</h2>
                <div className="w-24 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {CLIENTS.map((client, idx) => (
                  <a
                    key={idx}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center hover:shadow-md transition-shadow duration-300 aspect-square"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const span = document.createElement('span');
                        span.className = 'text-sm font-bold text-gray-400 text-center';
                        span.innerText = client.name;
                        (e.target as HTMLImageElement).parentElement?.appendChild(span);
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </section>

        </div>
      </ScrollStackSection>
    </div>
  );
};

export default Home;
