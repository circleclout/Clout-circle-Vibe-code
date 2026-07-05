"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // If we're on the homepage, wait for the theme color to be extracted from the video
    // Otherwise, just dismiss the loader quickly as the layout script handles theme restoration.
    const isHomePage = window.location.pathname === "/";

    if (!isHomePage) {
      setTimeout(() => setLoading(false), 150);
      return;
    }

    const handleThemeReady = () => {
      setLoading(false);
    };

    window.addEventListener("themeReady", handleThemeReady);

    // Fallback: don't load forever if the video fails to load or extract colors
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("themeReady", handleThemeReady);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setMounted(false), 500); // Wait for CSS transition
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!mounted) return null;

  return (
    <div className={`${styles.preloader} ${!loading ? styles.hidden : ""}`}>
      <Image src="/logo.png" alt="Clout Circle Logo" width={120} height={120} className={styles.logoImage} />
      <div className={styles.spinner}></div>
      <h2 className={styles.logo}>CLOUT CIRCLE</h2>
    </div>
  );
}
