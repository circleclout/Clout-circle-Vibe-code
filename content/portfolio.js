/**
 * ============================================
 * CLOUT CIRCLE — Portfolio / Case Studies
 * ============================================
 * Replace these with your real case studies.
 * Images should be placed in /public/images/portfolio/
 * ============================================
 */

const portfolio = [
  {
    id: "batchbro",
    title: "Marketing & Frontend for an Education Marketplace",
    client: "Batchbro",
    category: "social-media",
    description:
      "Batchbro is a local education discovery platform. We spearheaded their go-to-market strategy and led the frontend development to create a seamless, fast, and highly converting marketplace for families to find tutors and schools.",
    results: [
      { label: "Frontend Speed", value: "<1s" },
      { label: "Monthly Users", value: "10K+" },
      { label: "Conversion", value: "12%" },
      { label: "Locations", value: "Mathura" },
    ],
    tags: ["Frontend Development", "Marketing", "UI/UX Design"],
    image: "https://www.batchbro.com/batchbro_logo_transparent.png", 
    featured: true,
  },
  {
    id: "rimble",
    title: "Frontend & Marketing for an AI 3D Web Builder",
    client: "Rimble",
    category: "social-media",
    description:
      "Rimble is an innovative AI 3D website builder. We drove their digital marketing efforts and built out their complex frontend interface, turning a sophisticated WebGL tool into an accessible, user-friendly studio experience.",
    results: [
      { label: "Signups", value: "5K+" },
      { label: "Performance", value: "98" },
      { label: "Ad ROAS", value: "3.5x" },
      { label: "Bounce Rate", value: "-30%" },
    ],
    tags: ["Frontend Development", "Performance Marketing", "WebGL"],
    image: "/rimble-logo.svg", 
    featured: true,
  }
];

// Categories for the portfolio filter
export const portfolioCategories = [
  { id: "all", label: "All Work" },
  { id: "social-media", label: "Social Media" },
  { id: "influencer", label: "Influencer" },
  { id: "ads", label: "Paid Ads" },
  { id: "branding", label: "Branding" },
  { id: "web", label: "Web Design" },
];

export default portfolio;
