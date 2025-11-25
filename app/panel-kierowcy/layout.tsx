import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel kierowcy – logowanie | moviQ',
  description:
    'Zaloguj się do panelu kierowcy, aby uzyskać dostęp do swoich rozliczeń, zestawień i informacji o współpracy.',
};

export default function PanelKierowcyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

