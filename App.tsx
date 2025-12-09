
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, Github, Linkedin, Mail, ExternalLink, User, Lock, Database, LogOut, ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react';
import { WritingStudio } from './components/WritingStudio';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- COMPONENT: ANIMATED NAV LINK (Desktop) ---
const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: (e: any) => void }) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="relative group py-2 cursor-pointer overflow-hidden"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-stone-900">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-nobel-gold transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
    </a>
  );
};

// --- COMPONENT: CINEMATIC MOBILE MENU ---
const MobileMenu = ({ isOpen, onClose, links, onDemo }: { isOpen: boolean; onClose: () => void; links: any[]; onDemo: (e: any) => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0.3 } }}
                    className="fixed inset-0 z-[45] bg-stone-900 text-white flex flex-col justify-center overflow-hidden"
                >
                    {/* Background Noise/Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
                        <motion.div 
                            className="flex flex-col space-y-2"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } },
                                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {links.map((link, i) => (
                                <motion.div key={i} className="overflow-hidden" variants={{
                                    hidden: { y: 100, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] } }
                                }}>
                                    <a 
                                        href={link.href} 
                                        onClick={(e) => { link.onClick(e); onClose(); }}
                                        className="group flex items-center justify-between text-5xl md:text-7xl font-serif font-medium text-stone-300 hover:text-nobel-gold transition-colors py-4 border-b border-stone-800"
                                    >
                                        <span className="group-hover:translate-x-4 transition-transform duration-500">{link.label}</span>
                                        <motion.span 
                                            className="opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500"
                                        >
                                            <ArrowRight size={40} />
                                        </motion.span>
                                    </a>
                                </motion.div>
                            ))}
                            
                            <motion.div 
                                className="pt-8 flex flex-col gap-6"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { delay: 0.4 } }
                                }}
                            >
                                <button 
                                    onClick={(e) => { onDemo(e); onClose(); }}
                                    className="w-full py-5 border border-stone-600 rounded-full text-xl hover:bg-white hover:text-stone-900 transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    Interactive Demo <Sparkles size={18} className="group-hover:text-nobel-gold" />
                                </button>
                                
                                <div className="flex justify-between items-center text-sm text-stone-500 font-mono">
                                    <span>BEAUTY IN LOGIC</span>
                                    <div className="flex gap-4">
                                        <a href="#" className="hover:text-white">TW</a>
                                        <a href="#" className="hover:text-white">LN</a>
                                        <a href="#" className="hover:text-white">GH</a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- COMPONENT: FULL LOGIN PAGE (Modern & Unique) ---
const LoginPage = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (user: any) => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Network Request
    setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        // Wait for success animation then close
        setTimeout(() => {
            onLogin({
                name: formData.name || (isSignUp ? "New User" : "Demo User"),
                email: formData.email || "demo@example.com",
                photo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name || 'User'}`,
                timestamp: new Date().toLocaleString()
            });
            setSuccess(false);
            setFormData({ name: '', email: '', password: '' }); // Reset
            onClose();
        }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-0 md:p-4">
       {/* Background Backdrop Click to Close */}
       <div className="absolute inset-0" onClick={onClose}></div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.95 }}
         className="relative w-full max-w-5xl h-full md:h-[650px] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
       >
          {/* LEFT SIDE: Artistic Visual */}
          <div className="hidden md:flex w-1/2 bg-stone-900 relative flex-col justify-between p-12 overflow-hidden text-white">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.2),transparent_70%)] animate-pulse"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              </div>
              
              <div className="relative z-10">
                  <div className="w-12 h-12 bg-white text-stone-900 rounded-lg flex items-center justify-center font-serif font-bold text-2xl mb-8">S</div>
                  <h2 className="font-serif text-5xl leading-tight mb-6">
                      {isSignUp ? "Join the\nCommunity." : "Welcome\nBack."}
                  </h2>
                  <p className="text-stone-400 text-lg leading-relaxed max-w-sm">
                      {isSignUp 
                        ? "Create an account to save your progress, access exclusive demos, and join a network of creative technologists."
                        : "Sign in to continue your journey. Your personal dashboard and saved projects are waiting for you."
                      }
                  </p>
              </div>

              <div className="relative z-10 text-sm text-stone-500 font-mono">
                  &copy; 2024 SUMIT RAO PORTFOLIO
              </div>
          </div>

          {/* RIGHT SIDE: Interactive Form */}
          <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center relative">
              <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900">
                  <X size={24} />
              </button>

              <div className="max-w-sm mx-auto w-full">
                  {success ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                      >
                          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Check size={40} />
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Success!</h3>
                          <p className="text-stone-500">Redirecting you to the dashboard...</p>
                      </motion.div>
                  ) : (
                      <>
                        <div className="md:hidden mb-8 text-center">
                            <h2 className="font-serif text-3xl font-bold text-stone-900">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                            <p className="text-stone-500 mt-2 text-sm">Please enter your details.</p>
                        </div>

                        <div className="flex flex-col gap-4 mb-8">
                             <button className="flex items-center justify-center gap-3 w-full py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors font-medium text-stone-700">
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Continue with Google
                             </button>
                        </div>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
                            <div className="relative flex justify-center text-xs uppercase text-stone-400 bg-white px-4">Or continue with email</div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignUp && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Full Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:ring-2 focus:ring-nobel-gold/50 focus:border-nobel-gold transition-all outline-none"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:ring-2 focus:ring-nobel-gold/50 focus:border-nobel-gold transition-all outline-none"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Password</label>
                                <input 
                                    type="password" 
                                    required 
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:ring-2 focus:ring-nobel-gold/50 focus:border-nobel-gold transition-all outline-none"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                />
                            </div>

                            {!isSignUp && (
                                <div className="flex justify-end">
                                    <button type="button" className="text-xs font-medium text-stone-500 hover:text-stone-900">Forgot Password?</button>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold tracking-wide hover:bg-black transition-all flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-stone-500">
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button 
                                onClick={() => setIsSignUp(!isSignUp)} 
                                className="font-bold text-stone-900 hover:text-nobel-gold transition-colors"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                      </>
                  )}
              </div>
          </div>
       </motion.div>
    </div>
  );
};

