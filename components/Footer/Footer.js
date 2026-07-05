import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import {
  IconInstagram,
  IconTwitter,
  IconLinkedin,
  IconYoutube,
  IconFacebook,
} from "@/components/SocialIcons/SocialIcons";
import siteConfig from "@/content/siteConfig";
import services from "@/content/services";
import styles from "./Footer.module.css";
import { getSettings } from "@/lib/getSettings";

const socialIcons = {
  instagram: IconInstagram,
  twitter: IconTwitter,
  linkedin: IconLinkedin,
  youtube: IconYoutube,
  facebook: IconFacebook,
};

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const dbSettings = await getSettings();

  const email = dbSettings?.contactEmail || siteConfig.email;
  const phone = dbSettings?.contactPhone || siteConfig.phone;
  const address = dbSettings?.contactAddress || siteConfig.address;
  
  const socials = { ...siteConfig.socials };
  if (dbSettings?.twitterUrl) socials.twitter = dbSettings.twitterUrl;
  if (dbSettings?.linkedInUrl) socials.linkedin = dbSettings.linkedInUrl;
  if (dbSettings?.instagramUrl) socials.instagram = dbSettings.instagramUrl;

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Top border accent */}
      <div className={styles.topAccent} />

      <div className={`${styles.content} container`}>
        {/* Column 1 — Brand */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Clout Circle Logo" width={40} height={40} className={styles.logoImage} />
            <span className={styles.logoClout}>CLOUT</span>
            <span className={styles.logoCircle}>CIRCLE</span>
          </Link>
          <p className={styles.brandDesc}>
            Full-service marketing agency helping brands build real influence
            through creative strategy, social media, and data-driven campaigns.
          </p>
          <div className={styles.socials}>
            {Object.entries(socials).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Follow us on ${platform}`}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.linkList}>
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className={styles.footerLink}
                >
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Get in Touch</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <a href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </li>
            <li className={styles.contactItem}>
              <Globe size={16} className={styles.contactIcon} />
              <span>{address}</span>
            </li>
          </ul>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            Chat on WhatsApp
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`${styles.bottomInner} container`}>
          <p className={styles.copyright}>
            © {currentYear} Clout Circle. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            {siteConfig.footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.legalLink}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
