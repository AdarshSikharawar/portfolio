import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import GridOverlay from './components/GridOverlay';
import Hyperspeed from './components/Hyperspeed';
import Ballpit from './components/Ballpit';
import Orb from './components/Orb';


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Media from './components/Media';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Viewport options shared across all sections */
const VP = { once: true, amount: 0.1 };

const HYPERSPEED_OPTIONS = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3
  }
};

const BACKGROUNDS = ['Grid', 'Hyperspeed', 'Ballpit', 'Orb',];

function App() {
  const [loading, setLoading] = useState(true);
  const [activeBackground, setActiveBackground] = useState('');

  useEffect(() => {
    // Pick a random background on mount
    const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    setActiveBackground(randomBg);
  }, []);

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [loading]);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Global utilities */}
          <CustomCursor />
          <ScrollProgress />

          {/* Randomized Background */}
          {activeBackground === 'Grid' && <GridOverlay />}

          {activeBackground === 'Hyperspeed' && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
              </div>
            </div>
          )}

          {activeBackground === 'Ballpit' && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                <Ballpit count={100} gravity={0.7} friction={0.8} wallBounce={0.95} followCursor={false} />
              </div>
            </div>
          )}

          {activeBackground === 'Orb' && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
              </div>
            </div>
          )}

          {activeBackground === 'LetterGlitch' && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
              </div>
            </div>
          )}

          {/* App shell */}
          <div className="relative z-[1] min-h-screen bg-transparent text-white">
            <Navbar />

            <main>
              <Hero />

              <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={sectionVariants}>
                <About />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={sectionVariants}>
                <Skills />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={sectionVariants}>
                <Projects />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={sectionVariants}>
                <Media />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={sectionVariants}>
                <Resume />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={sectionVariants}>
                <Contact />
              </motion.div>
            </main>

            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
