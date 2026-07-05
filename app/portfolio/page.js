import portfolio from "@/content/portfolio";
import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: 'Portfolio & Case Studies | Clout Circle',
  description: 'Explore our latest case studies and see how we help brands grow with data-driven marketing.',
};

export default function PortfolioPage() {
  return <PortfolioClient portfolio={portfolio} />;
}
