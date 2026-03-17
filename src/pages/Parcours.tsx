import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export default function Parcours() {
  const formations = [
    {
      year: "2021 - Présent",
      title: "Cycle d'Ingénieur en Mécatronique",
      school: "ENSAM Casablanca",
      location: "Casablanca, Maroc",
      desc: "Spécialisation en systèmes aéronautiques et automobiles. Étude approfondie de la mécanique, électronique et automatique.",
      details: [
        "Conception mécanique (CATIA V5/V6)",
        "Systèmes embarqués (STM32, Arduino)",
        "Automatique et asservissement",
        "Simulation EF (ANSYS)"
      ]
    },
    {
      year: "2019 - 2021",
      title: "Classes Préparatoires aux Grandes Écoles",
      school: "CPGE - Filière MPSI/MP",
      location: "Maroc",
      desc: "Formation intensive en mathématiques et physique de haut niveau.",
      details: [
        "Mathématiques approfondies",
        "Physique et Sciences de l'ingénieur",
        "Informatique (Python)",
        "Préparation aux concours nationaux"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">Formation</span>
          <h1 className="text-5xl font-serif font-bold mb-12">Mon Parcours Académique</h1>
          
          <div className="space-y-16">
            {formations.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 border-l-2 border-blue-600/20"
              >
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-[#f8f7f4]"></div>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    {edu.year}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={14} />
                    {edu.location}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">{edu.title}</h2>
                <div className="text-xl text-gray-600 font-medium mb-4">{edu.school}</div>
                
                <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">{edu.desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {edu.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
