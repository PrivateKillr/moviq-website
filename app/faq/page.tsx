'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FileText,
  Briefcase,
  DollarSign,
  Smartphone,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const faqCategories = [
  {
    title: 'Wymagania i dokumenty',
    icon: FileText,
    gradient: 'from-blue-500 to-blue-600',
    faqs: [
      {
        question: 'Czy muszę zakładać własną działalność gospodarczą?',
        answer:
          'Nie. Współpracujemy w oparciu o umowę, dzięki czemu nie musisz prowadzić własnej firmy ani martwić się o skomplikowane rozliczenia. My zajmujemy się formalnościami.',
      },
      {
        question: 'Czy muszę mieć własny samochód?',
        answer:
          'Najlepiej, jeśli masz własne auto w dobrym stanie. Jeśli nie – skontaktuj się z nami, powiemy Ci, jakie masz opcje w Twoim mieście. W niektórych lokalizacjach możemy pomóc w zorganizowaniu pojazdu.',
      },
      {
        question: 'Jakie dokumenty są potrzebne?',
        answer:
          'Podstawowe to: prawo jazdy kategorii B, badania lekarskie do pracy jako kierowca, zaświadczenie o niekaralności (jeśli wymagane) oraz licencja taxi (jeśli wymagana w Twoim mieście). Pomagamy w uzyskaniu wszystkich potrzebnych dokumentów.',
      },
      {
        question: 'Czy potrzebuję doświadczenia jako kierowca?',
        answer:
          'Nie. Możesz zacząć nawet bez doświadczenia. Ważne, żebyś miał ważne prawo jazdy i chęć do pracy.',
      },
    ],
  },
  {
    title: 'Praca i grafiki',
    icon: Briefcase,
    gradient: 'from-purple-500 to-purple-600',
    faqs: [
      {
        question: 'Czy mogę pracować tylko w weekendy lub po pracy?',
        answer:
          'Tak. To Ty decydujesz, kiedy jeździsz – możesz traktować to jako pracę dodatkową lub pełnoetatową. Elastyczny grafik to jedna z głównych zalet tej pracy.',
      },
      {
        question: 'Czy mogę pracować w kilku aplikacjach na raz?',
        answer:
          'Tak. Po rejestracji możesz pracować w wielu aplikacjach jednocześnie (Uber, Bolt, FreeNow itd.). To zwiększa Twoje możliwości zarobkowe.',
      },
      {
        question: 'Jak szybko mogę zacząć?',
        answer:
          'Jeśli masz podstawowe dokumenty, zwykle cały proces od zgłoszenia do pierwszego zlecenia zajmuje od kilku dni do około dwóch tygodni – zależnie od miasta i urzędów.',
      },
      {
        question: 'Czy mogę pracować w różnych miastach?',
        answer:
          'Zakres dostępnych miast zależy od aktualnych umów i wymagań. Szczegóły omawiamy podczas rozmowy rekrutacyjnej.',
      },
    ],
  },
  {
    title: 'Rozliczenia i wypłaty',
    icon: DollarSign,
    gradient: 'from-orange-500 to-orange-600',
    faqs: [
      {
        question: 'Jak otrzymuję wypłatę?',
        answer:
          'Wypłaty są cotygodniowe – raz w tygodniu przelewamy Twoje wynagrodzenie na konto. To stabilne i przewidywalne rozwiązanie.',
      },
      {
        question: 'Ile mogę zarobić?',
        answer:
          'Wysokość zarobków zależy od miasta, liczby godzin i ilości zleceń. W praktyce wielu kierowców osiąga przychody rzędu 2000–3000 zł brutto tygodniowo przy intensywnej pracy.',
      },
      {
        question: 'Czy są jakieś ukryte opłaty?',
        answer:
          'Nie. Zasady rozliczeń są jasne i przejrzyste. Nie ma ukrytych opłat. Wszystko omawiamy przed podpisaniem umowy.',
      },
      {
        question: 'Jak wygląda rozliczenie?',
        answer:
          'Rozliczamy wpływy z aplikacji, przygotowujemy rozliczenie i wyliczamy Twoje wynagrodzenie. Raz w tygodniu otrzymujesz przelew na konto.',
      },
    ],
  },
  {
    title: 'Aplikacje i technikalia',
    icon: Smartphone,
    gradient: 'from-[#0BA14C] to-[#0a8a3f]',
    faqs: [
      {
        question: 'W jakich aplikacjach mogę pracować?',
        answer:
          'Po rejestracji możesz pracować w aplikacjach takich jak Uber, Bolt, FreeNow. Docelowo będziesz mógł również pracować w aplikacjach delivery (jedzenie, zakupy) – przygotowujemy tę opcję.',
      },
      {
        question: 'Czy potrzebuję specjalnego smartfona?',
        answer:
          'Wystarczy smartfon z dostępem do internetu i możliwością instalacji aplikacji. Nie potrzebujesz najnowszego modelu.',
      },
      {
        question: 'Co jeśli auto się zepsuje?',
        answer:
          'W takiej sytuacji skontaktuj się z nami. Pomożemy znaleźć rozwiązanie w zależności od sytuacji.',
      },
      {
        question: 'Czy mogę zmienić miasto pracy?',
        answer:
          'Tak, ale wymaga to aktualizacji umowy i dokumentów. Skontaktuj się z nami, omówimy szczegóły.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<{
    category: number;
    question: number;
  } | null>(null);
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

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    if (
      openIndex?.category === categoryIndex &&
      openIndex?.question === questionIndex
    ) {
      setOpenIndex(null);
    } else {
      setOpenIndex({ category: categoryIndex, question: questionIndex });
    }
  };

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center pt-20 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0BA14C] to-[#0a8a3f] shadow-xl flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{
                textShadow: '0 6px 40px rgba(0, 0, 0, 1), 0 3px 15px rgba(0, 0, 0, 0.9)',
              }}
            >
              Najczęściej zadawane pytania
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto"
              style={{
                textShadow: '0 4px 25px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              Sprawdź odpowiedzi na najczęstsze pytania dotyczące pracy jako kierowca w aplikacjach, wymagań, dokumentów i rozliczeń.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                className={`mb-16 md:mb-20 transition-all duration-1000 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${categoryIndex * 150}ms`,
                }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} shadow-md flex items-center justify-center`}
                  >
                    <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.faqs.map((faq, questionIndex) => {
                    const isOpen =
                      openIndex?.category === categoryIndex &&
                      openIndex?.question === questionIndex;

                    return (
                      <div
                        key={questionIndex}
                        className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-[#0BA14C]/30 overflow-hidden ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{
                          transitionDelay: `${categoryIndex * 150 + questionIndex * 50}ms`,
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        {/* Decorative gradient background */}
                        <div
                          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-full blur-3xl`}
                        ></div>

                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full text-left p-6 md:p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 relative z-10"
                        >
                          <span className="font-semibold text-lg md:text-xl text-gray-900 pr-4 leading-relaxed">
                            {faq.question}
                          </span>
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transition-all duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          >
                            <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </div>
                        </button>

                        {/* Answer */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#0BA14C] to-[#0a8a3f] flex items-center justify-center mt-0.5">
                                <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                              </div>
                              <p className="text-base md:text-lg text-gray-700 leading-relaxed pt-1">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom accent line when open */}
                        {isOpen && (
                          <div
                            className={`h-1.5 bg-gradient-to-r ${category.gradient} transition-opacity duration-500`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* CTA Section */}
          <div
            className={`mt-16 md:mt-20 bg-gradient-to-br from-[#0BA14C] to-[#0a8a3f] rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl text-center transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '600ms',
              boxShadow: '0 15px 50px rgba(11, 161, 76, 0.4), 0 5px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
                Nie znalazłeś odpowiedzi?
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
                Skontaktuj się z nami – odpowiemy na wszystkie Twoje pytania.
              </p>
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2 bg-white text-[#0BA14C] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-100"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                Skontaktuj się z nami
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
