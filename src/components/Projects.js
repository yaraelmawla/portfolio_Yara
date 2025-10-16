import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ub_logo from '../assets/bash.jpg';
import UBGame from '../assets/ubgarden.png';
import ProgWeb from '../assets/website-g61c1c6079_1280.jpg';
import cProject from '../assets/formation-langage-c-avance.png'

// -----------------------------
// 📚 Données – Projets L3 Informatique Université de Bordeaux
// -----------------------------
const allProjects = [
  {
    title: 'Programmation Orientée Objet — Sauve le hérisson !',
    image: UBGame,
    date: 'mars 2025 – avr. 2025',
    description:
      'Développement d’un jeu interactif en Java dans le cadre du cours de Programmation Orientée Objet, illustrant l’héritage, l’encapsulation et le polymorphisme.',
    skills: ['Java', 'POO', 'IntelliJ IDEA', 'Héritage', 'Interfaces'],
    theme: 'Programmation Objet',
    details: {
      overview:
        "J’ai développé un jeu intitulé « Sauve le hérisson ! » en appliquant les principes fondamentaux de la programmation orientée objet. Le projet incluait la gestion des états de jeu, la lecture dynamique de fichiers `.properties`, et la conception modulaire du code via classes abstraites et interfaces.",
      highlights: [
        'Implémentation de la logique de déplacement et d’interactions entre personnages',
        'Gestion de l’énergie, des bonus, et des états du jeu',
        'Structuration du code autour d’interfaces et classes abstraites',
        'Réutilisabilité et modularité accrues du code'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  },
  {
    title: 'Projet Techno — Jeu en C avec SDL2',
    image: cProject,
    date: 'sept. 2024 – avr. 2025',
    description:
      'Développement d’un jeu interactif en C avec SDL2, combinant structures de données avancées, logique de jeu et interface graphique.',
    skills: ['Langage C', 'SDL2', 'Structures de données', 'Débogage', 'Optimisation'],
    theme: 'Programmation Système',
    details: {
      overview:
        "Conception d’un mini-jeu en C combinant programmation système et développement graphique. L’objectif était de représenter et manipuler efficacement les formes du jeu tout en optimisant les performances.",
      highlights: [
        'Utilisation de structures `struct` et tableaux 2D pour la logique du jeu',
        'Gestion des entrées utilisateur et conditions de victoire',
        'Optimisation mémoire et calculs en temps réel',
        'Implémentation graphique avec SDL2'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  },
  {
    title: 'Environnement de Travail Avancé — Scripts Bash',
    image: ub_logo,
    date: 'sept. 2024 – oct. 2024',
    description:
      'Formation sur Unix/Linux, administration système et programmation shell pour automatiser des processus et gérer l’environnement utilisateur.',
    skills: ['Bash', 'Shell', 'Linux', 'Scripts', 'Optimisation terminal'],
    theme: 'Systèmes & Réseaux',
    details: {
      overview:
        "Apprentissage de la programmation shell avancée sous GNU/Linux : manipulation des processus, redirections, automatisation de tâches et configuration du shell utilisateur.",
      highlights: [
        'Création de scripts d’automatisation (boucles, conditions, pipes)',
        'Gestion des processus système et variables d’environnement',
        'Utilisation d’outils Unix : grep, find, sort, ps, top, etc.',
        'Optimisation de l’efficacité en terminal'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  },
  {
    title: 'Développement Web et Base de Données',
    image: ProgWeb,
    date: 'janv. 2024 – juin 2024',
    description:
      "Développement d’une application web dynamique intégrant un mur d’images et un système de login sécurisé.",
    skills: ['HTML', 'CSS', 'JavaScript', 'DOM', 'Project Management'],
    theme: 'Développement Web',
    details: {
      overview:
        "Création d’une application complète permettant aux utilisateurs de se connecter et d’interagir via un mur d’images dynamique (likes, commentaires).",
      highlights: [
        'Création d’interfaces dynamiques (HTML/CSS/JS)',
        'Gestion d’état côté client et manipulation du DOM',
        'Mise en place d’un système d’authentification',
        'Implémentation de fonctionnalités sociales interactives'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  }
];

// -----------------------------
// Groupement par thème
// -----------------------------
const themesOrder = [
  'Programmation Objet',
  'Programmation Système',
  'Systèmes & Réseaux',
  'Développement Web'
];

const themedProjects = themesOrder.reduce((acc, theme) => {
  acc[theme] = allProjects.filter((p) => p.theme === theme);
  return acc;
}, {});

// -----------------------------
// Animations
// -----------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const themeBlockVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const projectCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

// -----------------------------
// Modal
// -----------------------------
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden bg-white shadow-2xl border border-fuchsia-200"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="relative h-56">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-white/90 rounded-full w-10 h-10 text-lg font-bold text-gray-800 hover:bg-white"
              >×</button>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-sm opacity-90">{project.date}</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">{project.details.overview}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {project.details.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 via-fuchsia-100 to-purple-100 text-fuchsia-700 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -----------------------------
// Carte de projet
// -----------------------------
function ProjectCard({ project, idx, isActive, setActive, onOpen }) {
  return (
    <motion.div
      variants={projectCardVariants}
      className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
      onClick={() => onOpen(project)}
      onMouseEnter={() => setActive(`${project.theme}-${idx}`)}
      onMouseLeave={() => setActive(null)}
    >
      <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 group-hover:from-fuchsia-700/50 transition-colors duration-500" />
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h4 className="text-md font-semibold">{project.title}</h4>
        <p className="text-xs opacity-90">{project.date}</p>
      </div>
    </motion.div>
  );
}

// -----------------------------
// 🌸 Composant principal
// -----------------------------
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeCard, setActiveCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" ref={ref} className="bg-gradient-to-b from-white via-pink-50 to-fuchsia-100 py-20 px-6">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants} className="max-w-7xl mx-auto">
        <motion.div variants={themeBlockVariants} className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600">
            Projets universitaires
          </h2>
          <div className="mx-auto mt-3 h-1.5 w-28 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {themesOrder.map((theme) => (
            <motion.div key={theme} variants={themeBlockVariants} className="rounded-3xl border border-pink-200 bg-white/80 backdrop-blur-md p-6 shadow-lg hover:shadow-fuchsia-300/40 transition-all">
              <h3 className="mb-6 text-center text-2xl font-bold text-fuchsia-700">{theme}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {themedProjects[theme].map((p, idx) => (
                  <ProjectCard key={idx} project={p} idx={idx} isActive={activeCard === `${p.theme}-${idx}`} setActive={setActiveCard} onOpen={setSelectedProject} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
