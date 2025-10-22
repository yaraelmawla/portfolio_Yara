// src/App.js
import { motion, AnimatePresence } from 'framer-motion';
import Head from './components/Head';
import ProfileHeader from "./components/ProfileHeader";
import AboutMe from "./components/AboutMe";
import Formation from "./components/FormationSection"
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-b from-pink-50 via-white to-fuchsia-100 text-gray-900">
      {/* 🩷 Navigation */}
      <Head />

      <AnimatePresence mode="wait">
        {/* 💫 Header animé */}
        <motion.div
          key="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileHeader />
        </motion.div>

        {/* 🌸 Section “À propos de moi” */}
        <motion.div
          key="about"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AboutMe />
        </motion.div>

        <motion.div
          key="formation"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Formation />
        </motion.div>

        <motion.div
          key="Experience"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Experience />
        </motion.div>

        <motion.div
          key="Projects"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Projects />
        </motion.div>

        <motion.div
          key="Skills"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Skills />
        </motion.div>


        <motion.div
          key="Certificates"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Certificates />
        </motion.div>
      </AnimatePresence>

      {/* ✨ Footer */}
      <footer className="text-center py-10 text-sm text-fuchsia-700/80">
  Portfolio ELMAWLA Yara
</footer>

    </div>
  );
}

export default App;
