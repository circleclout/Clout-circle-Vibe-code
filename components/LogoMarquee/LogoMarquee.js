import clientLogos from "@/content/clientLogos";
import styles from "./LogoMarquee.module.css";

export default function LogoMarquee() {
  // Duplicate logos for seamless infinite scroll
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section className={styles.section}>
      <p className={styles.label}>Trusted by brands that matter</p>
      <div className={styles.track}>
        <div className={styles.slider}>
          {doubled.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className={styles.logoItem}>
              <div className={styles.logoPlaceholder} aria-label={logo.alt}>
                <span className={styles.logoText}>{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
