import styles from "./SectionHeading.module.css";

/**
 * Reusable section heading with label, title, and description
 * @param {Object} props
 * @param {string} props.label - Small uppercase label above title
 * @param {string} props.title - Main heading
 * @param {string} props.description - Optional paragraph below title
 * @param {"left"|"center"} props.align
 */
export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}) {
  return (
    <div
      className={`${styles.heading} ${align === "center" ? styles.center : ""}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div
        className={`gold-line ${align === "center" ? "gold-line--center" : ""}`}
      />
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
