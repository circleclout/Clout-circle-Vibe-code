/**
 * ============================================
 * CLOUT CIRCLE — FAQ Data
 * ============================================
 * Used by the ChatWidget and FAQ sections.
 * Add/edit questions to update the chatbot.
 * ============================================
 */

const faqData = [
  {
    question: "What services does Clout Circle offer?",
    keywords: ["services", "offer", "do", "help", "what"],
    answer:
      "We offer Social Media Management, Influencer Marketing, Performance Marketing (Paid Ads), Creative & Branding (logos, design, video), and Web Design & Development. We're a full-service agency — if it helps your brand grow, we do it.",
  },
  {
    question: "How much do your services cost?",
    keywords: ["cost", "price", "pricing", "budget", "how much", "expensive", "charge", "rate", "fee"],
    answer:
      "Our pricing depends on the scope of work, your goals, and the services you need. We offer custom packages tailored to your budget. The best way to get a quote is to fill out our 'Get a Quote' form or contact us directly.",
  },
  {
    question: "How do I get started?",
    keywords: ["start", "begin", "get started", "first step", "process", "onboard"],
    answer:
      "It's simple — fill out our contact form. We'll learn about your brand, goals, and budget, then put together a custom proposal. Once approved, we typically kick off within a week.",
  },
  {
    question: "How long before I see results?",
    keywords: ["results", "time", "how long", "when", "timeline", "duration", "months"],
    answer:
      "It depends on the service. Paid ads can show results within days. Social media growth typically takes 2-3 months to gain serious momentum. Branding projects are delivered in 3-6 weeks. We always set realistic timelines upfront.",
  },
  {
    question: "Do you work with small businesses?",
    keywords: ["small", "startup", "new", "small business", "budget", "affordable"],
    answer:
      "Absolutely! We love working with startups and small businesses. In fact, helping brands go from zero to hero is what we do best. We have packages designed specifically for businesses that are just getting started.",
  },
  {
    question: "What industries do you work with?",
    keywords: ["industry", "industries", "niche", "sector", "type of business", "who"],
    answer:
      "We've worked across food & beverage, skincare, fitness, edtech, fashion, real estate, and more. Our strategies are always customized to your specific industry and audience — no cookie-cutter approaches.",
  },
  {
    question: "Can you manage my social media accounts?",
    keywords: ["manage", "social media", "instagram", "handle", "post", "content"],
    answer:
      "Yes! We offer full social media management — strategy, content creation, scheduling, community management, and monthly reporting. We handle Instagram, LinkedIn, Twitter/X, YouTube, and Facebook.",
  },
  {
    question: "Do you offer one-time projects or only retainers?",
    keywords: ["one-time", "project", "retainer", "contract", "monthly", "commitment"],
    answer:
      "Both! Branding and web design are typically one-time projects with fixed deliverables. Social media management and performance marketing work best as monthly retainers. We're flexible — let's find what works for you.",
  },
  {
    question: "Where are you located?",
    keywords: ["location", "located", "where", "office", "city", "based"],
    answer:
      "We're based in New Delhi, India, but we work with brands across the country and internationally. Most of our collaboration happens virtually, so location is never a barrier.",
  },
  {
    question: "Can you help me build a brand from scratch?",
    keywords: ["brand", "scratch", "new brand", "identity", "logo", "build"],
    answer:
      "That's our specialty! From naming and logo design to full brand identity systems, websites, and launch campaigns — we've helped dozens of brands go from an idea to a recognizable name.",
  },
];

// Quick reply chips shown in the chat widget
export const quickReplies = [
  "What services do you offer?",
  "How much does it cost?",
  "How do I get started?",
  "Can I see your work?",
];

export default faqData;
