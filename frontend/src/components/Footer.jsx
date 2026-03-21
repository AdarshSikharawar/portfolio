import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';

const socials = [
  { icon: FaGithub, url: 'https://github.com' },
  { icon: FaLinkedin, url: 'https://linkedin.com' },
  { icon: FaTwitter, url: 'https://twitter.com' },
  { icon: FaEnvelope, url: 'mailto:adarsh@email.com' },
];

const navLinks = [
  { to: 'hero', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'contact', label: 'Contact' },
];

const Footer = () => (
  <footer className="relative border-t border-white/[0.06] bg-[#060606]">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <span className="font-['Space_Grotesk'] text-xl font-black text-white">AS.</span>
          <p className="text-white/30 text-xs leading-relaxed mt-3 max-w-xs">
            Building scalable web applications with clean code and thoughtful design. Open to exciting opportunities.
          </p>
        </div>

        <div>
          <h4 className="text-white/20 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Navigation</h4>
          <ul className="space-y-2">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to} smooth duration={600} offset={-80}
                  className="text-white/35 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white/20 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Connect</h4>
          <p className="text-white/30 text-xs mb-4">adarshsikarawar63@gmail.com</p>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, url }) => (
              <motion.a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Icon size={13} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Adarsh Sikharawar. All rights reserved.</p>
        <p className="text-white/15 text-[11px]">Built with React · Node.js · MongoDB · Framer Motion</p>
      </div>
    </div>
  </footer>
);

export default Footer;
