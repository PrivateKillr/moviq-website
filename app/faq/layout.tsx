import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – najczęstsze pytania kierowców',
  description:
    'Sprawdź odpowiedzi na najczęstsze pytania dotyczące pracy jako kierowca w aplikacjach, wymagań, dokumentów i rozliczeń.',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

