import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';

const socials = [
  { icon: FaGithub,   url: 'https://github.com/AdarshSikharawar',         label: 'GitHub profile of Adarsh Sikharawar' },
  { icon: FaLinkedin, url: 'https://linkedin.com/in/adarshsikharawar',     label: 'LinkedIn profile of Adarsh Sikharawar' },
  { icon: FaTwitter,  url: 'https://twitter.com/adarshsikharawar',         label: 'Twitter profile of Adarsh Sikharawar' },
  { icon: FaEnvelope, url: 'mailto:adarshsikarawar63@gmail.com',           label: 'Send email to Adarsh Sikharawar' },
];

const navLinks = [
  { to: 'hero',     label: 'Home' },
  { to: 'about',    label: 'About' },
  { to: 'skills',   label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'contact',  label: 'Contact' },
];

const Footer = () => (
  <footer className="relative border-t border-white/[0.06] bg-[#060606]" aria-label="Site footer">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <span className="font-['Space_Grotesk'] text-xl font-black text-white">AS<span className="text-white/30">.</span></span>
          <p className="text-white/30 text-xs leading-relaxed mt-3 max-w-xs">
            Adarsh Sikharawar — Full Stack Developer building scalable web applications with clean code and thoughtful design. Open to exciting opportunities.
          </p>
        </div>

        <nav aria-label="Footer navigation">
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
        </nav>

        <div>
          <h4 className="text-white/20 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Connect</h4>
          <p className="text-white/30 text-xs mb-4">
            <a href="mailto:adarshsikarawar63@gmail.com" className="hover:text-white/60 transition-colors">
              adarshsikarawar63@gmail.com
            </a>
          </p>
          <div className="flex gap-2" role="list" aria-label="Social media links">
            {socials.map(({ icon: Icon, url, label }) => (
              <motion.a
                key={url}
                href={url}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Icon size={13} aria-hidden="true" />
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
