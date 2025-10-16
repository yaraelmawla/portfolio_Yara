import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPython,
  faJs,
  faHtml5,
  faCss3Alt,
  faJava,
  faGitAlt,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faUsers,
  faLightbulb,
  faComments,
  faBrain,
  faChartLine,
  faClock,
  faLaptopCode,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';

/* --------------------------------------------------
   SkillBar – single skill with animated progress bar
-------------------------------------------------- */
const SkillBar = ({ skill, percentage, icon, variants, colorFrom, colorTo }) => {
  const getLevel = (pct) =>
    pct >= 80 ? 'Avancé' : pct >= 60 ? 'Intermédiaire' : 'Débutant';

  return (
    <motion.div variants={variants} className="w-full p-2">
      <div className="bg-white/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-pink-100 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-fuchsia-600 text-lg">
            <FontAwesomeIcon icon={icon} />
          </div>
          <h4 className="font-semibold text-gray-800 text-base">
            {skill}
          </h4>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
            className={`h-2 rounded-full bg-gradient-to-r ${colorFrom} ${colorTo}`}
          />
        </div>

        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-500">{getLevel(percentage)}</span>
          <span className="text-fuchsia-600">{percentage}%</span>
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------
   Categories adaptées à une étudiante de L3
-------------------------------------------------- */
const categories = [
  {
    name: 'Langages & Développement Web',
    colorFrom: 'from-pink-400',
    colorTo: 'to-fuchsia-500',
    skills: [
      { skill: 'Python', percentage: 75, icon: faPython },
      { skill: 'JavaScript (ES6+)', percentage: 65, icon: faJs },
      { skill: 'HTML5 / CSS3', percentage: 80, icon: faHtml5 },
      { skill: 'React (bases)', percentage: 60, icon: faReact },
      { skill: 'Java', percentage: 70, icon: faJava },
    ],
  },
  {
    name: 'Bases de Données & Outils',
    colorFrom: 'from-fuchsia-400',
    colorTo: 'to-purple-500',
    skills: [
      { skill: 'SQL / PostgreSQL', percentage: 65, icon: faDatabase },
      { skill: 'Git & GitHub', percentage: 70, icon: faGitAlt },
      { skill: 'VSCode / IntelliJ', percentage: 80, icon: faLaptopCode },
      { skill: 'Notions de DevOps (CI/CD)', percentage: 45, icon: faCodeBranch },
    ],
  },
  {
    name: 'Soft Skills',
    colorFrom: 'from-pink-400',
    colorTo: 'to-purple-500',
    skills: [
      { skill: 'Travail en équipe', percentage: 85, icon: faUsers },
      { skill: 'Communication', percentage: 80, icon: faComments },
      { skill: 'Organisation / Gestion du temps', percentage: 75, icon: faClock },
      { skill: 'Curiosité et apprentissage continu', percentage: 90, icon: faLightbulb },
      { skill: 'Esprit d’analyse & résolution de problèmes', percentage: 70, icon: faBrain },
    ],
  },
];

/* --------------------------------------------------
   Main Component
-------------------------------------------------- */
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      className="w-full py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-pink-50 to-fuchsia-100"
      ref={ref}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 mb-2">
            Compétences techniques & personnelles
          </h2>
          <div className="mx-auto h-1.5 w-24 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 rounded-full" />
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Un aperçu de mes compétences techniques acquises en formation et de mes qualités personnelles développées au fil de mes projets à l’Université de Bordeaux.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/90 rounded-3xl p-6 shadow-lg border border-pink-100 hover:shadow-fuchsia-200 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-center text-fuchsia-600 mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap -mx-2">
                {category.skills.map((s, i) => (
                  <SkillBar
                    key={i}
                    skill={s.skill}
                    percentage={s.percentage}
                    icon={s.icon}
                    colorFrom={category.colorFrom}
                    colorTo={category.colorTo}
                    variants={itemVariants}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
