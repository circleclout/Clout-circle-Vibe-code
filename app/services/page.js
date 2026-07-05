import {
  Share2,
  Users,
  TrendingUp,
  Palette,
  Monitor,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import Button from "@/components/Button/Button";
import QuoteButton from "@/components/QuoteButton/QuoteButton";
import services from "@/content/services";
import styles from "./page.module.css";

export const metadata = {
  title: "Services | Clout Circle",
  description:
    "From social media management to influencer marketing, paid ads, branding, and web design — explore the full range of services Clout Circle offers.",
};

const iconMap = {
  "share-2": Share2,
  users: Users,
  "trending-up": TrendingUp,
  palette: Palette,
  monitor: Monitor,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="Our Services"
              title="Everything You Need To Give Us Money"
              description="We're your one-stop shop for marketing, branding, and digital growth. Pick what you need, or let us handle everything so you can focus on writing the checks."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => {
        const Icon = iconMap[service.icon] || Share2;
        const isEven = i % 2 === 0;

        return (
          <section
            key={service.id}
            id={service.id}
            className={`${styles.serviceSection} ${
              isEven ? "" : styles.altBg
            }`}
          >
            <div className={`${styles.serviceRow} container`}>
              <ScrollReveal
                direction={isEven ? "left" : "right"}
                className={styles.serviceContent}
              >
                <div
                  className={styles.serviceIcon}
                  style={{ "--accent": service.color }}
                >
                  <Icon size={28} />
                </div>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
                <p className={styles.serviceLongDesc}>
                  {service.longDescription}
                </p>
                <ul className={styles.featureList}>
                  {service.features.map((feat) => (
                    <li key={feat} className={styles.featureItem}>
                      <CheckCircle
                        size={16}
                        className={styles.checkIcon}
                        style={{ color: service.color }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
                <QuoteButton variant="primary">
                  Get a Custom Quote
                </QuoteButton>
              </ScrollReveal>

              <ScrollReveal
                direction={isEven ? "right" : "left"}
                className={styles.serviceVisual}
              >
                <div
                  className={styles.visualCard}
                  style={{ "--accent": service.color }}
                >
                  {service.image ? (
                    <Image 
                      src={service.image} 
                      alt={service.shortTitle}
                      className={styles.serviceImage}
                      width={800}
                      height={600}
                    />
                  ) : (
                    <>
                      <Icon size={64} />
                      <span className={styles.visualLabel}>
                        {service.shortTitle}
                      </span>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaWrap}>
              <h2 className={styles.ctaTitle}>Not sure what you need?</h2>
              <p className={styles.ctaDesc}>
                No worries — send us a message and we&apos;ll figure it
                out together. Zero pressure, zero commitment.
              </p>
              <QuoteButton variant="primary" size="lg">
                Send Us a Message
              </QuoteButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
