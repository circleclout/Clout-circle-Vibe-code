"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard/CaseStudyCard";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export const portfolioCategories = [
  { id: "all", label: "All Work" },
  { id: "social-media", label: "Social Media" },
  { id: "influencer", label: "Influencer" },
  { id: "ads", label: "Paid Ads" },
  { id: "branding", label: "Branding" },
  { id: "web", label: "Web Design" },
];

export default function PortfolioClient({ portfolio }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? portfolio
      : portfolio.filter((p) => p.category === activeFilter);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="Our Work"
              title="Case Studies & Results"
              description="Real campaigns, real numbers. Every project here represents a brand that trusted us — and the results that proved them right."
            />
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.portfolioSection}>
        <div className="container">
          {/* Filter tabs */}
          <ScrollReveal>
            <div className={styles.filters}>
              {portfolioCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${
                    activeFilter === cat.id ? styles.filterActive : ""
                  }`}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <CaseStudyCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>
              No projects in this category yet. Check back soon!
            </p>
          )}

          {/* CTA */}
          <ScrollReveal>
            <div className={styles.cta}>
              <p className={styles.ctaText}>
                Want results like these for your brand?
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Let&apos;s Talk
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
