import { motion } from 'framer-motion';
import { POLISHED_CONCRETE } from '../data/brochureData';
import { CheckCircle, Droplets, Wind, Layers, CloudOff, Lightbulb, ShieldCheck, Wrench, Car, Banknote } from 'lucide-react';

const Applications = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/brochure-images/ai_polished_concrete_floor.png"
            alt="Polished Concrete Industrial Application"
            className="w-full h-full object-cover opacity-30 object-left"
          />
          <div className="absolute inset-0 bg-dark/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-40 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }} animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.4, type: "spring", bounce: 0.4 }} style={{ transformStyle: "preserve-3d" }}>
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Solutions</p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4">Services</h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <p className="text-gray-300 max-w-2xl text-lg">
              {POLISHED_CONCRETE.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Polishing Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Polished Concrete</p>
            <h2 className="text-3xl font-bold text-dark uppercase">Polishing Methods</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 perspective-[2000px]">
            {POLISHED_CONCRETE.methods.map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: idx * 0.03, type: "spring", stiffness: 100 }}
                className="bg-dark text-white p-10 rounded-3xl border border-white/10 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] hover:border-primary/50 transition-all duration-500 relative overflow-hidden group transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="text-primary mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10">
                  {idx === 0 ? <Wind className="w-12 h-12" /> : <Droplets className="w-12 h-12" />}
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 relative z-10 group-hover:text-primary transition-colors">{method.name}</h3>
                <p className="text-gray-300 leading-relaxed relative z-10">{method.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Densification process */}
          <div className="bg-primary border border-primary rounded-3xl overflow-hidden mt-16 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-black text-white uppercase mb-10 tracking-wide">Densification Process</h3>
                <div className="space-y-10">
                  {[
                    {
                      step: '01',
                      title: 'Identify Floor Condition',
                      desc: 'Clean the surface with a scrubber, then evaluate the floor for tool selection. Concrete must be a minimum of 28 days old with minimum compressive strength of 3,500 psi (24 MPa).',
                      icon: <Layers className="w-6 h-6" />,
                    },
                    {
                      step: '02',
                      title: 'Surface Preparation',
                      desc: 'The grinding procedure eliminates micro-roughness and opens the pores of the concrete floor. This is generally a 3-4 step process, depending on the condition of the concrete.',
                      icon: <Wind className="w-6 h-6" />,
                    },
                    {
                      step: '03',
                      title: 'Densify the Concrete',
                      desc: 'After initial coarse grinding, apply liquid chemical hardener (densifier) to help solidify and densify the surface. Provides extra protection from water penetration and staining.',
                      icon: <Droplets className="w-6 h-6" />,
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="text-white/30 font-black text-6xl leading-none w-16 shrink-0 group-hover:text-white transition-colors">{step.step}</div>
                      <div>
                        <div className="text-primary mb-3 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-gray-100 transition-all">{step.icon}</div>
                        <h4 className="font-extrabold text-white uppercase text-base tracking-wider mb-2">{step.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-full min-h-[400px]">
                <img
                  src="/brochure-images/ai_walk_behind_trowel.png"
                  alt="Densification Process"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent lg:block hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-dark text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-[#0f172a] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-[0.2em] mb-3 text-sm drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">Benefits</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide">Why Polished Concrete?</h2>
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

      {/* Applications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Ideal For</p>
            <h2 className="text-3xl font-bold text-dark uppercase">Available Services</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 perspective-[2000px]">
            {POLISHED_CONCRETE.applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, rotateX: -15, z: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.08, rotateX: 15, rotateY: -15, z: 50 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.4, delay: i * 0.03, type: "spring", stiffness: 100 }}
                className="bg-primary/10 border-l-4 border-primary p-5 hover:bg-primary hover:text-white transition-all group transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <p className="font-bold text-dark group-hover:text-white text-sm uppercase tracking-wide">{app}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Options */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-[0.2em] mb-3 text-sm">Finishing Levels</p>
            <h2 className="text-3xl sm:text-4xl font-black text-dark uppercase tracking-wide">Polishing System Options</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
            <p className="text-gray-500 mt-6 max-w-3xl mx-auto font-medium">
              Concrete grade requirements: Soft Concrete M25 + 4 kg Hardener / Medium Concrete M30 + 4 kg Hardener / Hard Concrete M35 + 4 kg Hardener
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[2000px]">
            {[
              {
                level: 'Matt Finishing',
                subtitle: 'Satin finish — reflects images from side lights',
                grits: ['G200/G400', 'D', 'G400/G800'],
                borderColor: 'border-gray-300',
                glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(156,163,175,0.4)]',
                bg: 'bg-white',
              },
              {
                level: 'Semi Glossy',
                subtitle: 'Reflects overhead and side images from 35-45 feet with increased light reflectivity',
                grits: ['G100', 'G200', 'D', 'G400', 'G800'],
                borderColor: 'border-blue-400',
                glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(96,165,250,0.4)]',
                bg: 'bg-blue-50/30',
              },
              {
                level: 'Full Glossy',
                subtitle: 'High gloss finish — wet look with mirror-like reflections',
                grits: ['G50', 'G100', 'G200', 'D', 'G400', 'G800', 'G1500', 'S', 'G3000'],
                borderColor: 'border-primary',
                glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.4)]',
                bg: 'bg-primary/5',
              },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 40, y: -10 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: idx * 0.04, type: "spring", stiffness: 100 }}
                className={`${opt.bg} border-t-[6px] ${opt.borderColor} p-10 rounded-b-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] ${opt.glowColor} transition-all duration-500 group transform-gpu relative overflow-hidden`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-black text-dark uppercase text-xl mb-4 tracking-wider group-hover:text-primary transition-colors relative z-10">{opt.level}</h3>
                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed relative z-10 h-10">{opt.subtitle}</p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {opt.grits.map((g, gi) => (
                    <span key={gi} className="bg-white border border-gray-100 text-dark text-xs font-bold px-3.5 py-1.5 rounded-md shadow-sm group-hover:border-primary/30 group-hover:text-primary transition-colors cursor-default">{g}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group cursor-pointer">
            <img
              src="/brochure-images/ai_ride_on_trowel_2.png"
              alt="SmartGrit Concrete Polishing Systems"
              className="w-full h-auto max-h-[85vh] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col items-center justify-end pb-16 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mb-2 transform group-hover:-translate-y-2 transition-transform duration-300">Achieve The Perfect Finish</h3>
              <div className="w-16 h-1 bg-primary rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Applications;
