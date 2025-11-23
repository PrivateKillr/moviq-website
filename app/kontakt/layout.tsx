import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt – skontaktuj się z nami',
  description:
    'Masz pytania o współpracę jako kierowca? Skontaktuj się z nami telefonicznie, mailowo lub przez formularz.',
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

