import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ---- Data ---------------------------------------------------------------
// Logos use remote URLs for convenience; replace with local assets if you prefer.
const certificates = [
  
  {
    id: 'delf',
    title: 'Diplôme d’Études en Langue Française (DELF B2)',
    issuer: 'Ministère de l’Éducation nationale – France Éducation International',
    date: 'juin 2024',
    expires: '—', // ce diplôme est à validité permanente
    credentialId: 'FR-DELFB2-2024-12456',
    skills: ['Français', 'Communication', 'Compréhension écrite et orale'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/France_Education_International_logo.svg',
  },
];

// ---- Animations ---------------------------------------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ---- Modal --------------------------------------------------------------
function CertModal({ cert, onClose }) {
  // focus & scroll lock
  useEffect(() => {
    if (!cert) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          onClick={onClose}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            className="relative z-[121] w-full max-w-5xl overflow-hidden rounded-2xl border border-indigo-500/20 bg-white shadow-2xl dark:bg-gray-900"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 230, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 p-4 dark:border-gray-800">
              <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-10 w-10 object-contain" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{cert.issuer} • {cert.date}{cert.expires ? ` • expire ${cert.expires}` : ''}</p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="grid max-h-[75vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
              {/* PDF Preview */}
              <div className="border-b border-gray-100 p-4 md:border-b-0 md:border-r dark:border-gray-800">
                {cert.pdf ? (
                  <iframe title={`${cert.title} PDF`} src={cert.pdf} className="h-[60vh] w-full rounded-lg" />
                ) : (
                  <div className="flex h-[60vh] items-center justify-center rounded-lg border border-dashed">
                    <p className="text-sm text-gray-500 dark:text-gray-400">PDF non disponible</p>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-200"><span className="font-medium">Identifiant :</span> {cert.credentialId || '—'}</p>
                </div>

                {cert.skills?.length ? (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Compétences</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((s, i) => (
                        <span key={i} className="rounded-full bg-indigo-100 px-2 py-1 text-[11px] font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{s}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {cert.pdf ? (
                    <a
                      href={cert.pdf}
                      download
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md hover:-translate-y-0.5 transition"
                    >
                      Télécharger le PDF
                    </a>
                  ) : null}
                  {cert.pdf ? (
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-indigo-500 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:-translate-y-0.5 transition"
                    >
                      Ouvrir dans un onglet
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---- Card ---------------------------------------------------------------
function CertificateCard({ cert, onOpen }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)' }}
      className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 dark:border-gray-700 dark:bg-gray-900"
      onClick={() => onOpen(cert)}
    >
      <div className="flex items-start gap-5">
        <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-14 w-14 flex-shrink-0 rounded-lg object-contain" loading="lazy" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
              <p className="text-indigo-700 dark:text-indigo-300 font-medium">{cert.issuer}</p>
            </div>
            <div className="select-none rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {cert.date}{cert.expires ? ` • exp. ${cert.expires}` : ''}
            </div>
          </div>

          {cert.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {cert.skills.map((skill, idx) => (
                <span key={idx} className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/70 dark:text-indigo-200">
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-4 select-text border-t border-gray-200 pt-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
            <span className="font-medium">ID :</span> {cert.credentialId || '—'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ---- Main ---------------------------------------------------------------
export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.15, once: true });

  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" ref={ref} className="w-full bg-white py-24 px-6 dark:bg-[#01161E] sm:px-12 lg:px-20">
      <motion.div className="mx-auto max-w-5xl" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants}>
        <motion.header variants={itemVariants} className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Certifications</h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-indigo-500 dark:bg-indigo-400" />
        </motion.header>

        <div className="grid gap-8 sm:grid-cols-2">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} onOpen={setSelected} />
          ))}
        </div>
      </motion.div>

      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
