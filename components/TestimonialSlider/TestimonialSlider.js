"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import testimonials from "@/content/testimonials";
import styles from "./TestimonialSlider.module.css";

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.quoteWrap}>
        {/* Big quote mark */}
        <span className={styles.quoteMark}>&ldquo;</span>

        <blockquote className={styles.quote} key={active}>
          {t.quote}
        </blockquote>

        <div className={styles.stars}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
          ))}
        </div>

        <div className={styles.author}>
          <div className={styles.avatar}>
            <Image 
              src={`https://i.pravatar.cc/150?u=${t.name.replace(/\s+/g, '')}`} 
              alt={`${t.name} avatar`} 
              width={150}
              height={150}
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div>
            <p className={styles.name}>{t.name}</p>
            <p className={styles.role}>
              {t.role}, {t.company}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          onClick={prev}
          className={styles.arrowBtn}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className={styles.arrowBtn}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
