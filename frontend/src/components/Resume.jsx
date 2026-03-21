import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Resume = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="resume" ref={ref} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">My CV</p>
          <h2 className="section-title text-white">Resume</h2>
          <div className="divider mt-4" />
        </motion.div>

        <motion.div
          className="card rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Resume preview */}
          <div className="bg-[#0a0a0a] p-10">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-white/10">
                <div className="w-14 h-14 rounded-full bg-white/[0.07] border border-white/15 mx-auto flex items-center justify-center font-black text-white text-lg mb-3">
                  AS
                </div>
                <h3 className="font-['Space_Grotesk'] text-white text-lg font-bold">ADARSH SIKHARAWAR</h3>
                <p className="text-white/35 text-xs tracking-widest mt-1">FULL STACK DEVELOPER · MERN STACK</p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    section: 'EXPERIENCE',
                    items: [
                      'Full Stack Developer — Freelance  2024–Present',
                      'MERN Stack Developer Intern  2023–2024',
                    ],
                  },
                  {
                    section: 'EDUCATION',
                    items: [
                      'B.Tech in Computer Science — 2024',
                      'Full Stack Web Dev Bootcamp — 2023',
                    ],
                  },
                  {
                    section: 'SKILLS',
                    items: [
                      'React · Node.js · MongoDB · Express.js',
                      'REST APIs · Socket.io · Tailwind CSS · Git',
                    ],
                  },
                ].map(({ section, items }) => (
                  <div key={section}>
                    <div className="text-white/20 text-[10px] font-bold tracking-[0.2em] mb-2">{section}</div>
                    {items.map(item => (
                      <p key={item} className="text-white/45 text-xs mb-1.5">— {item}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-white/[0.07] p-6 flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              className="btn-primary"
              onClick={() => { const l = document.createElement('a'); l.href = '/resume.pdf'; l.download = 'Adarsh_Kumar_Resume.pdf'; l.click(); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload size={13} />
              Download PDF
            </motion.button>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
            >
              <FaEye size={13} />
              Preview
            </motion.a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: FaGithub, label: 'GitHub', url: 'https://github.com' },
            { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
            { icon: FaEnvelope, label: 'Email', url: 'mailto:adarsh@email.com' },
          ].map(({ icon: Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/40 hover:text-white hover:border-white/25 text-xs transition-all"
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
