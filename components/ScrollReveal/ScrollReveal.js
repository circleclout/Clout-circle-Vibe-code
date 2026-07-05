"use client";

import { useEffect, useRef } from "react";

/**
 * Wrapper that reveals children when scrolled into view
 * @param {Object} props
 * @param {"up"|"left"|"right"|"scale"} props.direction
 * @param {number} props.delay - Delay in ms
 * @param {number} props.threshold - 0-1 intersection threshold
 * @param {string} props.className - Additional classes
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const dirClass =
    direction === "left"
      ? "reveal--left"
      : direction === "right"
      ? "reveal--right"
      : direction === "scale"
      ? "reveal--scale"
      : "";

  return (
    <Tag ref={ref} className={`reveal ${dirClass} ${className}`}>
      {children}
    </Tag>
  );
}
