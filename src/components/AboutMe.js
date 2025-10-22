import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import pdp from "../assets/image0.jpeg"; // à remplacer par ta propre photo

const aboutMeContent = {
  intro1: "Actuellement étudiante en ",
  highlight1: "3ᵉ année de Licence Informatique",
  intro2: " à l’",
  highlight2: "Université de Bordeaux",
  intro3: ", je suis passionnée par le ",
  highlight3: "développement logiciel, l’intelligence artificielle et les nouvelles technologies",
  intro4: ". Je suis à la recherche d’une ",
  highlight4: "alternance à partir de septembre 2025",
  intro5: " afin de renforcer mes compétences techniques et professionnelles au sein d’une équipe innovante.",

  block2_1: "Ma formation m’a permis d’acquérir des bases solides en ",
  highlight5: "programmation (Python, Java, C)",
  block2_2: ", en ",
  highlight6: "développement web (HTML, CSS, JavaScript, React)",
  block2_3: ", ainsi qu’en ",
  highlight7: "bases de données (SQL, PostgreSQL)",
  block2_4: ". J’aime concevoir des applications complètes et apprendre de nouvelles technologies.",

  block3_1: "J’ai participé à plusieurs projets universitaires, notamment un ",
  highlight8: "projet de site web collaboratif",
  block3_2: " et un ",
  highlight9: "système de gestion de tâches en React",
  block3_3: ", où j’ai pu développer mes compétences en travail d’équipe, en Git et en méthodologie agile.",

  block4_1: "Curieuse, rigoureuse et motivée, je souhaite rejoindre une entreprise où je pourrai ",
  highlight10: "contribuer à des projets concrets",
  block4_2: " tout en continuant à progresser en tant que développeuse et future ingénieure en informatique.",
};

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-gradient-to-b from-white via-pink-50 to-fuchsia-100 text-gray-900"
    >
      {/* 🌸 Dégradé de fond doux */}
      <div className="absolute inset-0 z-0 opacity-25">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/30 via-fuchsia-300/30 to-purple-300/30 animate-gradient-move" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col items-center"
      >
        {/* 🌈 Titre de section */}
        <motion.div variants={itemVariants} className="mb-24 text-center w-full">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600">
            À propos de moi
          </h2>
          <div className="mx-auto mt-4 h-2 w-56 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 rounded-full" />
        </motion.div>

        {/* 👩‍🎓 Image + texte */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-x-20 gap-y-16 w-full">
          {/* Photo */}
          <motion.div
            variants={imageVariants}
            className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] overflow-hidden shadow-2xl ring-4 ring-pink-300/50 rounded-full hover:scale-[1.03] transition-transform duration-500 bg-white"
          >
            <img
              src={pdp}
              alt="Yara ELMAWLA"
              className="w-full h-full object-cover object-center scale-110 rounded-full transition-transform duration-500"
              style={{ backgroundColor: "white" }}
            />
          </motion.div>

          {/* 📝 Texte */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-y-8 flex-grow max-w-3xl">
            {/* Bloc intro */}
            <motion.div variants={itemVariants} className="p-6 bg-white shadow-md rounded-2xl border border-pink-100">
              <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {aboutMeContent.intro1}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight1}</span>
                {aboutMeContent.intro2}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight2}</span>
                {aboutMeContent.intro3}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight3}</span>
                {aboutMeContent.intro4}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight4}</span>
                {aboutMeContent.intro5}
              </p>
            </motion.div>

            {/* Bloc technique */}
            <motion.div variants={itemVariants} className="p-6 bg-white shadow-md rounded-2xl border border-pink-100">
              <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {aboutMeContent.block2_1}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight5}</span>
                {aboutMeContent.block2_2}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight6}</span>
                {aboutMeContent.block2_3}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight7}</span>
                {aboutMeContent.block2_4}
              </p>
            </motion.div>

            {/* Bloc projets */}
            <motion.div variants={itemVariants} className="p-6 bg-white shadow-md rounded-2xl border border-pink-100">
              <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {aboutMeContent.block3_1}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight8}</span>
                {aboutMeContent.block3_2}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight9}</span>
                {aboutMeContent.block3_3}
              </p>
            </motion.div>

            {/* Bloc final */}
            <motion.div variants={itemVariants} className="p-6 bg-white shadow-md rounded-2xl border border-pink-100">
              <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {aboutMeContent.block4_1}
                <span className="font-semibold text-fuchsia-600">{aboutMeContent.highlight10}</span>
                {aboutMeContent.block4_2}
              </p>
            </motion.div>
          </div>
        </div>

        {/* 🌷 Bouton contact */}
        <motion.div variants={itemVariants} className="mt-20 w-full flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold text-xl hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            Me contacter <ArrowRight className="w-7 h-7 ml-2" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
