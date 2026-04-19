import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('clean2earn-theme');
    if (saved && (saved === 'light' || saved === 'dark')) return saved;
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both theme classes
    root.classList.remove('light', 'dark');
    
    // Apply current theme class
    root.classList.add(theme);
    
    // Apply background to body
    document.body.className = theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50';
    
    localStorage.setItem('clean2earn-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme,
      toggleTheme,
      isDark: theme === 'dark'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
