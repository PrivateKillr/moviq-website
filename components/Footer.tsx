import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_NAME } from '@/app/constants';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* O nas */}
          <div>
            <Link href="/#kierowca" className="flex items-center mb-4">
              <div className="relative h-10 w-auto">
                <Image
                  src="/images/moviq_logo.png"
                  alt={COMPANY_NAME}
                  width={120}
                  height={40}
                  className="h-full w-auto object-contain"
                  unoptimized
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Partner flotowy dla kierowców aplikacji taxi i delivery.
            </p>
            <Link
              href="/#kierowca"
              className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm block mb-2"
            >
              Start
            </Link>
          </div>

          {/* Dla kierowców */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Dla kierowców</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#aplikuj"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  Aplikuj
                </Link>
              </li>
              <li>
                <Link
                  href="/#wyplaty"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  Wypłaty
                </Link>
              </li>
              <li>
                <Link
                  href="/#praca-od-zaraz"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  Praca od zaraz
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacje */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Informacje</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#0BA14E] transition-colors duration-200 text-sm"
                >
                  Regulamin
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Kontakt</h4>
            <p className="text-gray-400 text-sm mb-4">
              Masz pytania? Skontaktuj się z nami.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-[#0BA14E] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#089a42] hover:shadow-lg transition-all duration-200"
            >
              Napisz do nas
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {COMPANY_NAME}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
