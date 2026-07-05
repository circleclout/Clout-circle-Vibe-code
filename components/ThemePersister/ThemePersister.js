"use client";

import { useEffect } from "react";

export default function ThemePersister({ children }) {
  useEffect(() => {
    // Read the last saved dynamic color from the homepage video
    const r = localStorage.getItem("clout_theme_r");
    const g = localStorage.getItem("clout_theme_g");
    const b = localStorage.getItem("clout_theme_b");

    if (r && g && b) {
      document.documentElement.style.setProperty("--gold", `rgb(${r}, ${g}, ${b})`);
      document.documentElement.style.setProperty("--gold-dark", `rgb(${Math.floor(r * 0.75)}, ${Math.floor(g * 0.75)}, ${Math.floor(b * 0.75)})`);
      document.documentElement.style.setProperty("--gold-light", `rgb(${Math.min(255, parseInt(r) + 40)}, ${Math.min(255, parseInt(g) + 40)}, ${Math.min(255, parseInt(b) + 40)})`);
      document.documentElement.style.setProperty("--gold-glow", `rgba(${r}, ${g}, ${b}, 0.2)`);
      document.documentElement.style.setProperty("--border-gold", `rgba(${r}, ${g}, ${b}, 0.5)`);
      document.documentElement.style.setProperty("--gold-gradient", `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${Math.floor(r * 0.6)}, ${Math.floor(g * 0.6)}, ${Math.floor(b * 0.6)}))`);
    }
  }, []);

  return <>{children}</>;
}
