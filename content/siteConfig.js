/**
 * ============================================
 * CLOUT CIRCLE — Site Configuration
 * ============================================
 * Edit this file to update your agency's info.
 * No need to touch any component code.
 * ============================================
 */

const siteConfig = {
  // ─── Agency Info ──────────────────────────
  name: "Clout Circle",
  tagline: "We Don't Just Market. We Make Brands Unforgettable.",
  description:
    "Clout Circle is a full-service marketing agency helping startups, local businesses, and personal brands build real influence through social media, influencer partnerships, paid ads, and creative branding.",

  // ─── Contact Details ──────────────────────
  // Replace these with your real info
  email: "circleclout@mail.com",
  phone: "+91 89507 07402",
  whatsapp: "+918950707402", // no spaces, include country code
  address: "Remote",

  // ─── Booking ──────────────────────────────
  // Your Calendly link for scheduling calls
  calendlyUrl: "https://calendly.com/cloutcircle/strategy-call",

  // ─── Form Submission ──────────────────────
  // Sign up at formspree.io and paste your form ID
  formspreeId: "mgojkwgl",

  // ─── Social Media Links ───────────────────
  socials: {
    instagram: "https://instagram.com/cloutcircle",
    twitter: "https://twitter.com/cloutcircle",
    linkedin: "https://linkedin.com/company/cloutcircle",
    youtube: "https://youtube.com/@cloutcircle",
    facebook: "https://facebook.com/cloutcircle",
  },

  // ─── SEO Defaults ─────────────────────────
  seo: {
    titleTemplate: "%s | Clout Circle",
    defaultTitle: "Clout Circle — Marketing That Makes Brands Unforgettable",
    description:
      "Full-service marketing agency specializing in social media management, influencer marketing, performance ads, and creative branding for startups and growing brands.",
    siteUrl: "https://circleclout.com",
    ogImage: "/images/og-image.jpg",
    twitterHandle: "@cloutcircle",
  },

  // ─── Navigation Links ─────────────────────
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  // ─── Footer Quick Links ───────────────────
  footerLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default siteConfig;
