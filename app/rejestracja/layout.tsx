import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rejestracja – zacznij pracę jako kierowca aplikacji',
  description:
    'Zgłoś się do nas, a my załatwimy za Ciebie formalności i aktywujemy Cię w aplikacjach takich jak Uber, Bolt, FreeNow i delivery.',
};

export default function RejestracjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

