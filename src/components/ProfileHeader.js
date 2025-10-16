import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFilePdf } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import avatar from "../assets/image0.jpeg";
import cvFile from "../assets/image0.jpeg";

const NAME = "Yara ELMAWLA";
const TAGLINE = "Étudiante en L3 Informatique à l’Université de Bordeaux • Développement Web • Data & IA";

const LINKS = {
  linkedin: "https://www.linkedin.com/in/yara-elmawla-128369376/",
  github: "https://github.com/yaraelmawla",
  email: "mailto:yara.elmawla@example.com",
};


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProfileHeader() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-32 py-16 lg:pt-[120px]">
      {/* gradient blobs background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-pink-400 via-fuchsia-500 to-purple-600 animate-gradient-move" />
        <div className="absolute right-10 bottom-[-120px] h-64 w-64 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-purple-500 to-pink-400 animate-gradient-move" />
      </div>

      <motion.div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 p-6 md:p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-200"
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        {/* Left: avatar + text */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            whileHover={{ rotate: 2, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative group"
          >
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-pink-400 via-fuchsia-500 to-purple-600">
              <img
                src={avatar}
                alt={`${NAME} portrait`}
                className="block h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full object-cover ring-4 ring-white"
                draggable="false"
              />
            </div>

            <div className="absolute inset-0 hidden place-items-center rounded-full bg-gradient-to-tr from-fuchsia-500/70 to-pink-400/70 group-hover:grid transition-opacity duration-300">
              <span className="text-white font-semibold text-lg select-none"> Yara </span>
            </div>
          </motion.div>

          <div className="text-center sm:text-left">
            <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">
              {NAME}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-fuchsia-700">{TAGLINE}</p>

            <div className="mt-4 flex justify-center sm:justify-start gap-4">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-pink-200 bg-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-300/50 transition"
              >
                <FaLinkedin className="text-fuchsia-600 text-xl" />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-pink-200 bg-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-300/50 transition"
              >
                <FaGithub className="text-fuchsia-600 text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a href={cvFile} download="Cv_Saad_KHATTAB_HPC.pdf" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-2xl font-semibold text-white shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 active:translate-y-[1px] transition bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600"
            >
              <FaFilePdf />
              <span>Télécharger le CV</span>
            </button>
          </a>

          <a href={LINKS.email} className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-2xl font-semibold text-fuchsia-600 bg-white border-2 border-fuchsia-500 hover:border-pink-400 hover:-translate-y-0.5 active:translate-y-[1px] transition"
            >
              <HiOutlineMail />
              <span>Me contacter</span>
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
