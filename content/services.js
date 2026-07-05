/**
 * ============================================
 * CLOUT CIRCLE — Services Data
 * ============================================
 * Edit this file to add, remove, or modify
 * your agency's service offerings.
 * ============================================
 */

const services = [
  {
    id: "social-media",
    title: "Social Media Management",
    shortTitle: "Social Media",
    icon: "share-2",
    description:
      "We build and manage your social presence across Instagram, LinkedIn, Twitter, YouTube, and more — creating scroll-stopping content that turns followers into customers.",
    longDescription:
      "Your social media shouldn't be an afterthought. We develop platform-specific strategies, create thumb-stopping content calendars, manage community engagement, and track the metrics that actually matter. From reels to carousels to stories — we handle it all so you can focus on running your business.",
    features: [
      "Platform-specific content strategy",
      "Content calendar & scheduling",
      "Community management & engagement",
      "Monthly analytics & growth reports",
      "Hashtag & trend research",
      "Story & Reels creation",
    ],
    color: "var(--gold)",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop", // Person scrolling social media
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing & Collaborations",
    shortTitle: "Influencer Marketing",
    icon: "users",
    description:
      "We connect your brand with the right creators — micro to macro — and manage end-to-end collaborations that drive real engagement, not just vanity metrics.",
    longDescription:
      "Influencer marketing done right means finding creators whose audiences genuinely align with your brand. We handle influencer discovery, vetting, outreach, negotiation, content briefing, campaign management, and performance tracking — ensuring every rupee spent delivers measurable results.",
    features: [
      "Influencer discovery & vetting",
      "Campaign strategy & briefing",
      "Contract negotiation & management",
      "Content approval workflows",
      "Performance tracking & ROI analysis",
      "Long-term brand ambassador programs",
    ],
    color: "var(--gold)",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop", // Creator filming on phone
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing & Paid Ads",
    shortTitle: "Paid Ads",
    icon: "trending-up",
    description:
      "Data-driven paid campaigns across Meta, Google, and YouTube that are built to convert — not just generate impressions. We optimize relentlessly until the numbers speak.",
    longDescription:
      "We don't just throw money at ads and hope for the best. Our performance marketing team builds full-funnel campaigns with precise targeting, compelling creatives, and continuous A/B testing. From awareness to conversion — every campaign is optimized for the metrics you care about.",
    features: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads (Search, Display, Shopping)",
      "YouTube Ads & Video campaigns",
      "Audience research & targeting",
      "A/B testing & creative optimization",
      "Conversion tracking & attribution",
    ],
    color: "var(--gold)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // Analytics dashboard on laptop
  },
  {
    id: "creative-branding",
    title: "Creative & Branding",
    shortTitle: "Branding",
    icon: "palette",
    description:
      "From logos to full brand identities — we craft visual stories that make your brand instantly recognizable and impossible to forget.",
    longDescription:
      "Your brand is more than a logo — it's the feeling people get when they see your name. We build comprehensive brand identities from scratch or refresh existing ones, including logo design, color systems, typography, brand guidelines, pitch decks, and all the collateral you need to look professional at every touchpoint.",
    features: [
      "Logo design & brand marks",
      "Complete brand identity systems",
      "Brand guidelines & style guides",
      "Pitch deck & presentation design",
      "Social media template design",
      "Video production & motion graphics",
    ],
    color: "var(--gold)",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop", // Design workspace with color swatches
  },
  {
    id: "web-development",
    title: "Web Design & Development",
    shortTitle: "Web Design",
    icon: "monitor",
    description:
      "Beautiful, fast websites and landing pages that don't just look good — they convert visitors into leads and customers.",
    longDescription:
      "We design and develop websites that serve as your hardest-working salesperson. Whether you need a sleek landing page, a full company website, or an e-commerce store — we build responsive, SEO-optimized, lightning-fast sites that look incredible on every device.",
    features: [
      "Custom website design & development",
      "Landing page creation",
      "E-commerce store setup",
      "SEO optimization",
      "Mobile-responsive design",
      "Analytics & tracking setup",
    ],
    color: "var(--gold)",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop", // Laptop with clean UI design
  },
];

export default services;
