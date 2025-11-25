import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "moviQ – Partner flotowy dla kierowców Uber, Bolt, FreeNow i delivery",
  description: "Zacznij zarabiać jako kierowca aplikacji w kilka dni. Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy i rozliczenia. Wypłaty co tydzień.",
  icons: {
    icon: "/images/moviq_logo.png",
    shortcut: "/images/moviq_logo.png",
    apple: "/images/moviq_logo.png",
  },
  openGraph: {
    title: "moviQ – Partner flotowy dla kierowców Uber, Bolt, FreeNow i delivery",
    description: "Zacznij zarabiać jako kierowca aplikacji w kilka dni. Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy i rozliczenia. Wypłaty co tydzień.",
    images: [
      {
        url: "/images/moviq_logo.png",
        width: 1200,
        height: 630,
        alt: "moviQ - Partner flotowy dla kierowców",
      },
    ],
    type: "website",
    locale: "pl_PL",
    siteName: "moviQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "moviQ – Partner flotowy dla kierowców Uber, Bolt, FreeNow i delivery",
    description: "Zacznij zarabiać jako kierowca aplikacji w kilka dni. Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy i rozliczenia. Wypłaty co tydzień.",
    images: ["/images/moviq_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        {/* Skip to main content link - WCAG 2.2: Keyboard accessible navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#34D399] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#34D399] focus:ring-offset-2 focus:ring-offset-[#020617]"
        >
          Przejdź do treści głównej
        </a>
        <Navbar />
        <main id="main-content" className="pt-16 md:pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

