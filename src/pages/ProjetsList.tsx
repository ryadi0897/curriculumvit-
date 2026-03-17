import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Briefcase, ChevronRight, Folder, FileText, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjetsList() {
  const projets = [
    {
      id: "drone",
      title: "Drone de Surveillance Agricole",
      desc: "Conception et prototype d'un UAV équipé de capteurs multispectraux pour l'analyse en temps réel de la santé des cultures.",
      icon: <Rocket size={24} />,
      category: "Aéronautique",
      image: "https://picsum.photos/seed/drone/600/400"
    },
    {
      id: "endommagement",
      title: "Étude d'Endommagement",
      desc: "Analyse mécatronique complète d'un train d'atterrissage d'avion commercial : MEF structurale et étude AMDEC.",
      icon: <Briefcase size={24} />,
      category: "Mécanique",
      image: "https://picsum.photos/seed/landing/600/400"
    },
    {
      id: "reologie",
      title: "Étude de Rhéologie",
      desc: "Modélisation et simulation du comportement des fluides complexes sous différentes contraintes mécaniques.",
      icon: <Database size={24} />,
      category: "Simulation",
      image: "https://picsum.photos/seed/fluid/600/400"
    },
    {
      id: "mini-projet",
      title: "Mini-Projet Mécatronique",
      desc: "Développement d'un système automatisé combinant capteurs, actionneurs et contrôle embarqué.",
      icon: <Folder size={24} />,
      category: "Électronique",
      image: "https://picsum.photos/seed/circuit/600/400"
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#f8f7f4]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 block">Portfolio</span>
          <h1 className="text-5xl font-serif font-bold mb-6">Mes Projets d'Ingénierie</h1>
          <p className="text-gray-500 max-w-2xl text-lg">
            Une sélection de travaux académiques et personnels illustrant mes compétences en conception, simulation et systèmes embarqués.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl border border-[#e2e1da] overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
                  {project.desc}
                </p>
                
                <Link 
                  to={`/projets/${project.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 group/link"
                >
                  Découvrir le projet 
                  <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
