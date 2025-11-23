import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotygodniowe wypłaty dla kierowców',
  description:
    'Pracuj w aplikacjach taxi i delivery, a wynagrodzenie otrzymasz raz w tygodniu – jasno, regularnie i bez zaskoczeń.',
};

export default function CotygodnioweWyplatyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

