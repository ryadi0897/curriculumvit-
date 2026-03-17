import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Image as ImageIcon, FileCode, Download, ExternalLink, ChevronRight } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();

  // Simulation de données de projet basées sur l'ID
  const projectData: Record<string, any> = {
    "drone": {
      title: "Drone de Surveillance Agricole",
      category: "Aéronautique & Robotique",
      date: "2023",
      desc: "Conception complète d'un drone autonome pour l'agriculture de précision. Ce projet a nécessité une intégration poussée de la mécanique (structure légère), de l'électronique (contrôleur de vol) et du logiciel (traitement d'images).",
      files: [
        { name: "Rapport_Technique.pdf", type: "pdf", size: "4.2 MB" },
        { name: "Schema_Electronique.png", type: "image", size: "1.5 MB" },
        { name: "Code_Controleur.py", type: "code", size: "12 KB" },
        { name: "Modelisation_3D.catpart", type: "cad", size: "8.7 MB" }
      ],
      gallery: [
        "https://picsum.photos/seed/drone1/800/600",
        "https://picsum.photos/seed/drone2/800/600"
      ]
    },
    "endommagement": {
      title: "Étude d'Endommagement Train d'Atterrissage",
      category: "Mécanique & Simulation",
      date: "2023",
      desc: "Analyse par éléments finis (MEF) des zones critiques d'un train d'atterrissage sous charges extrêmes. Utilisation d'ANSYS pour la simulation et MATLAB pour le post-traitement des données.",
      files: [
        { name: "Rapport_Endommagement.pdf", type: "pdf", size: "5.8 MB" },
        { name: "Resultats_Simulation.xlsx", type: "data", size: "2.1 MB" },
        { name: "Script_Analyse.m", type: "code", size: "8 KB" }
      ],
      gallery: [
        "https://picsum.photos/seed/sim1/800/600",
        "https://picsum.photos/seed/sim2/800/600"
      ]
    }
  };

  const project = projectData[id || ""] || projectData["drone"];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" />;
      case 'image': return <ImageIcon className="text-blue-500" />;
      case 'code': return <FileCode className="text-green-500" />;
      default: return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#f8f7f4]">
      <div className="container mx-auto px-6">
        <Link to="/projets" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux projets
        </Link>

        <div className="grid lg:grid-cols-[1fr_350px] gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {project.category}
              </span>
              <span className="text-gray-400 text-xs font-medium">{project.date}</span>
            </div>
            
            <h1 className="text-5xl font-serif font-bold mb-8 leading-tight">{project.title}</h1>
            
            <div className="prose prose-blue max-w-none mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.desc}
              </p>
            </div>

            <h3 className="text-2xl font-serif font-bold mb-6">Galerie du projet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {project.gallery.map((img: string, i: number) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-[#e2e1da]">
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl border border-[#e2e1da] p-8 sticky top-32">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Fichiers du projet
              </h3>
              
              <div className="space-y-4">
                {project.files.map((file: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#f0efe9] hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="shrink-0">{getFileIcon(file.type)}</div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-bold truncate">{file.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase">{file.size}</div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#f0efe9]">
                <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  <ExternalLink size={16} />
                  Ouvrir le rapport complet
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
