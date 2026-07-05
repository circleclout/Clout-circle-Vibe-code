import Link from "next/link";
import {
  Share2,
  Users,
  TrendingUp,
  Palette,
  Monitor,
  ArrowRight,
} from "lucide-react";
import styles from "./ServiceCard.module.css";

const iconMap = {
  "share-2": Share2,
  users: Users,
  "trending-up": TrendingUp,
  palette: Palette,
  monitor: Monitor,
};

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] || Share2;

  return (
    <div
      className={styles.card}
      style={{ "--accent": service.color, "--delay": `${index * 80}ms` }}
    >
      <div className={styles.iconWrap}>
        <Icon size={24} />
      </div>
      <h3 className={styles.title}>{service.shortTitle}</h3>
      <p className={styles.desc}>{service.description}</p>
      <Link href={`/services#${service.id}`} className={styles.link}>
        Learn More <ArrowRight size={14} />
      </Link>
      {/* Decorative corner */}
      <div className={styles.corner} />
    </div>
  );
}
