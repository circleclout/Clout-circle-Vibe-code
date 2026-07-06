import {
  Target,
  Lightbulb,
  Heart,
  Zap,
  Search,
  BarChart3,
  Rocket,
  RefreshCcw,
} from "lucide-react";
import {
  IconInstagram,
  IconTwitter,
  IconLinkedin,
} from "@/components/SocialIcons/SocialIcons";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import Button from "@/components/Button/Button";
import team from "@/content/team";
import styles from "./page.module.css";

export const metadata = {
  title: "About | Clout Circle",
  description:
    "Meet the team behind Clout Circle. Learn about our story, values, and the process that drives results for our clients.",
};

const values = [
  {
    icon: Target,
    title: "Results Over Vanity",
    desc: "We care about the metrics that move your business — not just likes and followers. Every strategy is built around ROI.",
  },
  {
    icon: Lightbulb,
    title: "Creative Without the Ego",
    desc: "Great ideas can come from anywhere. We collaborate, iterate, and always put the brand's voice above our own.",
  },
  {
    icon: Heart,
    title: "Brands We Believe In",
    desc: "We only work with brands we genuinely want to see succeed. That passion shows in every campaign we launch.",
  },
  {
    icon: Zap,
    title: "Speed Meets Quality",
    desc: "The digital world moves fast. We deliver high-quality work on tight timelines because your competitors won't wait.",
  },
];

const process = [
  {
    step: "01",
    icon: Search,
    title: "Discovery",
    desc: "We dive deep into your brand, audience, competitors, and goals to understand exactly where you stand and where you want to go.",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Strategy",
    desc: "We craft a custom roadmap — not a template — tailored to your specific goals, budget, and timeline.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Execute",
    desc: "Our team brings the strategy to life with content, campaigns, designs, and development — all on schedule.",
  },
  {
    step: "04",
    icon: RefreshCcw,
    title: "Optimize",
    desc: "We track everything, learn what works, and continuously improve. Marketing isn't set-and-forget — it's a cycle.",
  },
];

const socialIconMap = {
  linkedin: IconLinkedin,
  twitter: IconTwitter,
  instagram: IconInstagram,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="About Us"
              title="The Story Behind the Circle"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className={`${styles.storySection} section`}>
        <div className={`${styles.storyGrid} container`}>
          <ScrollReveal direction="left" className={styles.storyContent}>
            <h3 className={styles.storyTitle}>
              We started because we saw people getting generic marketing, and honestly? We like money. 💸
            </h3>
            <p>
              Let&apos;s cut the corporate LARP. We didn&apos;t start this agency because of some profound spiritual calling to &quot;synergize brand ecosystems.&quot; We started it because most marketing out there is boring, generic, and ineffective—and we knew we could do it way better. Plus, money is nice.
            </p>
            <p>
              So far, we&apos;ve helped 12 brands establish a serious footing in the market without using a single stock photo of people pointing at a whiteboard. We work entirely remotely, mostly in sweatpants, fueled by caffeine and a shared desire to actually make things that grab attention.
            </p>
            <p>
              We want to make you rich so that you make us rich. It&apos;s a beautiful, symbiotic relationship.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.storyVisual}>
            <div className={styles.storyCard}>
              <span className={styles.storyCardLabel}>Office</span>
              <span className={styles.storyCardValue}>Remote 🛋️</span>
            </div>
            <div className={styles.storyCard}>
              <span className={styles.storyCardLabel}>Brands Helped</span>
              <span className={styles.storyCardValue}>12</span>
            </div>
            <div className={styles.storyCard}>
              <span className={styles.storyCardLabel}>Generic Ads</span>
              <span className={styles.storyCardValue}>0</span>
            </div>
            <div className={styles.storyCard}>
              <span className={styles.storyCardLabel}>Desire for Money</span>
              <span className={styles.storyCardValue}>100%</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className={`${styles.valuesSection} section`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="Our Values"
              title="What Drives Everything We Do"
            />
          </ScrollReveal>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <v.icon size={24} />
                  </div>
                  <h4 className={styles.valueTitle}>{v.title}</h4>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {true && (
        <section className={`${styles.teamSection} section`}>
          <div className="container">
            <ScrollReveal>
              <SectionHeading
                label="The Team"
                title="People Behind the Magic"
                description="Small team, big impact. Meet the humans who make Clout Circle tick."
              />
            </ScrollReveal>
            <div className={styles.teamGrid}>
              {team.map((member, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className={styles.teamCard}>
                    <div className={styles.teamAvatar}>
                      <span className={styles.teamInitial}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className={styles.teamName}>{member.name}</h4>
                    <p className={styles.teamRole}>{member.role}</p>
                    <p className={styles.teamBio}>{member.bio}</p>
                    <div className={styles.teamSocials}>
                      {Object.entries(member.socials).map(([platform, url]) => {
                        const Icon = socialIconMap[platform];
                        if (!Icon) return null;
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.teamSocialLink}
                            aria-label={`${member.name} on ${platform}`}
                          >
                            <Icon size={16} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className={`${styles.processSection} section`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="Our Process"
              title="How We Get It Done"
              description="No mystery, no fluff. Here's exactly how we work with every client."
            />
          </ScrollReveal>
          <div className={styles.processGrid}>
            {process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className={styles.processCard}>
                  <span className={styles.processStep}>{step.step}</span>
                  <div className={styles.processIconWrap}>
                    <step.icon size={24} />
                  </div>
                  <h4 className={styles.processTitle}>{step.title}</h4>
                  <p className={styles.processDesc}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaWrap}>
              <h2>Like what you see?</h2>
              <p>Let&apos;s talk about how we can help your brand grow.</p>
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
