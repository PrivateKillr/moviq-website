import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Strona nie została znaleziona</h2>
        <p className="text-gray-600 mb-8">Przepraszamy, strona której szukasz nie istnieje.</p>
        <Link
          href="/"
          className="inline-block bg-[#0BA14C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0a8a3f] transition-colors"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}

