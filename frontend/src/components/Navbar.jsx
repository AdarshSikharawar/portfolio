import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: 'hero', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'media', label: 'Media' },
  { to: 'resume', label: 'Resume' },
  { to: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${scrolled
          ? 'bg-[#060606] border-b border-white/[0.06] py-3'
          : 'bg-[#060606] py-5'
        }`}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.span
          className="font-['Space_Grotesk'] text-lg font-black text-white cursor-pointer tracking-tight"
          whileHover={{ opacity: 0.7 }}
        >
          AS<span className="text-white/30">.</span>
        </motion.span>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth={true}
                duration={600}
                offset={-80}
                className="text-white/40 hover:text-white text-sm font-medium cursor-pointer transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white/40 hover:text-white transition-colors text-sm"
            title="Toggle theme"
          >
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <button
            className="md:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white/60"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <FiX size={15} /> : <FiMenu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="md:hidden mx-4 mt-2 bg-[#0e0e0e] border border-white/10 rounded-xl p-3 flex flex-col gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  smooth duration={600}
                  offset={-80}
                  className="block text-white/50 hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-all text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
