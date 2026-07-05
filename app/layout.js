import "./globals.css";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import Preloader from "@/components/Preloader/Preloader";
import ThemePersister from "@/components/ThemePersister/ThemePersister";
import QuoteForm from "@/components/QuoteForm/QuoteForm";
import siteConfig from "@/content/siteConfig";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.seo.siteUrl),
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    creator: siteConfig.seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var t = localStorage.getItem('cc-theme');
                if (t === 'light' || t === 'dark') {
                  document.documentElement.setAttribute('data-theme', t);
                }
                var r = localStorage.getItem('clout_theme_r');
                var g = localStorage.getItem('clout_theme_g');
                var b = localStorage.getItem('clout_theme_b');
                if (r && g && b) {
                  document.documentElement.style.setProperty("--gold", "rgb("+r+", "+g+", "+b+")");
                  document.documentElement.style.setProperty("--gold-dark", "rgb("+Math.floor(r * 0.75)+", "+Math.floor(g * 0.75)+", "+Math.floor(b * 0.75)+")");
                  document.documentElement.style.setProperty("--gold-light", "rgb("+Math.min(255, parseInt(r) + 40)+", "+Math.min(255, parseInt(g) + 40)+", "+Math.min(255, parseInt(b) + 40)+")");
                  document.documentElement.style.setProperty("--gold-glow", "rgba("+r+", "+g+", "+b+", 0.2)");
                  document.documentElement.style.setProperty("--border-gold", "rgba("+r+", "+g+", "+b+", 0.5)");
                  document.documentElement.style.setProperty("--gold-gradient", "linear-gradient(135deg, rgb("+r+", "+g+", "+b+"), rgb("+Math.floor(r * 0.6)+", "+Math.floor(g * 0.6)+", "+Math.floor(b * 0.6)+"))");
                }
              } catch(e) {}
            })();
          `}
        </Script>
        <ThemeProvider>
          <ThemePersister>
            <Preloader />
            <Navbar />
            <main style={{ minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
              {children}
            </main>
            <Footer />
            <ChatWidget />
            <QuoteForm />
          </ThemePersister>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
