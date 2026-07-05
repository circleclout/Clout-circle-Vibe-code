"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button/Button";
import QuoteButton from "@/components/QuoteButton/QuoteButton";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import LogoMarquee from "@/components/LogoMarquee/LogoMarquee";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import StatsCounter from "@/components/StatsCounter/StatsCounter";
import CaseStudyCard from "@/components/CaseStudyCard/CaseStudyCard";
import FeedbackForm from "@/components/FeedbackForm/FeedbackForm";
import services from "@/content/services";
import stats from "@/content/stats";
import siteConfig from "@/content/siteConfig";
import styles from "./page.module.css";

export default function HomeClient({ featuredProjects }) {
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const vids = ["/vids/vid2.mp4", "/vids/vid3.mp4"];
    const randomIndex = Math.floor(Math.random() * vids.length);
    setVideoSrc(vids[randomIndex]);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const updateColor = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        ctx.drawImage(videoRef.current, 0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        let r = data[0];
        let g = data[1];
        let b = data[2];

        // The user wants a darker shade than the background, but it still needs to be legible.
        // If the video is very dark, we need a minimum brightness so it doesn't disappear.
        // We will aim for a max brightness of 180. If it's brighter, it darkens. If it's darker, it brightens slightly to stay visible.
        const max = Math.max(r, g, b);
        if (max > 0) {
          const targetMax = 190; 
          const multiplier = targetMax / max;
          r = Math.min(255, Math.floor(r * multiplier));
          g = Math.min(255, Math.floor(g * multiplier));
          b = Math.min(255, Math.floor(b * multiplier));
        } else {
          r = 100; g = 100; b = 100;
        }

        document.documentElement.style.setProperty("--gold", `rgb(${r}, ${g}, ${b})`);
        document.documentElement.style.setProperty("--gold-dark", `rgb(${Math.floor(r * 0.75)}, ${Math.floor(g * 0.75)}, ${Math.floor(b * 0.75)})`);
        document.documentElement.style.setProperty("--gold-light", `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`);
        document.documentElement.style.setProperty("--gold-glow", `rgba(${r}, ${g}, ${b}, 0.2)`);
        document.documentElement.style.setProperty("--border-gold", `rgba(${r}, ${g}, ${b}, 0.5)`);
        document.documentElement.style.setProperty("--gold-gradient", `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${Math.floor(r * 0.6)}, ${Math.floor(g * 0.6)}, ${Math.floor(b * 0.6)}))`);
        
        // Save to localStorage every second so other pages can persist the theme
        const now = Date.now();
        if (!window.lastThemeSave || now - window.lastThemeSave > 1000) {
          localStorage.setItem("clout_theme_r", r);
          localStorage.setItem("clout_theme_g", g);
          localStorage.setItem("clout_theme_b", b);
          window.lastThemeSave = now;
        }

        // Notify the Preloader that the theme is ready to be displayed
        if (!window.themeReadyDispatched) {
          window.dispatchEvent(new Event("themeReady"));
          window.themeReadyDispatched = true;
        }
      }
      // Run less frequently to save CPU (every ~100ms)
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(updateColor);
      }, 100);
    };

    updateColor();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        {/* Background Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className={styles.heroBgVideo}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Background decorations */}
        <div className={styles.heroBgGrid} />
        <div className={styles.heroGlow} />
        <div className={styles.heroGlow2} />

        <div className={`${styles.heroContent} container`}>
          <ScrollReveal>
            <span className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Anti-LARP Marketing Agency
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className={styles.heroTitle}>
              We Don&apos;t Just Market.
              <br />
              <span className="text-gradient">We Take Your Money</span>
              <br />
              And Actually Do Something Useful.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className={styles.heroSubtitle}>
              From social media to paid ads — we help the 12 brands that trusted us make money so we can make money too. No corporate buzzwords, just results (and some decent memes).
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className={styles.heroCtas}>
              <Button href="/portfolio" variant="primary" size="lg">
                See Our Work
              </Button>
              <QuoteButton variant="outline" size="lg">
                Get Started
              </QuoteButton>
            </div>
          </ScrollReveal>

          {/* Floating stats preview */}
          <ScrollReveal delay={500} direction="scale">
            <div className={styles.heroFloatingStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>150+</span>
                <span className={styles.heroStatLabel}>Brands</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>50M+</span>
                <span className={styles.heroStatLabel}>Reach</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>3x</span>
                <span className={styles.heroStatLabel}>Avg. ROAS</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CLIENT LOGOS (Temporarily Hidden) ═══ */}
      {false && <LogoMarquee />}

      {/* ═══ SERVICES ═══ */}
      <section className={`${styles.services} section`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="What We Do"
              title="Services Built for Growth"
              description="We're not a one-trick agency. Whether you need eyes on your brand, leads in your pipeline, or a complete identity makeover — we've got you covered."
            />
          </ScrollReveal>

          <div className={styles.servicesStack}>
            {services.map((service, i) => (
              <div 
                key={service.id}
                className={styles.stickyCard}
                style={{ top: `calc(120px + ${i * 24}px)` }}
              >
                <ScrollReveal>
                  <ServiceCard service={service} index={i} />
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══ FEATURED WORK ═══ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="Our Work"
              title="Results That Speak Louder"
              description="Real campaigns. Real numbers. Here's a taste of what we've done for brands just like yours."
            />
          </ScrollReveal>

          <div className={styles.portfolioGrid}>
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 100}>
                <CaseStudyCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className={styles.viewAll}>
              <Button href="/portfolio" variant="outline">
                View All Work
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FEEDBACK FORM ═══ */}
      <section className={`${styles.testimonialSection} section`}>
        <div className="container">
          <ScrollReveal delay={100}>
            <FeedbackForm />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className={styles.ctaBanner}>
        <div className={`${styles.ctaContent} container`}>
          <ScrollReveal>
            <h2 className={styles.ctaTitle}>
              Ready to Make <span className="text-gradient">Money?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className={styles.ctaDesc}>
              Send us a message and let&apos;s figure out how to make you rich so that you can make us rich.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className={styles.ctaActions}>
              <Button href="/contact" variant="primary" size="lg">
                Send Us a Message
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
