import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython,
  FaGitAlt, FaGithub, FaBootstrap,
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiDjango, SiSqlite, SiTailwindcss } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5',      icon: FaHtml5,       level: 95 },
      { name: 'CSS3',       icon: FaCss3Alt,      level: 90 },
      { name: 'JavaScript', icon: FaJs,           level: 88 },
      { name: 'React',      icon: FaReact,        level: 85 },
      { name: 'Bootstrap',  icon: FaBootstrap,    level: 80 },
      { name: 'Tailwind',   icon: SiTailwindcss,  level: 82 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs,  level: 83 },
      { name: 'Express', icon: SiExpress, level: 80 },
      { name: 'Django',  icon: SiDjango,  level: 70 },
      { name: 'Python',  icon: FaPython,  level: 72 },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 85 },
      { name: 'SQLite',  icon: SiSqlite,  level: 70 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git',    icon: FaGitAlt, level: 88 },
      { name: 'GitHub', icon: FaGithub, level: 85 },
      { name: 'APIs',   icon: TbApi,    level: 80 },
    ],
  },
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    className="skill-card card-elevated rounded-xl p-4 flex flex-col items-center gap-3"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
  >
    <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xl text-white/70">
      <skill.icon />
    </div>
    <span className="text-white/60 text-xs font-medium">{skill.name}</span>
    <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-green-500 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.07 }}
      />
    </div>
    <span className="text-white/25 text-[10px]">{skill.level}%</span>
  </motion.div>
);

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">What I Know</p>
          <h2 className="section-title text-white">Skills</h2>
          <div className="divider mt-4" />
        </motion.div>

        <div className="space-y-10">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">{cat.title}</h3>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cat.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
