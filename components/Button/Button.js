import Link from "next/link";
import styles from "./Button.module.css";

/**
 * Button component
 * @param {Object} props
 * @param {"primary"|"outline"|"ghost"} props.variant
 * @param {"sm"|"md"|"lg"} props.size
 * @param {string} props.href - If provided, renders as a Link
 * @param {boolean} props.external - If true, opens in new tab
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  className = "",
  ...props
}) {
  const classes = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
