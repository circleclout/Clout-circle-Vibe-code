import siteConfig from "@/content/siteConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.seo.siteUrl}/sitemap.xml`,
  };
}
