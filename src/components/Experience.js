import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Logos ou visuels (à remplacer par ceux que tu possèdes)
import projectLab from "../assets/image_1.jpg";
import algoImg from "../assets/image_2.jpg";
import modelImg from "../assets/image_3.jpg";
import linuxImg from "../assets/image_4.jpg";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }
  };

 const experiences = [
  {
    id: 1,
    title: "Conception et développement logiciel",
    date: "2024-2025",
    institution: "Université Bordeaux",
    location: "Bordeaux, France",
    imageUrl: projectLab,
    summary: "Création de programmes efficaces en C et OCaml, intégration de solutions modulaires et fonctionnelles pour résoudre des problèmes complexes.",
    tasks: [
      "Création de programmes modulaires et fonctionnels",
      "Développement de solutions logicielles performantes",
      "Résolution de problèmes complexes en C et OCaml"
    ],
    skills: ["C", "OCaml", "Programmation fonctionnelle", "Modularité", "Développement logiciel"]
  },
  {
    id: 2,
    title: "Algorithmique et structures de données avancées",
    date: "2024-2025",
    institution: "Université Bordeaux",
    location: "Bordeaux, France",
    imageUrl: algoImg,
    summary: "Optimisation et implémentation d’algorithmes sur des graphes et d’autres structures, avec une attention particulière à la performance et à la robustesse.",
    tasks: [
      "Implémentation d’algorithmes sur des graphes",
      "Optimisation des structures de données",
      "Conception de solutions performantes et robustes"
    ],
    skills: ["Algorithmique", "Graphes", "Structures de données", "Optimisation", "Performance"]
  },
  {
    id: 3,
    title: "Modélisation et analyse de systèmes",
    date: "2024-2025",
    institution: "Université Bordeaux",
    location: "Bordeaux, France",
    imageUrl: modelImg,
    summary: "Élaboration de modèles de calcul et de simulations pour analyser et résoudre des situations pratiques et théoriques.",
    tasks: [
      "Conception de modèles de calcul",
      "Réalisation de simulations pour l’analyse de systèmes",
      "Résolution de situations pratiques et théoriques"
    ],
    skills: ["Modélisation", "Simulation", "Analyse de systèmes", "Calcul", "Résolution de problèmes"]
  },
  {
    id: 4,
    title: "Maîtrise des environnements techniques",
    date: "2024-2025",
    institution: "Université Bordeaux",
    location: "Bordeaux, France",
    imageUrl: linuxImg,
    summary: "Utilisation avancée de GNU/Linux, gestion des processus, de la mémoire et des fichiers pour des applications performantes et fiables.",
    tasks: [
      "Gestion des processus et de la mémoire sous GNU/Linux",
      "Manipulation avancée des fichiers et systèmes",
      "Développement d’applications fiables et performantes"
    ],
    skills: ["GNU/Linux", "Gestion de processus", "Gestion de mémoire", "Fiabilité", "Performance"]
  }
];


  return (
    <section
      id="experience"
      ref={ref}
      className="relative w-full py-24 px-4 sm:px-8 lg:px-24 bg-gradient-to-b from-white via-pink-50 to-fuchsia-100 text-gray-900"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        {/* En-tête de section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600">
            Apprentissages & Réalisations
          </h2>
          <div className="mx-auto mt-4 w-28 h-1.5 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* ligne verticale de la timeline */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-pink-400 via-fuchsia-400 to-purple-500 origin-top rounded-full shadow-md"
          ></motion.div>

          <div className="space-y-20">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative pl-20 sm:pl-24"
              >
                {/* point sur la timeline */}
                <div className="absolute left-8 top-6 transform -translate-x-1/2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-500 border-4 border-white shadow-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Carte expérience / projet */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-pink-200 shadow-xl hover:shadow-fuchsia-300/40 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <img
                      src={exp.imageUrl}
                      alt={exp.institution}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {exp.title}
                          </h3>
                          <p className="text-fuchsia-600 font-semibold">
                            {exp.institution}
                          </p>
                        </div>
                        <p className="text-gray-600 font-medium mt-2 sm:mt-0">
                          {exp.date}
                        </p>
                      </div>

                      <p className="mt-4 text-base text-gray-700 bg-pink-50/80 p-4 rounded-lg border border-pink-100">
                        {exp.summary}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3 text-gray-900">
                          Mes contributions :
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {exp.tasks.map((task, i) => (
                            <motion.li
                              key={i}
                              whileHover={{ x: 5 }}
                              className="flex items-start gap-3 bg-white border border-pink-100 rounded-lg p-3 shadow-sm"
                            >
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-fuchsia-600 flex items-center justify-center text-white text-xs mt-1">
                                ✓
                              </div>
                              <p className="text-sm text-gray-700">
                                {task}
                              </p>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-2 text-gray-900">
                          Compétences :
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-100 via-fuchsia-100 to-purple-100 text-fuchsia-800 shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
