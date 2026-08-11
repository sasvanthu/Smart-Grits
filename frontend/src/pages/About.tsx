import { motion } from 'framer-motion';
import { ABOUT_CONTENT, COMPANY_INFO, POLISHED_CONCRETE } from '../data/brochureData';
import { CheckCircle, Factory, Target, Layers, Award, MapPin, Phone, Mail, Globe, Building2, Flag, Wrench, CloudOff, Lightbulb, ShieldCheck, Car, Banknote } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/brochure-images/ai_walk_behind_factory.png"
            alt="SmartGrit Industrial Polishing"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-40 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }} animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.4, type: "spring", bounce: 0.4 }} style={{ transformStyle: "preserve-3d" }}>
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Who We Are</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-4">About SmartGrit</h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <p className="text-gray-300 max-w-2xl text-lg">
              Over 11 years of R&D in abrasive products. Industrial concrete floor polishing systems made in India.
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30, rotateX: 15, z: -50 }} whileInView={{ opacity: 1, x: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} viewport={{ once: true, margin: "0px" }} style={{ transformStyle: "preserve-3d" }}>
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Our Story</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark uppercase mb-4">SmartGrit Polishing System</h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                SmartGrit Polishing System is a joint venture company between <strong>Kleanmax</strong>, a concrete polishing tools company, and <strong>EM&TS</strong>, industrial flooring consultants.
              </p>
              <p>
                Kleanmax was founded in 2012 primarily as a traditional floor polishing tools manufacturer for Mosaic, Marble &amp; Granite Flooring Industry. We ventured into concrete floor polishing tools making with our vast experience in polishing backed by our R&D.
              </p>
              <p>
                We are positioned to supply and distribute our products all over India, along with technical support. Our idea is to provide an optimised concrete polishing system for Industrial Concrete Flooring such as Factories, Warehouses and Commercial Buildings.
              </p>
              <p>
                We offer <strong>Ride On Trowel — Wet Polishing Systems</strong>, which is faster and more economical compared to traditional polishing systems.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30, rotateY: 15, z: -50 }} whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} viewport={{ once: true, margin: "0px" }} className="relative transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <img
              src="/brochure-images/ai_ride_on_factory.png"
              alt="SmartGrit Polishing in Action — Peekay Steels"
              className="w-full h-64 sm:h-80 lg:h-[400px] object-cover object-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] rounded-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 shadow-lg">
              <div className="text-3xl font-bold">11+</div>
              <div className="text-sm font-semibold">Years of R&D</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Why Choose SmartGrit</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark uppercase">Our Promise to You</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[2000px]">
            {[
              { icon: <Factory className="w-8 h-8" />, title: 'Make in India', desc: 'Proudly manufactured in India with world-class quality materials and processes.' },
              { icon: <Award className="w-8 h-8" />, title: 'Quality Products', desc: 'High-quality hard resin bond and qualified diamonds. Consistent, high-quality output in every batch.' },
              { icon: <Target className="w-8 h-8" />, title: 'Technical Support', desc: 'Our expert team provides on-site technical support and consultation for every project.' },
              { icon: <Layers className="w-8 h-8" />, title: 'Full System', desc: 'Complete polishing systems from grinding tools to chemicals and accessories — one stop for all your needs.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: idx * 0.03, type: "spring", stiffness: 100 }}
                className="text-center p-10 bg-white rounded-2xl border border-gray-100 hover:border-primary/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group relative overflow-hidden transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_20px_-5px_rgba(34,197,94,0.5)] group-hover:scale-110 group-hover:-rotate-6 mb-6 transition-all duration-300 relative z-10">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-dark text-lg uppercase tracking-wider mb-3 group-hover:text-primary transition-colors relative z-10">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold uppercase tracking-widest mb-4 text-xs sm:text-sm opacity-80">Our Vision</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-relaxed">
            "{ABOUT_CONTENT.vision}"
          </h2>
          <div className="w-16 h-1 bg-white/40 mx-auto"></div>
        </div>
      </section>

      {/* Product Technology */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30, rotateY: -15, z: -50 }} whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} viewport={{ once: true, margin: "0px" }} style={{ transformStyle: "preserve-3d" }}>
            <img src="/brochure-images/WhatsApp Image 2026-07-25 at 11.18.21 AM (1).jpeg" alt="SmartGrit Polishing System Discs" className="w-full h-64 sm:h-80 lg:h-[450px] object-cover object-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] rounded-2xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30, rotateX: 15, z: -50 }} whileInView={{ opacity: 1, x: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} viewport={{ once: true, margin: "0px" }} style={{ transformStyle: "preserve-3d" }}>
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-xs sm:text-sm">Product Technology</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark uppercase mb-4">SmartGrit Diamond Tools</h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <p className="text-gray-600 leading-relaxed mb-4">{ABOUT_CONTENT.productNote}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{ABOUT_CONTENT.productMaterial}</p>
            <div className="space-y-2">
              {ABOUT_CONTENT.finishTypes.map((finish, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-semibold text-dark">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  {finish} Available
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Polished Concrete Advantages */}
      <section className="py-24 bg-dark text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-[#0f172a] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-[0.2em] mb-3 text-sm drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">Why Polished Concrete</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide">Polished Concrete Advantages</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
            {POLISHED_CONCRETE.advantages.map((adv, i) => {
              const icons = [<CloudOff className="w-7 h-7" />, <Lightbulb className="w-7 h-7" />, <ShieldCheck className="w-7 h-7" />, <Wrench className="w-7 h-7" />, <Car className="w-7 h-7" />, <Banknote className="w-7 h-7" />];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 40, y: -10 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.3, delay: i * 0.04, type: "spring", stiffness: 100 }}
                  className="bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 p-8 hover:bg-white/[0.06] hover:border-primary/50 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.2)] transition-all duration-500 group relative overflow-hidden transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500"></div>
                  <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 mb-6 shadow-sm relative z-10">
                    {icons[i] || <CheckCircle className="w-7 h-7" />}
                  </div>
                  <h3 className="font-extrabold text-white mb-4 uppercase text-base tracking-widest group-hover:text-primary transition-colors drop-shadow-md relative z-10">{adv.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">{adv.description}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {POLISHED_CONCRETE.properties.map((prop, i) => (
              <span key={i} className="px-6 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold tracking-wider hover:bg-primary hover:text-white hover:scale-105 hover:shadow-[0_10px_20px_-5px_rgba(34,197,94,0.4)] transition-all cursor-default">
                {prop}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-widest mb-3 text-sm">Get In Touch</p>
            <h2 className="text-4xl font-black text-dark uppercase tracking-wide">Company Information</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto perspective-[2000px]">
            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, z: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-gray-100 p-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-20px_rgba(34,197,94,0.15)] hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-8 shadow-sm">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-dark uppercase tracking-widest mb-6 text-sm group-hover:text-primary transition-colors">Headquarters</h3>
              <div className="text-gray-500 text-sm leading-relaxed space-y-1 relative">
                <p className="font-medium text-gray-700">{COMPANY_INFO.address.line1}</p>
                <p>{COMPANY_INFO.address.line2}</p>
                <p>{COMPANY_INFO.address.line3}</p>
                <p className="pt-2">{COMPANY_INFO.address.city} &ndash; {COMPANY_INFO.address.pincode}</p>
                <p>{COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}</p>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, z: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 p-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-20px_rgba(34,197,94,0.15)] hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-8 shadow-sm relative z-10">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-dark uppercase tracking-widest mb-6 text-sm group-hover:text-primary transition-colors relative z-10">Contact Details</h3>
              <div className="space-y-5 text-sm text-gray-500 relative z-10">
                {COMPANY_INFO.phone.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 group/item cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors"><Phone className="w-4 h-4" /></div>
                    <span className="font-medium hover:text-primary transition-colors">{p}</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 group/item cursor-pointer pt-2 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors"><Mail className="w-4 h-4" /></div>
                  <span className="font-medium hover:text-primary transition-colors">{COMPANY_INFO.email}</span>
                </div>
                <div className="flex items-center gap-4 group/item cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors"><Globe className="w-4 h-4" /></div>
                  <span className="font-medium hover:text-primary transition-colors">{COMPANY_INFO.website}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Facts Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, z: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-100 p-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-20px_rgba(34,197,94,0.15)] hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-8 shadow-sm">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-dark uppercase tracking-widest mb-6 text-sm group-hover:text-primary transition-colors">Quick Facts</h3>
              <div className="space-y-5 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary"><Factory className="w-4 h-4" /></div>
                  <span className="font-medium text-gray-700">Founded: {COMPANY_INFO.founded}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary"><Flag className="w-4 h-4" /></div>
                  <span className="font-medium text-gray-700">{COMPANY_INFO.madeIn}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary"><Wrench className="w-4 h-4" /></div>
                  <span className="font-medium text-gray-700">Grinding &amp; Polishing</span>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary"><MapPin className="w-4 h-4" /></div>
                  <span className="font-medium text-primary">Pan-India Distribution</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
