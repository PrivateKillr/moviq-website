import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import PracaOdZarazSection from '@/components/PracaOdZarazSection';
import AplikujSection from '@/components/AplikujSection';
import WyplatySection from '@/components/WyplatySection';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'moviQ – Praca jako kierowca Uber, Bolt, FreeNow | Auto dla kierowców | Wypłaty co tydzień',
  description: 'Zacznij zarabiać jako kierowca Uber, Bolt i FreeNow nawet w 3 dni. Organizujemy auto, licencję taxi, badania lekarskie i aktywację w aplikacjach. Wypłaty co tydzień – zawsze na czas.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PracaOdZarazSection />
      <AplikujSection />
      <WyplatySection />
      <FAQSection />
    </>
  );
}
