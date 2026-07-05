"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsCounter.module.css";

/**
 * Animated counter that counts up when scrolled into view
 * @param {Object} props
 * @param {number} props.value - Target number
 * @param {string} props.suffix - Text after number (e.g., "+", "M+")
 * @param {string} props.label - Description label
 */
export default function StatsCounter({ value, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  function animateCount(target) {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount(value);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.value}>
        {count}
        <span className={styles.suffix}>{suffix}</span>
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
