import portfolio from "@/content/portfolio";
import HomeClient from "./HomeClient";

export default function Home() {
  const featuredProjects = portfolio.filter((p) => p.featured);
  return <HomeClient featuredProjects={featuredProjects} />;
}
