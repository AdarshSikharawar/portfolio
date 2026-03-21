import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

/* Pure CSS orb — no Three.js, no GPU particle systems */
const ProfileOrb = () => (
  <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] flex-shrink-0">
    {/* Outer spin ring */}
    <div className="absolute inset-0 rounded-full border border-white/10 spin-slow" />
    <div className="absolute inset-6 rounded-full border border-white/[0.07] spin-slow-rev" />
    {/* Corner accent dots */}
    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40" />
    <div className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-white/25" />
    {/* Card */}
    <div className="absolute inset-10 rounded-full bg-[#111] border border-white/10 flex flex-col items-center justify-center float-anim">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/15 flex items-center justify-center text-2xl font-black text-white mb-3">
        AS
      </div>
      <p className="text-white text-xs tracking-[0.2em] font-semibold">ADARSH SIKHARAWAR</p>
      <p className="text-white/40 text-[10px] mt-1">Full Stack Developer</p>
      <div className="flex flex-wrap gap-1.5 mt-3 justify-center px-2">
        {['React', 'Node', 'MongoDB', 'Express', 'Django', 'SQLite'].map(t => (
          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/50">{t}</span>
        ))}
      </div>
    </div>
    {/* Floating tech badges */}
    <div className="absolute -top-1 left-8 tag float-anim" style={{ animationDelay: '0s' }}>⚛️ React</div>
    <div className="absolute bottom-6 -right-2 tag float-anim" style={{ animationDelay: '0.6s' }}>🟢 Node.js</div>
    <div className="absolute top-1/2 -left-6 tag float-anim" style={{ animationDelay: '1.2s' }}>🍃 MongoDB</div>
    <div className="absolute top-8 -right-4 tag float-anim" style={{ animationDelay: '1.8s' }}>🚀 Express</div>
    <div className="absolute bottom-16 left-0 tag float-anim" style={{ animationDelay: '2.4s' }}>🐍 Django</div>
    <div className="absolute -bottom-2 right-12 tag float-anim" style={{ animationDelay: '3s' }}>🗄️ SQLite</div>
  </div>
);

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    {/* Radial glow — CSS only */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-28 pb-16">
      {/* Left — Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-500/5 border border-green-500/40 text-white/50 text-xs tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse-dot 2s ease infinite' }} />
          Available for opportunities
        </span>

        <h1 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5">
          <span className="gradient-text">Adarsh</span>
          <br />
          <span className="text-white">Sikharawar</span>
        </h1>

        <div className="text-lg md:text-xl text-white/40 mb-4 font-['Inter']">
          I&apos;m a{' '}
          <TypeAnimation
            sequence={[
              'Full Stack Developer', 2500,
              'MERN Stack Engineer', 2500,
              'React Specialist', 2500,
              'API Architect', 2500,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="text-white font-semibold"
          />
        </div>

        <p className="text-white/35 text-sm md:text-base leading-relaxed mb-10 max-w-md">
          Building scalable web applications at the intersection of clean code and thoughtful design. Passionate about MERN stack, AI integrations, and futuristic developer experiences.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link to="projects" smooth duration={600} offset={-80}>
            <button className="btn-primary">View Projects →</button>
          </Link>
          <Link to="contact" smooth duration={600} offset={-80}>
            <button className="btn-outline">Contact Me</button>
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex gap-3">
          {[
            { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
            { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
          ].map(({ icon: Icon, url, label }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Right — CSS Orb */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <ProfileOrb />
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Link to="about" smooth duration={600} offset={-80} className="cursor-pointer">
        <div className="flex flex-col items-center gap-1.5 text-white/25 hover:text-white/50 transition-colors">
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <HiArrowDown size={16} />
        </div>
      </Link>
    </motion.div>
  </section>
);

export default Hero;
