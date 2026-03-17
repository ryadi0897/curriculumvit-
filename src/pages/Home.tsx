import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Download, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section id="accueil" className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-[1fr_300px] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e2e1da] text-xs font-medium text-gray-500 mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              Disponible pour stages & collaborations
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-extrabold leading-[0.9] tracking-tighter mb-6">
              Mohamed<br />
              Amine<br />
              <span className="text-blue-600 italic">Ryadi</span>
            </h1>

            <p className="text-lg text-gray-600 font-light mb-8 max-w-lg leading-relaxed">
              Étudiant Ingénieur en Mécatronique à l'ENSAM Casablanca. 
              Spécialisation Aéronautique & Automobile. Alliant la précision mécanique à l'intelligence embarquée.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/projets" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-all hover:-translate-y-1 shadow-lg shadow-blue-200">
                <Rocket size={18} /> Voir mes projets
              </Link>
              <a href="#" className="px-8 py-3 bg-white border border-[#e2e1da] rounded-xl font-medium flex items-center gap-2 hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1">
                <Download size={18} /> Télécharger CV
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-[#e2e1da] flex gap-12">
              <div>
                <div className="text-3xl font-serif font-bold text-blue-600">3+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Projets</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-blue-600">4+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Certifs</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-blue-600">2</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Spécialités</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex flex-col gap-4"
          >
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 border border-[#e2e1da] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif font-bold text-blue-600/30">
                MA
              </div>
              <img 
                src="https://picsum.photos/seed/engineer/600/800" 
                alt="Mohamed Amine Ryadi" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#e2e1da] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs font-bold">Casablanca, Maroc</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tighter">Localisation</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
