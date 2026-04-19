// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Menu, X, Sun, Moon, Leaf, LogOut } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const isAuthenticated = Boolean(localStorage.getItem("token"));

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Upload", path: "/upload" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const handleGetStarted = () => {
//     navigate(isAuthenticated ? "/dashboard" : "/login");
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     setIsOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 dark:border-white/10 shadow-sm transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex-shrink-0">
//             <NavLink to="/" className="flex items-center gap-2 group">
//               <div className="p-2 rounded-xl bg-primary-light/10 dark:bg-primary-light/20 text-emerald-500 dark:text-primary-light group-hover:scale-110 transition-transform">
//                 <Leaf size={24} className="dark:text-glow" />
//               </div>
//               <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
//                 Clean<span className="text-emerald-500 dark:text-primary-light">2</span>Earn
//               </span>
//             </NavLink>
//           </div>

//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-2">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.path}
//                   className={({ isActive }) =>
//                     `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                       isActive
//                         ? "text-emerald-600 dark:text-primary-light bg-black/5 dark:bg-white/10"
//                         : "text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:bg-black/5 dark:hover:bg-white/5"
//                     }`
//                   }
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}

//               <NavLink
//                 to="/join-beta"
//                 className={({ isActive }) =>
//                   `ml-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
//                     isActive
//                       ? "bg-emerald-500 text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20"
//                       : "glass border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:border-emerald-500 dark:hover:border-primary-light"
//                   }`
//                 }
//               >
//                 Join Beta
//               </NavLink>

//               <button
//                 onClick={handleGetStarted}
//                 className="ml-2 px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 to-emerald-400 text-white shadow-lg hover:scale-105 transition"
//               >
//                 {isAuthenticated ? "Open Dashboard" : "Get Started"}
//               </button>

//               {isAuthenticated && (
//                 <button
//                   onClick={handleLogout}
//                   className="ml-2 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition"
//                 >
//                   <LogOut size={16} />
//                   Logout
//                 </button>
//               )}

//               <div className="pl-4 ml-4 border-l border-slate-200 dark:border-slate-700 font-normal">
//                 <button
//                   onClick={toggleTheme}
//                   className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light"
//                   aria-label="Toggle Dark Mode"
//                 >
//                   {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="md:hidden flex items-center gap-4">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
//             >
//               {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light focus:outline-none"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           className="md:hidden glass border-t border-black/5 dark:border-white/10 overflow-hidden"
//         >
//           <div className="px-4 py-4 space-y-2">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
//                     isActive
//                       ? "text-emerald-600 dark:text-primary-light bg-black/5 dark:bg-white/10"
//                       : "text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:bg-black/5 dark:hover:bg-white/5"
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}

//             <NavLink
//               to="/join-beta"
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 `block px-4 py-3 rounded-xl text-base font-bold text-center transition-all duration-300 mt-4 ${
//                   isActive
//                     ? "bg-emerald-500 text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20"
//                     : "glass border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:border-emerald-500 dark:hover:border-primary-light"
//                 }`
//               }
//             >
//               Join Beta
//             </NavLink>

//             <button
//               onClick={handleGetStarted}
//               className="block w-full px-4 py-3 rounded-xl text-base font-bold text-center transition-all duration-300 mt-4 bg-gradient-to-r from-pink-500 to-emerald-400 text-white shadow-lg"
//             >
//               {isAuthenticated ? "Open Dashboard" : "Get Started"}
//             </button>

//             {isAuthenticated && (
//               <button
//                 onClick={handleLogout}
//                 className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-200"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, LogOut, ChevronRight, Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload", path: "/upload" },
    { name: "Contact", path: "/contact" },
  ];

  const handleGetStarted = () => {
    navigate(isAuthenticated ? "/dashboard" : "/login");
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: theme === 'dark'
          ? (scrolled ? 'rgba(1,18,8,0.92)' : 'rgba(1,18,8,0.5)')
          : (scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.5)'),
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        borderBottom: theme === 'dark'
          ? (scrolled ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(16,185,129,0.08)')
          : (scrolled ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(16,185,129,0.15)'),
        boxShadow: scrolled 
          ? (theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)')
          : 'none',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), rgba(16,185,129,0.6), rgba(52,211,153,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(13,148,136,0.2))' }}
              />
              <Leaf size={18} className="relative z-10 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className={theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}>Clean</span>
              <span className="text-emerald-500">2</span>
              <span className={theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}>Earn</span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? (theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')
                      : (theme === 'dark' ? 'text-slate-400 hover:text-emerald-300' : 'text-slate-600 hover:text-emerald-600')
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={`absolute inset-0 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-emerald-500/10 border border-emerald-500/20'
                            : 'bg-emerald-100/60 border border-emerald-400/30'
                        }`}
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/join-beta"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-400/60'
                  : 'text-emerald-600 border border-emerald-400/40 hover:bg-emerald-100/50 hover:border-emerald-600/60'
              }`}
            >
              <Zap size={14} />
              Join Beta
            </NavLink>

            <button
              onClick={handleGetStarted}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-500/80 to-emerald-400/60 text-slate-900 hover:from-emerald-500 hover:to-emerald-400'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:from-emerald-600 hover:to-emerald-500'
              }`}
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
              <ChevronRight size={14} />
            </button>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20'
                    : 'text-slate-600 hover:text-red-600 hover:bg-red-100/40 border border-transparent hover:border-red-400/30'
                }`}
              >
                <LogOut size={15} />
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-2 p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-100/40'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-100/40'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-100/40'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: theme === 'dark' ? 'rgba(1,18,8,0.97)' : 'rgba(255,255,255,0.97)',
              borderTop: theme === 'dark' ? '1px solid rgba(16,185,129,0.12)' : '1px solid rgba(16,185,129,0.2)'
            }}
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? (theme === 'dark'
                            ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                            : 'text-emerald-600 bg-emerald-100/50 border border-emerald-400/40')
                          : (theme === 'dark'
                            ? 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/05'
                            : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-100/30')
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <div className="pt-3 space-y-2">
                <NavLink
                  to="/join-beta"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    theme === 'dark'
                      ? 'text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/10'
                      : 'text-emerald-600 border border-emerald-400/50 hover:bg-emerald-100/40'
                  }`}
                >
                  <Zap size={14} />
                  Join Beta
                </NavLink>
                <button
                  onClick={handleGetStarted}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-emerald-500/80 to-emerald-400/60 text-slate-900 hover:from-emerald-500 hover:to-emerald-400'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:from-emerald-600 hover:to-emerald-500'
                  }`}
                >
                  {isAuthenticated ? "Dashboard" : "Get Started"}
                </button>
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      theme === 'dark'
                        ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/08 border border-transparent hover:border-red-500/15'
                        : 'text-slate-600 hover:text-red-600 hover:bg-red-100/40 border border-transparent hover:border-red-400/20'
                    }`}
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;