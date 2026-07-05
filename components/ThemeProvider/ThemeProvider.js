"use client";

import { createContext, useContext, useEffect, useState } from "react";
import styles from "./ThemeProvider.module.css";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const saved = localStorage.getItem("cc-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const executeToggle = (mode) => {
    setTheme(mode);
    localStorage.setItem("cc-theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    setShowWarning(false);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    
    if (next === "light") {
      setShowWarning(true);
    } else {
      executeToggle("dark");
    }
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      
      {showWarning && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.iconWrapper}>⚠️</div>
            <h2 className={styles.title}>FLASHBANG OUT!</h2>
            <p className={styles.desc}>
              Are you seriously trying to switch to light mode? We all know it&apos;s a crime against retinas. RIP to your eyesight. Proceed at your own risk.
            </p>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.btnSecondary}
                onClick={() => setShowWarning(false)}
              >
                Phew! Retreat! Keep my eyes safe.
              </button>
              <button 
                className={styles.btn}
                onClick={() => executeToggle("light")}
              >
                I don&apos;t care, blind me anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}
