import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import project_img1 from '../assets/project1.png';

// -----------------------------
// 🎓 Données – Projets typiques L2/L3 Université de Bordeaux
// -----------------------------
const allProjects = [
  {
    title: 'Application Web de Gestion de Bibliothèque',
    image: project_img1,
    date: 'Mars – Juin 2025',
    description:
      "Développement complet d’une application web permettant la gestion d’un catalogue de livres, des emprunts et du profil utilisateur.",
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'TailwindCSS'],
    theme: 'Développement Web',
    details: {
      overview:
        "Projet de fin de semestre réalisé en équipe de 4. L’objectif était de concevoir une application web fonctionnelle et responsive, intégrant une API REST sécurisée et une base de données relationnelle.",
      highlights: [
        'Architecture full-stack (React + Node + PostgreSQL)',
        'Système d’authentification JWT et gestion des rôles',
        'Responsive design et accessibilité',
        'Déploiement sur Render / Vercel'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  },
  {
    title: 'Projet d’Intelligence Artificielle — Jeu du Morpion',
    image: project_img1,
    date: 'Novembre 2024 – Janvier 2025',
    description:
      'Implémentation d’un agent intelligent capable de jouer au morpion avec apprentissage minimax et heuristiques d’évaluation.',
    skills: ['Python', 'Pygame', 'Minimax', 'IA de jeu', 'Algorithmique'],
    theme: 'Intelligence Artificielle',
    details: {
      overview:
        "Projet de L3 en algorithmique et IA. Implémentation d’un agent autonome capable d’apprendre et de s’adapter à l’adversaire.",
      highlights: [
        'Implémentation de l’algorithme Minimax avec élagage Alpha-Bêta',
        'Interface graphique avec Pygame',
        'Comparaison des heuristiques d’évaluation',
        'Expérimentation sur différents niveaux de difficulté'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  },
  {
    title: 'Analyse de Données et Visualisation Covid-19',
    image: project_img1,
    date: 'Mars – Avril 2024',
    description:
      "Traitement et visualisation de données ouvertes (OpenData Santé) pour analyser l’évolution du Covid-19 en France.",
    skills: ['Python', 'Pandas', 'Matplotlib', 'Plotly', 'DataViz'],
    theme: 'Science des Données',
    details: {
      overview:
        "Projet de L2 sur le traitement et la visualisation de données publiques. Objectif : construire des indicateurs pertinents et proposer une interface interactive.",
      highlights: [
        'Nettoyage et fusion de plusieurs jeux de données OpenData',
        'Analyse statistique des tendances',
        'Création de dashboards interactifs avec Plotly',
        'Présentation orale du projet et rapport technique'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  },
  {
    title: 'Mini-Jeu 2D – Aventure en Pygame',
    image: project_img1,
    date: 'Octobre – Décembre 2023',
    description:
      "Création d’un jeu vidéo 2D en Python avec gestion des collisions, sons et animations.",
    skills: ['Python', 'Pygame', 'Design de jeu', 'Sprites', 'Animation'],
    theme: 'Programmation & Graphisme',
    details: {
      overview:
        "Projet de L2 pour valider la matière Programmation orientée objet. Objectif : créer un jeu complet avec logique, physique et interface utilisateur.",
      highlights: [
        'Architecture orientée objet (héritage, encapsulation)',
        'Gestion des collisions et animations sprites',
        'Système de score et niveaux de difficulté',
        'Musique et effets sonores intégrés'
      ],
      links: { repo: '', demo: '', paper: '' }
    }
  }
];

// -----------------------------
// Groupement par thème
// -----------------------------
const themesOrder = [
  'Développement Web',
  'Intelligence Artificielle',
  'Science des Données',
  'Programmation & Graphisme'
];

const themedProjects = themesOrder.reduce((acc, theme) => {
  acc[theme] = allProjects.filter((p) => p.theme === theme).slice(0, 4);
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
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const projectCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
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
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden bg-white shadow-2xl border border-pink-200"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="relative h-56">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
// 🌈 Composant principal
// -----------------------------
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeCard, setActiveCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" ref={ref} className="bg-gradient-to-b from-white via-pink-50 to-fuchsia-100 py-20 px-6">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants} className="max-w-7xl mx-auto">
        {/* Titre */}
        <motion.div variants={themeBlockVariants} className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600">
            Projets académiques
          </h2>
          <div className="mx-auto mt-3 h-1.5 w-28 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 rounded-full" />
        </motion.div>

        {/* Grille */}
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
