import { motion } from 'framer-motion';
import { POLISHED_CONCRETE } from '../data/brochureData';
import { CheckCircle, Droplets, Wind, Layers } from 'lucide-react';

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
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Benefits</p>
            <h2 className="text-3xl font-bold uppercase">Why Polished Concrete?</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 perspective-[2000px]">
            {POLISHED_CONCRETE.advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: i * 0.04, type: "spring", stiffness: 100 }}
                className="bg-dark border border-gray-700 p-8 rounded-2xl hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group relative overflow-hidden transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CheckCircle className="w-8 h-8 text-primary mb-4 transform group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <h3 className="font-bold text-white mb-3 uppercase tracking-wider relative z-10 group-hover:text-primary transition-colors">{adv.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{adv.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {POLISHED_CONCRETE.properties.map((prop, i) => (
              <span key={i} className="border border-primary text-primary text-sm font-semibold px-4 py-2">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Finishing Levels</p>
            <h2 className="text-3xl font-bold text-dark uppercase">Polishing System Options</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4">
              Concrete grade requirements: Soft Concrete M25 + 4 kg Hardener / Medium Concrete M30 + 4 kg Hardener / Hard Concrete M35 + 4 kg Hardener
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[2000px]">
            {[
              {
                level: 'Matt Finishing',
                subtitle: 'Satin finish — reflects images from side lights',
                grits: ['G200/G400', 'D', 'G400/G800'],
                borderColor: 'border-gray-400',
                bg: 'bg-gray-100',
              },
              {
                level: 'Semi Glossy',
                subtitle: 'Reflects overhead and side images from 35-45 feet with increased light reflectivity',
                grits: ['G100', 'G200', 'D', 'G400', 'G800'],
                borderColor: 'border-blue-400',
                bg: 'bg-blue-50',
              },
              {
                level: 'Full Glossy',
                subtitle: 'High gloss finish — wet look with mirror-like reflections',
                grits: ['G50', 'G100', 'G200', 'D', 'G400', 'G800', 'G1500', 'S', 'G3000'],
                borderColor: 'border-primary',
                bg: 'bg-primary/5',
              },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: idx * 0.03, type: "spring", stiffness: 100 }}
                className={`${opt.bg} border-t-4 ${opt.borderColor} p-10 rounded-b-2xl shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group transform-gpu`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="font-extrabold text-dark uppercase text-xl mb-3 group-hover:text-primary transition-colors">{opt.level}</h3>
                <p className="text-gray-500 text-sm font-medium mb-6">{opt.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {opt.grits.map((g, gi) => (
                    <span key={gi} className="bg-white border border-gray-200 text-dark text-xs font-bold px-3 py-1.5 rounded shadow-sm group-hover:border-primary/30 transition-colors">{g}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
            <img
              src="/brochure-images/ai_ride_on_trowel_2.png"
              alt="SmartGrit Concrete Polishing Systems"
              className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent flex items-end justify-center pb-12">
              <h3 className="text-white text-3xl font-black uppercase tracking-widest drop-shadow-lg">Achieve The Perfect Finish</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Applications;