// --- COMPONENT: DATABASE VIEW (Admin) ---
const DatabaseView = ({ users, onClose }: { users: any[], onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-stone-900 w-full max-w-2xl rounded-xl shadow-2xl border border-stone-700 overflow-hidden flex flex-col max-h-[80vh]"
      >
         <div className="p-6 border-b border-stone-700 flex justify-between items-center">
            <h3 className="text-white font-mono font-bold flex items-center gap-2">
               <Database className="text-green-500" size={18}/> USER_DATABASE.db
            </h3>
            <button onClick={onClose} className="text-stone-400 hover:text-white"><X size={20}/></button>
         </div>
         <div className="overflow-y-auto flex-1 p-0">
            <table className="w-full text-left text-sm text-stone-300">
               <thead className="bg-stone-800 text-stone-400 font-mono text-xs uppercase">
                  <tr>
                     <th className="p-4">User</th>
                     <th className="p-4">Email</th>
                     <th className="p-4">Login Time</th>
                     <th className="p-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-stone-800">
                  {users.map((u, i) => (
                     <tr key={i} className="hover:bg-stone-800/50 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                           <img src={u.photo} alt="av" className="w-8 h-8 rounded-full bg-stone-700"/>
                           <span className="font-bold text-white">{u.name}</span>
                        </td>
                        <td className="p-4 font-mono text-stone-500">{u.email}</td>
                        <td className="p-4 font-mono text-xs">{u.timestamp}</td>
                        <td className="p-4">
                           <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-[10px] font-bold border border-green-900">ACTIVE</span>
                        </td>
                     </tr>
                  ))}
                  {users.length === 0 && (
                     <tr>
                        <td colSpan={4} className="p-8 text-center text-stone-600 italic">No records found. Login to test.</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         <div className="p-4 bg-stone-800 border-t border-stone-700 text-xs text-stone-500 font-mono flex justify-between">
            <span>TOTAL RECORDS: {users.length}</span>
            <span>READ-ONLY ACCESS</span>
         </div>
      </motion.div>
    </div>
  )
}

const WorkCard = ({ title, category, description, link }: { title: string, category: string, description: string, link: string }) => {
  return (
    <motion.a 
      variants={fadeInUp}
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex flex-col group p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 w-full hover:border-nobel-gold/30 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-0 bg-nobel-gold group-hover:h-full transition-all duration-500"></div>
      <div className="text-xs font-bold tracking-widest text-nobel-gold uppercase mb-3">{category}</div>
      <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-nobel-gold transition-colors">{title}</h3>
      <p className="text-stone-500 leading-relaxed mb-6 flex-1">{description}</p>
      <div className="flex items-center gap-2 text-sm font-medium text-stone-900 group-hover:gap-3 transition-all">
        View Live Project <ExternalLink size={14} />
      </div>
    </motion.a>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'studio'>('home');
  const { scrollYProgress } = useScroll();
  
  // Auth State
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showDb, setShowDb] = useState(false);
  const [userLog, setUserLog] = useState<any[]>([]);

  // Parallax effect for the hero text
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setUserLog(prev => [userData, ...prev]);
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleStartDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
        setShowLogin(true);
    } else {
        setMenuOpen(false);
        setView('studio');
        window.scrollTo(0, 0);
    }
  };

  // Nav Links Configuration
  const navLinks = [
      { href: '#about', label: 'About', onClick: scrollToSection('about') },
      { href: '#expertise', label: 'Expertise', onClick: scrollToSection('expertise') },
      { href: '#work', label: 'Work', onClick: scrollToSection('work') },
      { href: '#contact', label: 'Contact', onClick: scrollToSection('contact') },
  ];

  if (view === 'studio') {
    return <WritingStudio onBack={() => setView('home')} user={user} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white overflow-x-hidden font-sans">
      
      {/* Modals */}
      <LoginPage isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLoginSuccess} />
      {showDb && <DatabaseView users={userLog} onClose={() => setShowDb(false)} />}
      
      {/* Cinematic Mobile Menu */}
      <MobileMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        links={navLinks} 
        onDemo={handleStartDemo} 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`w-8 h-8 ${menuOpen ? 'bg-white text-stone-900' : 'bg-stone-900 text-white'} transition-colors duration-500 rounded-sm flex items-center justify-center font-serif font-bold text-xl shadow-sm pb-1`}>S</div>
            <span className={`font-sans font-bold text-sm tracking-[0.2em] transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'} ${menuOpen ? 'text-white' : 'text-stone-900'}`}>
              SUMIT RAO
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href} onClick={link.onClick}>
                    {link.label.toUpperCase()}
                </NavLink>
            ))}
            
            {/* User Profile / Login */}
            {user ? (
               <div className="flex items-center gap-3 pl-4 border-l border-stone-300">
                  <div className="relative group cursor-pointer" onClick={() => setShowDb(!showDb)}>
                     <img src={user.photo} alt="profile" className="w-8 h-8 rounded-full border border-stone-300" />
                     <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                  </div>
                  <button onClick={() => setUser(null)} className="text-stone-400 hover:text-red-500"><LogOut size={16}/></button>
               </div>
            ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 hover:text-stone-900 transition-colors group"
                >
                  <User size={16} className="group-hover:fill-stone-900 transition-colors"/> Login
                </button>
            )}

            <button 
              onClick={handleStartDemo}
              className="px-5 py-2 border border-stone-900 text-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all shadow-sm cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 duration-200"
            >
              Interactive Demo
            </button>
          </div>

          {/* Animated Toggle Button (Mobile) */}
          <button 
            className="md:hidden z-50 p-2 focus:outline-none" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
             <div className="relative w-6 h-6 flex items-center justify-center">
                 <motion.span 
                    animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -4 }}
                    className={`absolute w-6 h-0.5 transform transition-colors duration-300 ${menuOpen ? 'bg-white' : 'bg-stone-900'}`} 
                 />
                 <motion.span 
                    animate={{ opacity: menuOpen ? 0 : 1 }}
                    className={`absolute w-6 h-0.5 bg-stone-900`} 
                 />
                 <motion.span 
                    animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 4 }}
                    className={`absolute w-6 h-0.5 transform transition-colors duration-300 ${menuOpen ? 'bg-white' : 'bg-stone-900'}`} 
                 />
             </div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.85)_0%,rgba(249,248,244,0.4)_50%,rgba(249,248,244,0.1)_100%)]" />

        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block mb-6 px-3 py-1 border border-stone-300 text-stone-500 text-[10px] tracking-[0.3em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30"
          >
            Portfolio 2024
          </motion.div>
          
          <h1 className="font-serif text-5xl md:text-8xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Hello, I'm Sumit. <br/>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="italic font-normal text-stone-500 text-2xl md:text-5xl block mt-6"
            >
              Creative Technologist & Designer
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="max-w-xl mx-auto text-lg text-stone-600 font-light leading-relaxed mb-12"
          >
            I build digital experiences that blend aesthetic precision with engineering rigor. Currently crafting the future of web interaction.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex justify-center gap-6"
          >
             <a href="#work" onClick={scrollToSection('work')} className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-lg text-sm font-medium tracking-wider hover:scale-105 transform duration-300">
               VIEW WORK
             </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
            <ArrowDown className="text-stone-400" size={20} />
        </motion.div>
      </header>

      <main>
        {/* Unique About Section: Logic vs Art Split */}
        <section id="about" className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10">
            
            {/* Text Content */}
            <motion.div 
              className="md:col-span-6 text-lg text-stone-600 leading-relaxed space-y-8 pr-0 md:pr-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                 <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">
                    About Me
                  </div>
                 <h2 className="font-serif text-4xl md:text-5xl leading-tight text-stone-900 mb-6">
                    A Synthesis of <br/>
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Expression</span> & <span className="font-bold border-b-4 border-stone-900">Engineering</span>
                 </h2>
                 <p className="text-xl text-stone-500 font-light mb-8">
                    I don't just write code; I compose digital experiences that live at the intersection of human emotion and machine logic.
                 </p>
              </motion.div>

              <motion.p variants={fadeInUp}>
                My background spans the rigid structures of Computer Science and the fluid world of Visual Arts. I believe the best products exist in the tension between these two disciplines.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="p-6 bg-stone-50 border-l-4 border-nobel-gold rounded-r-lg">
                For me, <b>Logic</b> provides the foundation—performant code, scalable architecture, and type safety. <b>Art</b> provides the soul—micro-interactions, typography, and narrative flow.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex gap-8 pt-6">
                 <div>
                    <span className="block text-4xl font-serif text-stone-900 mb-1">4+</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-400">Years Exp</span>
                 </div>
                 <div className="w-px bg-stone-300"></div>
                 <div>
                    <span className="block text-4xl font-serif text-stone-900 mb-1">25+</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-400">Shipped</span>
                 </div>
              </motion.div>
            </motion.div>

            {/* Logic vs Art Visual - Interactive Split Card */}
            <motion.div 
              className="md:col-span-6 relative h-[500px] md:h-[600px] w-full perspective-1000"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
               <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group bg-stone-100 transform transition-transform duration-500 hover:scale-[1.01]">
                  
                  {/* ART SIDE (Background Layer) */}
                  <div className="absolute inset-0 bg-[#FFFBF4] p-8 md:p-12 flex flex-col justify-end items-end transition-all duration-700">
                      {/* Fluid Background Elements */}
                      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_50%)] animate-pulse"></div>
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                      
                      <div className="absolute top-20 right-20 w-48 h-48 bg-purple-300/30 rounded-full blur-[80px]"></div>
                      <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-300/30 rounded-full blur-[80px]"></div>

                      <div className="relative z-10 text-right">
                          <h3 className="font-serif text-6xl md:text-8xl italic text-stone-900 tracking-tighter mb-4 mix-blend-multiply opacity-30 group-hover:opacity-100 transition-opacity duration-500">Art</h3>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-100">
                            <p className="font-serif text-lg text-stone-600 max-w-xs ml-auto">
                               "Emotion, intuition, and the beautiful chaos of human experience."
                            </p>
                          </div>
                      </div>
                  </div>

                  {/* LOGIC SIDE (Diagonal Clip Layer) */}
                  <div 
                    className="absolute inset-0 bg-stone-900 overflow-hidden transition-all duration-700 ease-in-out group-hover:translate-x-[-40px] group-hover:translate-y-[-40px]"
                    style={{ clipPath: 'polygon(0 0, 120% 0, -20% 120%)' }}
                  >
                      {/* Grid & Code Background */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                      
                      <div className="p-8 md:p-12 h-full flex flex-col justify-start items-start relative z-10">
                          <h3 className="font-mono text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">&lt;Logic/&gt;</h3>
                          
                          <div className="font-mono text-xs md:text-sm text-stone-400 space-y-2 bg-stone-800/80 p-6 rounded-xl border border-stone-700 backdrop-blur-sm max-w-sm shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                             <div className="flex gap-2"><span className="text-purple-400">interface</span> <span className="text-yellow-200">Reality</span> &#123;</div>
                             <div className="pl-4 text-stone-500">// Structure defines meaning</div>
                             <div className="pl-4"><span className="text-blue-300">rules</span>: <span className="text-green-300">Array</span>&lt;Axiom&gt;;</div>
                             <div className="pl-4"><span className="text-blue-300">optimize</span>(): <span className="text-purple-400">void</span>;</div>
                             <div>&#125;</div>
                          </div>
                      </div>
                  </div>

                  {/* Divider Line visual */}
                  <div className="absolute top-0 left-0 w-[200%] h-[2px] bg-white/20 -rotate-45 origin-top-left pointer-events-none transform translate-y-[0px] translate-x-[0px] group-hover:translate-x-[-40px] group-hover:translate-y-[-40px] transition-all duration-700"></div>
                  
                  {/* Hover Hint */}
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                     <div className="bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                        HOVER TO MERGE
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </section>

        {/* Expertise / Skill Matrix */}
        <motion.section 
          id="expertise" 
          className="py-32 bg-white border-t border-stone-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div variants={fadeInUp}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            My Toolkit
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Technical Mastery</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           Modern development requires a diverse vocabulary. I speak fluent Design and Code. 
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            From high-level architectural decisions to the physics of a button press, I maintain control over every layer of the stack. Use the interactive grid to explore my core competencies.
                        </p>
                    </motion.div>
                    <motion.div variants={scaleIn}>
                        <SurfaceCodeDiagram />
                    </motion.div>
                </div>
            </div>
        </motion.section>

        {/* Workflow / Process */}
        <motion.section 
          className="py-32 bg-stone-900 text-stone-100 overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-purple-600 blur-[100px] absolute top-[-100px] left-[-100px] animate-pulse"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <motion.div variants={scaleIn} className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </motion.div>
                     <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            The Process
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">From Abstract to Concrete</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Chaos is the enemy of shipping. I adhere to a rigorous, iterative workflow that minimizes waste and maximizes impact.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            I don't just "build features". I solve problems through a cycle of Research, Prototyping, Development, and Deployment.
                        </p>
                     </motion.div>
                </div>
            </div>
        </motion.section>

        {/* Selected Work */}
        <section id="work" className="py-32 bg-[#F5F4F0]">
           <div className="container mx-auto px-6">
                <motion.div 
                  className="mb-16"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Selected Work</div>
                    <h2 className="font-serif text-4xl md:text-6xl text-stone-900">Recent Projects</h2>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={staggerContainer}
                >
                    <WorkCard 
                        category="AI Productivity"
                        title="Content & Study Engine" 
                        description="A specialized app designed for study and content writing, featuring distraction-free editing and research tools."
                        link="https://ai.studio/apps/drive/1K02Fj-7vdAAY4v6o6NA8kXfAvAz2rIOt?fullscreenApplet=true"
                    />
                    <WorkCard 
                        category="Digital Marketing"
                        title="DigitalMax Agency" 
                        description="A high-performance digital marketing agency website showcasing modern design, SEO strategies, and conversion optimization."
                        link="https://digitalmax.mgx.world/"
                    />
                    <WorkCard 
                        category="Generative AI"
                        title="Reflex AI Agent" 
                        description="An intelligent AI agent built with Reflex, capable of autonomous task execution and complex interactions."
                        link="https://build.reflex.dev/gen/fa0fc5dc-124b-44d8-bd6c-5da5ce03aa26/"
                    />
                </motion.div>
           </div>
        </section>

        {/* Metrics / Impact */}
        <motion.section 
          className="py-32 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
            <div className="container mx-auto px-6">
                <motion.div variants={fadeInUp} className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Proven Impact</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        I build for results. Whether it's optimizing render cycles or increasing conversion rates, I let the data speak for the quality of my code.
                    </p>
                </motion.div>
                <motion.div variants={scaleIn} className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </motion.div>
            </div>
        </motion.section>

        {/* Conceptual Model */}
        <motion.section 
          className="py-32 bg-white border-t border-stone-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <motion.div variants={scaleIn} className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">"Structure & Flow" - 3D Experiment</div>
                    </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Philosophy</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Always Learning</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        The digital landscape is shifting beneath our feet. I dedicate 20% of my time to exploring bleeding-edge technologies—WebGPU, WASM, and Generative AI.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-stone-900 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Sumit is that rare unicorn who can design a beautiful interface in Figma and then build it pixel-perfect in React the next day."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Alex Chen, CTO at TechFlow</span>
                    </div>
                </motion.div>
             </div>
        </motion.section>

        {/* Contact */}
        <section id="contact" className="py-32 bg-stone-900 text-stone-400">
           <motion.div 
             className="container mx-auto px-6 text-center"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
           >
                <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-6xl mb-8 text-white">Let's build something extraordinary.</motion.h2>
                <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg mb-12">
                    I'm currently available for freelance projects and consulting. If you have a vision that needs engineering, I'd love to hear it.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <a href="mailto:hello@sumitrao.dev" className="flex items-center gap-3 px-8 py-4 bg-white text-stone-900 rounded-full font-bold tracking-wide hover:bg-nobel-gold hover:text-white transition-all shadow-lg hover:scale-105 transform duration-200">
                        <Mail size={18} />
                        HELLO@SUMITRAO.DEV
                    </a>
                    <div className="flex gap-4">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border border-stone-700 hover:border-white hover:text-white transition-all hover:scale-110"><Github size={20}/></a>
                        <a href="https://www.linkedin.com/in/sumit-rao-0a16a6253/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border border-stone-700 hover:border-white hover:text-white transition-all hover:scale-110"><Linkedin size={20}/></a>
                    </div>
                </motion.div>
           </motion.div>
        </section>

      </main>

      <footer className="bg-stone-950 text-stone-600 py-12 border-t border-stone-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
                © 2024 Sumit Rao. Crafted with React & Tailwind.
            </div>
            <div className="flex gap-6 text-sm font-medium">
                <a href="#" className="hover:text-stone-300 transition-colors">Resume</a>
                <a href="https://www.linkedin.com/in/sumit-rao-0a16a6253/" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">LinkedIn</a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">GitHub</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
