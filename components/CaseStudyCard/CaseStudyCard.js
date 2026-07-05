import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./CaseStudyCard.module.css";

export default function CaseStudyCard({ project, featured = false }) {
  return (
    <div className={`${styles.card} ${featured ? styles.featured : ""}`}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <Image 
          src={project.image} 
          alt={project.title} 
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <div className={styles.resultGrid}>
            {project.results.slice(0, 2).map((r, i) => (
              <div key={i} className={styles.resultItem}>
                <span className={styles.resultValue}>{r.value}</span>
                <span className={styles.resultLabel}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.client}>{project.client}</p>
        <Link href={`/portfolio#${project.id}`} className={styles.link}>
          View Case Study <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
