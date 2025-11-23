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
        <Navbar />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

