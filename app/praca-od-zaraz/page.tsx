'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  RefreshCw,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Calendar,
  Users,
  TrendingUp,
} from 'lucide-react';

const targetGroups = [
  {
    title: 'Studenci',
    description:
      'Idealna opcja na zarobek w czasie studiów. Elastyczny grafik pozwala łączyć pracę z nauką.',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Osoby szukające dodatkowego zajęcia',
    description:
      'Chcesz dorobić do głównego źródła dochodu? Możesz pracować wieczorami, w weekendy lub w wybrane dni.',
    icon: Briefcase,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Osoby zmieniające branżę',
    description:
      'Szukasz nowej ścieżki kariery? Praca jako kierowca aplikacji to dobry start, nawet bez doświadczenia.',
    icon: RefreshCw,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Osoby, które chcą samodzielnie decydować o godzinach',
    description:
      'To Ty decydujesz, kiedy pracujesz. Pełna elastyczność w zarządzaniu czasem.',
    icon: Clock,
    gradient: 'from-[#0BA14C] to-[#0a8a3f]',
  },
];

const requirements = [
  {
    text: 'Prawo jazdy kategorii B (ważne)',
    icon: CheckCircle2,
  },
  {
    text: 'Własne auto w dobrym stanie lub gotowość, by je zorganizować',
    icon: CheckCircle2,
  },
  {
    text: 'Smartfon i dostęp do internetu',
    icon: CheckCircle2,
  },
  {
    text: 'Chęć do pracy z ludźmi i do jazdy po mieście',
    icon: CheckCircle2,
  },
];

const quickStartSteps = [
  {
    number: 1,
    title: 'Zgłoś się',
    description: 'Wypełnij formularz rejestracji – to zajmie tylko kilka minut.',
    icon: Users,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    number: 2,
    title: 'Omówimy szczegóły',
    description: 'Skontaktujemy się z Tobą, odpowiemy na pytania i omówimy proces.',
    icon: Calendar,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    number: 3,
    title: 'Załatwiamy formalności',
    description: 'Pomagamy z dokumentami, badaniami i licencją – my zajmujemy się wszystkim.',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    number: 4,
    title: 'Zaczynasz zarabiać',
    description: 'Po aktywacji w aplikacjach możesz od razu przyjmować zlecenia i zarabiać.',
    icon: Zap,
    gradient: 'from-[#0BA14C] to-[#0a8a3f]',
  },
];

export default function PracaOdZarazPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center pt-20 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0BA14C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center text-white">
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{
                textShadow: '0 6px 40px rgba(0, 0, 0, 1), 0 3px 15px rgba(0, 0, 0, 0.9)',
              }}
            >
              Praca od zaraz jako kierowca aplikacji
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-8"
              style={{
                textShadow: '0 4px 25px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              Szukamy kierowców w wielu miastach w całej Polsce. Możesz zacząć nawet bez
              doświadczenia – to dobra opcja na start albo dorobienie do głównego źródła
              dochodu.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '200ms',
              }}
            >
              <Link
                href="/rejestracja"
                className="group bg-[#0BA14C] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-2xl hover:shadow-[#0BA14C]/30 transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
                style={{
                  boxShadow: '0 4px 20px rgba(11, 161, 76, 0.3)',
                }}
              >
                Zarejestruj się teraz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/faq"
                className="group border-2 border-white/90 text-white px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 backdrop-blur-sm hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100"
                style={{
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
              >
                Masz pytania? Zobacz FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dla kogo */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Dla kogo jest ta praca?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {targetGroups.map((group, index) => {
              const IconComponent = group.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-[#0BA14C]/30 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Decorative gradient background */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${group.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl`}
                  ></div>

                  {/* Top accent glow */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0BA14C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>

                  <div className="flex items-start gap-6 relative z-10">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${group.gradient} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex items-center justify-center`}
                      >
                        <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-tight group-hover:text-[#0BA14C] transition-colors duration-300">
                        {group.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0BA14C] to-[#0BA14C] opacity-100 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jak szybko możesz zacząć */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] border-t-2 border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Jak szybko możesz zacząć?
          </h2>

          <div
            className={`bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl border-2 border-gray-200 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '200ms',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Jeśli masz podstawowe dokumenty (prawo jazdy, badania lekarskie),
                  możesz zacząć pracę już w <strong className="text-[#0BA14C] font-bold">kilka dni</strong> od zgłoszenia.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  W zależności od miasta i wymagań dotyczących licencji taxi, cały proces może
                  zająć od kilku dni do około <strong className="text-[#0BA14C] font-bold">dwóch tygodni</strong>.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Pomagamy na każdym etapie – od wypełnienia formularza, przez
                  zorganizowanie dokumentów, aż po aktywację w aplikacjach.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold text-[#0BA14C]">
                  Nie musisz się martwić o formalności – my załatwiamy to za Ciebie.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start Steps */}
          <div className="mt-16 md:mt-20">
            <h3
              className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '400ms',
              }}
            >
              Proces rejestracji krok po kroku
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {quickStartSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-[#0BA14C]/30 hover:-translate-y-2 overflow-hidden ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 100}ms`,
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {/* Decorative gradient */}
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${step.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-2xl`}
                    ></div>

                    {/* Number badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} shadow-md group-hover:scale-110 transition-all duration-500 flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-xl">{step.number}</span>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    <h4 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#0BA14C] transition-colors duration-300 relative z-10">
                      {step.title}
                    </h4>
                    <p className="text-base text-gray-700 leading-relaxed relative z-10">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Co musisz mieć */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Co musisz mieć na start?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {requirements.map((req, index) => {
              const IconComponent = req.icon;
              return (
                <div
                  key={index}
                  className={`group flex items-start gap-4 bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-[#0BA14C]/30 hover:-translate-y-2 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0BA14C] to-[#0a8a3f] shadow-md group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed font-semibold pt-1">
                    {req.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0BA14C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              textShadow: '0 6px 40px rgba(0, 0, 0, 1), 0 3px 15px rgba(0, 0, 0, 0.9)',
            }}
          >
            Gotowy na start?
          </h2>
          <p
            className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '200ms',
              textShadow: '0 4px 25px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9)',
            }}
          >
            Wypełnij formularz rejestracji – resztą zajmiemy się my. Skontaktujemy się z
            Tobą, omówimy szczegóły i przeprowadzimy Cię przez cały proces.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '400ms',
            }}
          >
            <Link
              href="/rejestracja"
              className="group bg-[#0BA14C] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-2xl hover:shadow-[#0BA14C]/30 transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
              style={{
                boxShadow: '0 4px 20px rgba(11, 161, 76, 0.3)',
              }}
            >
              Przejdź do rejestracji
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/faq"
              className="group border-2 border-white/90 text-white px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 backdrop-blur-sm hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              Zobacz FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
