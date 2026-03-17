/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Award, 
  Heart, 
  Mail, 
  Menu, 
  X,
  Github,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Pages
import Home from './pages/Home.tsx';
import Parcours from './pages/Parcours.tsx';
import ProjetsList from './pages/ProjetsList.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import Certifications from './pages/Certifications.tsx';

const navItems = [
  { label: 'accueil', href: '/', icon: <User size={18} /> },
  { label: 'formation', href: '/formation', icon: <GraduationCap size={18} /> },
  { label: 'experience', href: '/experience', icon: <Briefcase size={18} /> },
  { label: 'projet', href: '/projets', icon: <Rocket size={18} /> },
  { label: 'certif', href: '/certifications', icon: <Award size={18} /> },
  { label: 'me contacter', href: '/contact', icon: <Mail size={18} /> },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f8f7f4]/80 backdrop-blur-md border-b border-[#e2e1da] h-16 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-serif font-bold tracking-tight">
          MA.<span className="text-blue-600">Ryadi</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                  location.pathname === item.href ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#f8f7f4] pt-20 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-lg font-medium capitalize"
                  >
                    <span className="text-blue-600">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-xl font-serif font-bold mb-6">MA.<span className="text-blue-600">Ryadi</span></div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Étudiant Ingénieur en Mécatronique à l'ENSAM Casablanca. 
              Alliance de la conception mécanique et de l'intelligence embarquée.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navItems.map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-gray-500 hover:text-white transition-colors capitalize">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Contact</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:ryadi.mohamedamine@ensam-casa.ma" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-gray-600 text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} Mohamed Amine Ryadi. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#f8f7f4] text-[#1a1a18] font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formation" element={<Parcours />} />
          <Route path="/experience" element={<Home />} /> {/* On peut réutiliser Home ou créer une page */}
          <Route path="/projets" element={<ProjetsList />} />
          <Route path="/projets/:id" element={<ProjectDetail />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
