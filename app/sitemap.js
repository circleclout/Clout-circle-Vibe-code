import siteConfig from "@/content/siteConfig";

export default function sitemap() {
  const routes = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];

  return routes.map((route) => ({
    url: `${siteConfig.seo.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
