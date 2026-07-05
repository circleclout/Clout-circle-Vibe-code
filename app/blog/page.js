import { Newspaper, Bell } from "lucide-react";
import { IconInstagram, IconTwitter, IconLinkedin } from "@/components/SocialIcons/SocialIcons";
import siteConfig from "@/content/siteConfig";
import styles from "./page.module.css";

export const metadata = {
  title: "Blog — Coming Soon | Clout Circle",
  description:
    "The Clout Circle blog is coming soon. Follow us on social media for marketing tips, industry insights, and brand-building strategies.",
};

export default function BlogPage() {
  return (
    <section className={styles.comingSoon}>
      <div className={styles.bgPattern} />
      <div className={`${styles.content} container`}>
        <div className={styles.iconWrap}>
          <Newspaper size={40} />
        </div>
        <h1 className={styles.title}>
          Blog is <span className="text-gradient">Coming Soon</span>
        </h1>
        <p className={styles.desc}>
          We&apos;re cooking up marketing insights, industry deep-dives, and
          brand-building playbooks. Drop your email to get notified when we
          launch.
        </p>

        {/* Email signup */}
        <form
          className={styles.signupForm}
          action="#"
        >
          <div className={styles.inputWrap}>
            <Bell size={18} className={styles.inputIcon} />
            <input
              type="email"
              placeholder="your@email.com"
              className={styles.input}
              aria-label="Email for blog notification"
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Notify Me
          </button>
        </form>

        {/* Social links */}
        <div className={styles.socialSection}>
          <p className={styles.socialLabel}>
            In the meantime, follow us for daily tips
          </p>
          <div className={styles.socials}>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <IconInstagram size={20} />
            </a>
            <a
              href={siteConfig.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <IconTwitter size={20} />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <IconLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
