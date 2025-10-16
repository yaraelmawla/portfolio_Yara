import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Logos et bannières
import univ_logo from "../assets/logo_univ.png";
import univ_bordeaux from "../assets/og-default.jpg";

const formations = [
  {
    id: 1,
    logo: univ_logo,
    banner: univ_bordeaux,
    institution: "Université de Bordeaux",
    diplome: "Licence 3 Informatique",
    periode: "2023 – Présent",
    competences: "Programmation (Python, Java, C), Web (HTML, CSS, JS, React), Bases de données (SQL, PostgreSQL)",
  },
];

const FormationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Animation globale
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="formations"
      ref={ref}
      className="relative py-24 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-white via-pink-50 to-fuchsia-100 text-gray-900 overflow-hidden"
    >
      {/* halo d’arrière-plan */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-pink-300 via-fuchsia-400 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-bl from-purple-400 via-fuchsia-300 to-pink-400 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* ✨ En-tête */}
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600">
            Parcours académique
          </h2>
          <div className="mx-auto mt-3 w-32 h-1.5 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 rounded-full" />
        </motion.div>

        {/* 📘 Timeline */}
        <div className="relative">
          {/* Ligne verticale */}
          <motion.div
            variants={timelineVariants}
            className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-pink-400 via-fuchsia-400 to-purple-400 origin-top rounded-full"
          />

          <div className="space-y-12">
            {formations.map((formation) => (
              <motion.div
                key={formation.id}
                variants={itemVariants}
                className="relative pl-16"
              >
                {/* Point de la timeline */}
                <div className="absolute left-0 top-12 transform -translate-x-1/2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-500 border-4 border-white shadow-md" />
                </div>

                {/* Carte principale */}
                <div className="bg-white/90 backdrop-blur-lg border border-pink-200 rounded-3xl shadow-xl hover:shadow-fuchsia-300/40 transition-all duration-300 overflow-hidden">
                  {/* Bannière */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                    <img
                      src={formation.banner}
                      alt={`Photo ${formation.institution}`}
                      className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Contenu */}
                  <div className="p-8 flex flex-col sm:flex-row gap-6">
                    {/* Logo */}
                    <div className="flex-shrink-0 -mt-16 sm:mt-0">
                      <img
                        src={formation.logo}
                        alt={`Logo ${formation.institution}`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg shadow-fuchsia-400/50"
                      />
                    </div>

                    {/* Texte */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {formation.institution}
                      </h3>
                      <p className="text-fuchsia-600 font-medium">
                        {formation.diplome}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formation.periode}
                      </p>

                      <div className="mt-4 pt-4 border-t border-pink-200">
                        <p className="text-gray-700 text-base leading-relaxed">
                          <span className="font-semibold text-fuchsia-600">
                            Compétences :
                          </span>{" "}
                          {formation.competences}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FormationSection;
