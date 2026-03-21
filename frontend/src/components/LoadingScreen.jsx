import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hyperspeed from './Hyperspeed';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const hyperspeedOptions = useMemo(() => ({
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
  }), []);

  useEffect(() => {
    // Initialize & try to play audio immediately
    const audio = new Audio('/loading-tech.mp3');
    audio.volume = 0.3;
    audio.loop = true;
    audioRef.current = audio;

    // Browsers block autoplay unless user interacted previously (e.g., refresh).
    // We catch the error so the app continues loading even if audio is muted.
    audio.play().catch(e => console.log('Autoplay blocked by browser:', e.message));

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);

          // Fade out audio before completion
          if (audioRef.current) {
            let fadeOut = setInterval(() => {
              if (audioRef.current && audioRef.current.volume > 0.05) {
                audioRef.current.volume -= 0.05;
              } else {
                clearInterval(fadeOut);
                if (audioRef.current) {
                  audioRef.current.pause();
                }
              }
            }, 50);
          }

          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 80);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: '#000000' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* Hyperspeed background */}
        <Hyperspeed effectOptions={hyperspeedOptions} />

        {/* Dark overlay so text is readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Content — on top of canvas */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <motion.div
            className="font-['Space_Grotesk'] text-4xl font-black text-white mb-3 tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            AS<span className="text-white/20">.</span>
          </motion.div>

          <motion.p
            className="text-white/50 text-[11px] tracking-[0.35em] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Full Stack Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-px bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-white/30 text-[10px] mt-2 tracking-widest tabular-nums">
              {String(Math.min(Math.round(progress), 100)).padStart(3, '0')}%
            </p>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
