import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Requirements from '@/components/Requirements';

export const metadata: Metadata = {
  title: 'moviQ – Partner flotowy dla kierowców Uber, Bolt, FreeNow i delivery',
  description: 'Zacznij zarabiać jako kierowca aplikacji w kilka dni. Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy i rozliczenia. Wypłaty co tydzień.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Requirements />
    </>
  );
}
