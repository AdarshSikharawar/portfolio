import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'FOREVER — E-Commerce',
    emoji: '🛒',
    image: '/projects/ecommerce.png',
    description: 'Full-stack fashion e-commerce with product collections, cart, admin panel, and user authentication.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'QuickGPT — AI Assistant',
    emoji: '🤖',
    image: '/projects/quickgpt.png',
    description: 'AI-powered chat application with conversation history, dark mode, and credit-based usage system.',
    tags: ['React', 'OpenAI API', 'Node.js', 'JWT', 'Express'],
    github: 'https://github.com',
    live: 'https://quick-gpt.vercel.app',
  },
  {
    id: 3,
    title: 'This Portfolio',
    emoji: '🚀',
    image: '/projects/portfolio.png',
    description: 'Monochrome MERN stack portfolio with ReactBits ShapeGrid background, Framer Motion animations, and scroll reveal effects.',
    tags: ['React', 'Framer Motion', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 4,
    title: 'MCA Public School',
    emoji: '🏫',
    image: '/projects/school.png',
    description: 'Modern school website with admissions 2025, academics, facilities, gallery, and contact sections.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    emoji: '🌤️',
    image: '/projects/weather.png',
    description: 'Glassmorphism weather app showing real-time forecast, popular cities, and weekly summaries for any location.',
    tags: ['React', 'OpenWeather API', 'CSS', 'Geolocation'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 6,
    title: 'PyGenix — Python Code Runner',
    emoji: '🐍',
    image: '/projects/pygenix.png',
    description: 'Web-based Python code runner with file management, live output, collaborate mode, theme switcher, and input support. Backend powered by Django.',
    tags: ['Django', 'Python', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const showImage = project.image && !imgError;

  return (
    <motion.div
      className="project-card card rounded-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.015)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Screenshot preview */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-white/[0.06] bg-[#0d0d0d]">
        {showImage ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.4s ease' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
            {project.emoji}
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent pointer-events-none" />
      </div>

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white leading-tight">{project.title}</h3>
          <div className="flex gap-1.5 ml-2 shrink-0">
            <a href={project.github} target="_blank" rel="noreferrer"
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/40 hover:text-white transition-colors">
              <FaGithub size={13} />
            </a>
            <a href={project.live} target="_blank" rel="noreferrer"
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/40 hover:text-white transition-colors">
              <FaExternalLinkAlt size={13} />
            </a>
          </div>
        </div>

        <p className="text-white/35 text-[12px] leading-relaxed flex-1 mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">What I&apos;ve Built</p>
          <h2 className="section-title text-white">Projects</h2>
          <div className="divider mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
