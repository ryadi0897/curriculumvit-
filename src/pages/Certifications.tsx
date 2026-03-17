import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: "Simulation ANSYS Mécanique",
      issuer: "ANSYS Inc.",
      date: "Juin 2023",
      id: "ANS-12345",
      skills: ["Analyse par Éléments Finis", "Simulation Structurale", "Maillage"],
      image: "https://picsum.photos/seed/cert1/400/300"
    },
    {
      title: "Python pour l'Analyse de Données",
      issuer: "Coursera / IBM",
      date: "Mars 2023",
      id: "COUR-PY-789",
      skills: ["Pandas", "NumPy", "Matplotlib", "Data Cleaning"],
      image: "https://picsum.photos/seed/cert2/400/300"
    },
    {
      title: "CATIA V5 Certified Associate",
      issuer: "Dassault Systèmes",
      date: "Décembre 2022",
      id: "DS-CAT-001",
      skills: ["Part Design", "Assembly Design", "Drafting"],
      image: "https://picsum.photos/seed/cert3/400/300"
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#f8f7f4]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">Validation</span>
          <h1 className="text-5xl font-serif font-bold mb-6">Mes Certifications</h1>
          <p className="text-gray-500 text-lg">
            Reconnaissances officielles de mes compétences techniques acquises via des programmes de formation certifiants.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-[#e2e1da] p-8 flex flex-col md:flex-row gap-8 hover:border-blue-600 transition-all group"
            >
              <div className="w-full md:w-32 h-32 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Award size={48} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <Calendar size={12} />
                  {cert.date}
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <div className="text-gray-500 text-sm mb-6">{cert.issuer}</div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-[#f0efe9] rounded-full text-[10px] font-medium text-gray-500">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
                  <CheckCircle2 size={14} />
                  Vérifier l'authenticité
                  <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
