"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminLayout.module.css";

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/profile", label: "My Profile" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/faqs", label: "FAQs" },
    { href: "/admin/settings", label: "Site Settings" },
  ];

  return (
    <nav className={styles.nav}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
