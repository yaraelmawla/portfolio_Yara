import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

import java from '../assets/1760479135219.pdf';
import python from '../assets/1760560961863.pdf';
import pix from '../assets/1759957742529.pdf';
import english from '../assets/1759958542398.pdf';

import pixLogo from '../assets/pix.png';
import frenchLogo from '../assets/french.png';
import englishLogo from '../assets/english.jpeg';

// ---- Data ---------------------------------------------------------------
const certificates = [
  {
    id: 'cisco-js',
    title: 'JavaScript',
    issuer: 'Cisco Networking Academy',
    date: 'oct. 2025',
    expires: '—',
    credentialId: 'JS-2025-001',
    skills: ['Programmation', 'Web', 'JavaScript'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
    pdf: java,
  },
  {
    id: 'cisco-python',
    title: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'oct. 2025',
    expires: '—',
    credentialId: 'PY-2025-002',
    skills: ['Python', 'Algorithmique', 'Programmation'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
    pdf: python,
  },
  {
    id: 'pix',
    title: 'Compétence PIX',
    issuer: 'Pix',
    date: 'janv. 2024',
    expires: '—',
    credentialId: 'PIX-2024-003',
    skills: ['Compétences numériques', 'Bureautique', 'Sécurité en ligne'],
    logo: pixLogo ,
    pdf: pix,
  },
  {
    id: 'fr-b2',
    title: 'Français B2',
    issuer: 'Institut Français du Liban',
    date: 'mai 2023',
    expires: '—',
    credentialId: 'FR-B2-2023-004',
    skills: ['Français', 'Communication', 'Expression écrite et orale'],
    logo: frenchLogo ,
    pdf: 'French_certificate.pdf',
  },
  {
    id: 'en-b2',
    title: 'English B2',
    issuer: 'American Learning Center',
    date: 'mars 2022',
    expires: '—',
    credentialId: 'EN-B2-2022-005',
    skills: ['English', 'Communication', 'Listening & Writing'],
    logo: englishLogo ,
    pdf: english,
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
            className="relative z-[121] w-full max-w-5xl overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 230, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 p-4">
              <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-10 w-10 object_contain" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="grid max-h-[75vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
              <div className="border-b border-gray-100 p-4 md:border-b-0 md:border-r">
                {cert.pdf ? (
                  <iframe title={`${cert.title} PDF`} src={cert.pdf} className="h-[60vh] w-full rounded-lg" />
                ) : (
                  <div className="flex h-[60vh] items-center justify-center rounded-lg border border-dashed">
                    <p className="text-sm text-gray-500">PDF non disponible</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 p-6">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Identifiant :</span> {cert.credentialId || '—'}
                </p>

                {cert.skills?.length ? (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-900">Compétences associées</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((s, i) => (
                        <span key={i} className="rounded-full bg-pink-100 px-2 py-1 text-[11px] font-medium text-fuchsia-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {cert.pdf ? (
                    <>
                      <a
                        href={cert.pdf}
                        download
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md hover:-translate-y-0.5 transition"
                      >
                        Télécharger le PDF
                      </a>
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-fuchsia-500 px-4 py-2 text-sm font-semibold text-fuchsia-600 hover:-translate-y-0.5 transition"
                      >
                        Ouvrir dans un onglet
                      </a>
                    </>
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
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(217, 70, 239, 0.25)' }}
      className="cursor-pointer rounded-2xl border border-pink-100 bg-white p-6 shadow-md transition-shadow duration-300"
      onClick={() => onOpen(cert)}
    >
      <div className="flex items-start gap-5">
        <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-14 w-14 flex-shrink-0 rounded-lg object-contain" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
              <p className="text-fuchsia-600 font-medium">{cert.issuer}</p>
            </div>
            <div className="select-none rounded-full bg-fuchsia-50 px-3 py-1 text-xs text-fuchsia-700">
              {cert.date}
            </div>
          </div>

          {cert.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {cert.skills.map((skill, idx) => (
                <span key={idx} className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-600">
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
    <section id="certificates" ref={ref} className="w-full bg-gradient-to-b from-white via-pink-50 to-fuchsia-100 py-24 px-6 sm:px-12 lg:px-20">
      <motion.div className="mx-auto max-w-5xl" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants}>
        <motion.header variants={itemVariants} className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600">
            Certificates
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600" />
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
