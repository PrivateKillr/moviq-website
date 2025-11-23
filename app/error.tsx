'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Coś poszło nie tak</h1>
        <p className="text-gray-600 mb-8">Wystąpił błąd podczas ładowania strony.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-[#0BA14C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0a8a3f] transition-colors"
          >
            Spróbuj ponownie
          </button>
          <Link
            href="/"
            className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}

