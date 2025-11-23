import Link from 'next/link';
import { COMPANY_NAME } from '@/app/constants';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#F7F7F7] border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* O nas */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#0BA14C]">
              {COMPANY_NAME}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Partner flotowy dla kierowców aplikacji taxi i delivery.
            </p>
            <Link
              href="/"
              className="text-gray-600 hover:text-accent transition-colors duration-200 text-sm block mb-2"
            >
              Start
            </Link>
          </div>

          {/* Dla kierowców */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Dla kierowców</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rejestracja"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  Rejestracja
                </Link>
              </li>
              <li>
                <Link
                  href="/cotygodniowe-wyplaty"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  Wypłaty
                </Link>
              </li>
              <li>
                <Link
                  href="/praca-od-zaraz"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  Praca od zaraz
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacje */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Informacje</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#0BA14C] transition-colors duration-200 text-sm"
                >
                  Regulamin
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Kontakt</h4>
            <p className="text-gray-600 text-sm mb-4">
              Masz pytania? Skontaktuj się z nami.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-[#0BA14C] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#0a8a3f] hover:shadow-lg transition-all duration-200"
            >
              Napisz do nas
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} {COMPANY_NAME}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}

