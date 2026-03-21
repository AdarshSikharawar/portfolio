import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'Projects', value: '15+' },
  { label: 'Technologies', value: '12+' },
  { label: 'Months XP', value: '18+' },
  { label: 'Coffee Cups', value: '∞' },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Who I Am</p>
          <h2 className="section-title text-white">About Me</h2>
          <div className="divider mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full border border-white/[0.08] spin-slow" />
              <div className="absolute inset-5 rounded-full border border-white/[0.05] spin-slow-rev" />
              <div className="absolute inset-11 rounded-full bg-[#0e0e0e] border border-white/10 flex items-center justify-center float-anim">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 mx-auto mb-2 flex items-center justify-center font-black text-white text-lg">AS</div>
                  <p className="text-[10px] text-white/30 tracking-widest">DEVELOPER</p>
                </div>
              </div>
              {/* Floating tags */}
              <motion.div className="absolute -top-1 right-0 tag" animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>⚛️ React</motion.div>
              <motion.div className="absolute bottom-4 -left-4 tag" animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity }}>🍃 MongoDB</motion.div>
              <motion.div className="absolute top-1/2 -right-6 tag" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>🚀 Node.js</motion.div>
              <motion.div className="absolute top-8 -left-2 tag" animate={{ y: [0, 5, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>🚂 Express</motion.div>
              <motion.div className="absolute -bottom-3 right-8 tag" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.2, repeat: Infinity }}>🐍 Django</motion.div>
              <motion.div className="absolute top-[30%] right-0 tag" animate={{ y: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity }}>🐍 Python</motion.div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-4">
              Crafting the future, one line at a time.
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-3">
              I&apos;m <span className="text-white font-medium">Adarsh Sikharawar</span>, a Full Stack Developer who specializes in the <span className="text-white font-medium">MERN stack</span>. I thrive at the intersection of engineering precision and design clarity.
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-3">
              My passion spans <span className="text-white font-medium">web development, AI integrations</span>, and building products that solve real problems. I believe great software is born from deep curiosity and relentless iteration.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              When not coding, I&apos;m exploring new tech, contributing to open source, and perfecting my coffee brewing ☕.
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {['MERN Stack', 'React', 'Node.js', 'AI/ML', 'REST APIs', 'MongoDB', 'Git', 'Python'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {stats.map(({ label, value }) => (
                <div key={label} className="card-elevated rounded-xl p-4 text-center">
                  <div className="font-['Space_Grotesk'] text-2xl font-black text-white">{value}</div>
                  <div className="text-white/30 text-[11px] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
