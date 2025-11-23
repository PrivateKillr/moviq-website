import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Praca od zaraz jako kierowca aplikacji',
  description:
    'Praca od zaraz jako kierowca Uber, Bolt, FreeNow lub delivery. Bez doświadczenia, elastyczny grafik, wypłaty co tydzień.',
};

export default function PracaOdZarazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

