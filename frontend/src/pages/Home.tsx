import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Factory, Award, CheckCircle, Phone } from 'lucide-react';
import { CATEGORIES, CLIENTS, POLISHED_CONCRETE, PRODUCTS } from '../data/brochureData';
import { useState, useEffect } from 'react';

const HERO_IMAGES = [
  '/brochure-images/ai_ride_on_trowel_2.png',
  '/brochure-images/ai_polished_concrete_floor.png',
  '/brochure-images/ai_ride_on_trowel_1.png',
];

const Home = () => {
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 400], [1, 0.15]);
  const logoOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const logoY = useTransform(scrollY, [0, 400], [0, -250]);
  const logoX = useTransform(scrollY, [0, 400], [0, -150]);

  // --- 3D Interactive Mouse Tracking ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const invRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);
  const invRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const featuredProducts = PRODUCTS.slice(0, 4);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center justify-center bg-dark overflow-hidden"
        onMouseMove={handleMouseMove}
        style={{ perspective: '2000px' }}
      >
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroIdx}
              src={HERO_IMAGES[currentHeroIdx]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              alt="SmartGrit Industrial Polishing"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent"></div>
        </div>
        {/* Futuristic Metallic Left Flag/Ribbon */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ perspective: '2000px' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-0 top-[45%] -translate-y-1/2 w-[50vw] md:w-[40vw] lg:w-[35vw] h-[60vh] sm:h-[50vh] lg:h-[45vh]"
            style={{ 
              filter: 'drop-shadow(30px 10px 50px rgba(0,0,0,0.9)) drop-shadow(0px 0px 40px rgba(34,197,94,0.4))'
            }}
          >
            {/* The Real Metal Pane */}
            <motion.div
              animate={{ 
                rotateY: [1, 5, 1],
                translateZ: [0, 20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full shadow-[inset_2px_2px_5px_rgba(255,255,255,0.4),inset_-5px_-5px_15px_rgba(0,0,0,0.7)] relative overflow-hidden"
              style={{ 
                clipPath: 'polygon(0 10%, 80% 10%, 100% 50%, 80% 90%, 0 90%)', 
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(110deg, #4b5563 0%, #9ca3af 25%, #374151 50%, #9ca3af 75%, #1f2937 100%)', // Real heavy brushed steel
                borderRight: '2px solid rgba(255,255,255,0.2)'
              }}
            >
              {/* Brushed Metal Texture */}
              <div 
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" 
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.4) 1px, rgba(255,255,255,0.4) 2px)', 
                  filter: 'blur(0.5px)' 
                }} 
              />
              
              {/* Surface Grime/Scratches overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
              
              {/* Real Bolted Metal Clamps (Left Edge Only - 2 Clips) */}
              <div className="absolute top-[15%] left-0 w-10 h-24 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600 rounded-r-lg shadow-[8px_0_20px_rgba(0,0,0,0.9),inset_2px_2px_4px_rgba(255,255,255,0.9),inset_-2px_-2px_4px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between py-4 border border-gray-500 z-10">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-900 to-gray-400 shadow-[inset_1px_1px_3px_black,0_1px_1px_rgba(255,255,255,0.8)]"></div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-900 to-gray-400 shadow-[inset_1px_1px_3px_black,0_1px_1px_rgba(255,255,255,0.8)]"></div>
              </div>
              <div className="absolute bottom-[15%] left-0 w-10 h-24 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600 rounded-r-lg shadow-[8px_0_20px_rgba(0,0,0,0.9),inset_2px_2px_4px_rgba(255,255,255,0.9),inset_-2px_-2px_4px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between py-4 border border-gray-500 z-10">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-900 to-gray-400 shadow-[inset_1px_1px_3px_black,0_1px_1px_rgba(255,255,255,0.8)]"></div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-900 to-gray-400 shadow-[inset_1px_1px_3px_black,0_1px_1px_rgba(255,255,255,0.8)]"></div>
              </div>
              
              {/* Internal Glowing Edge Accent */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-primary/50 mix-blend-screen"
                style={{ 
                  clipPath: 'polygon(76% 8%, 80% 10%, 100% 50%, 80% 90%, 76% 92%, 98% 50%)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Left: Premium 3D Animated Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="absolute left-0 top-[45%] -translate-y-1/2 w-full lg:w-[35vw] flex justify-start items-center perspective-1000 pointer-events-auto z-20 pl-4 sm:pl-8 lg:pl-12"
            style={{ 
              perspective: '1500px',
            }}
          >
            <motion.div
              animate={{ 
                y: [-8, 8, -8],
                rotateY: [-8, 8, -8],
                rotateX: [3, -3, 3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[180px] sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[420px] aspect-square flex items-center justify-start" 
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main Logo with sharp drop shadow */}
              <img 
                src="/smart_grits_logo.png" 
                alt="SmartGrit Logo" 
                style={{ 
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 50px rgba(34,197,94,0.4))',
                  transform: 'translateZ(50px)'
                }}
                className="w-full max-w-full h-auto object-contain relative z-10" 
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Container aligned bottom right */}
        <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
          {/* Right: High-Tech Typography Block (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="absolute right-6 lg:right-12 xl:right-16 bottom-12 lg:bottom-20 flex flex-col items-end text-right pointer-events-auto"
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

      {/* Stats Strip */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark uppercase tracking-wider mb-4">
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

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 transform translate-x-4 translate-y-4 rounded-3xl -z-10"></div>
              <img
                src="/brochure-images/ai_walk_behind_trowel.png"
                alt="KIA Motors — SmartGrit Polished Concrete Floor"
                className="w-full h-[550px] object-cover rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose SmartGrit */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Our Edge</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark uppercase tracking-wider mb-4">Why Choose SmartGrit</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, title: 'Make in India', desc: 'Products made from high-quality hard resin bond and qualified diamonds. Proudly manufactured in India with world-class materials.' },
              { icon: ShieldCheck, title: 'Premium Quality', desc: 'Over 11 years of R&D in abrasive products. Excellent results with high shine, long life and low cost. Dry and wet polishing compatible.' },
              { icon: Award, title: 'Technical Support', desc: 'On-site technical support and consultation. We supply, distribute and support across all of India for every project.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                className="p-8 rounded-2xl border border-gray-100 bg-white group hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 relative overflow-hidden"
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

      {/* Product Categories */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">What We Offer</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4">Product Categories</h2>
              <div className="w-24 h-1 bg-primary"></div>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-white font-semibold hover:text-primary transition-colors">
              View All Products <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-80 rounded-2xl overflow-hidden bg-dark border border-gray-700 cursor-pointer hover:border-primary/50 hover:shadow-[0_20px_50px_-10px_rgba(34,197,94,0.3)] hover:-translate-y-2 transition-all duration-500 z-0 hover:z-10"
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

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Our Products</p>
            <h2 className="text-3xl font-bold text-dark uppercase tracking-wider mb-4">Featured Products</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <div className="relative overflow-hidden h-56 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-dark text-xs font-black px-3 py-1.5 uppercase rounded-lg shadow-lg filter drop-shadow-md z-20">
                    {product.categorySlug.replace('-', ' ')}
                  </div>
                </div>
                <div className="p-6 relative z-20 bg-white">
                  <h3 className="font-extrabold text-dark text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">{product.name}</h3>
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

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Where We Work</p>
            <h2 className="text-3xl font-bold text-dark uppercase tracking-wider mb-4">Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {POLISHED_CONCRETE.applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 group text-center relative overflow-hidden"
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

      {/* Clients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Trusted By Leaders</p>
            <h2 className="text-3xl font-bold text-dark uppercase tracking-wider mb-4">Our Clients</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {CLIENTS.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center hover:border-primary/30 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 aspect-square group grayscale hover:grayscale-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-14 max-w-full object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const span = document.createElement('span');
                    span.className = 'text-sm font-bold text-gray-400 group-hover:text-primary text-center transition-colors';
                    span.innerText = client.name;
                    (e.target as HTMLImageElement).parentElement?.appendChild(span);
                  }}
                />
                <span className="text-xs text-gray-400 font-bold mt-2 text-center group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Strip */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">Ready to Order?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90 font-medium mb-8">
            Add products to your shopping cart and checkout directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-dark text-white hover:bg-black px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors">
              Shop Products
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
