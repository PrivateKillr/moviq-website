import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "moviQ – Partner flotowy dla kierowców Uber, Bolt, FreeNow i delivery",
  description: "Zacznij zarabiać jako kierowca aplikacji w kilka dni. Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy i rozliczenia. Wypłaty co tydzień.",
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

