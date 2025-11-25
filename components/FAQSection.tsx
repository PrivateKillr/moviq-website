'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

// Condensed FAQ - 7 most important questions
const faqs = [
  {
    question: 'Czy muszę zakładać własną działalność gospodarczą?',
    answer: 'Nie. Współpracujemy w oparciu o umowę, dzięki czemu nie musisz prowadzić własnej firmy ani martwić się o skomplikowane rozliczenia. My zajmujemy się formalnościami.',
  },
  {
    question: 'Jak otrzymuję wypłatę?',
    answer: 'Wypłaty są cotygodniowe – raz w tygodniu przelewamy Twoje wynagrodzenie na konto. To stabilne i przewidywalne rozwiązanie.',
  },
  {
    question: 'Czy mogę pracować tylko w weekendy lub po pracy?',
    answer: 'Tak. To Ty decydujesz, kiedy jeździsz – możesz traktować to jako pracę dodatkową lub pełnoetatową. Elastyczny grafik to jedna z głównych zalet tej pracy.',
  },
  {
    question: 'Ile mogę zarobić?',
    answer: 'Wysokość zarobków zależy od miasta, liczby godzin i ilości zleceń. W praktyce wielu kierowców osiąga przychody rzędu 2000–3000 zł brutto tygodniowo przy intensywnej pracy.',
  },
  {
    question: 'Czy są jakieś ukryte opłaty?',
    answer: 'Nie. Zasady rozliczeń są jasne i przejrzyste. Nie ma ukrytych opłat. Wszystko omawiamy przed podpisaniem umowy.',
  },
  {
    question: 'Jak szybko mogę zacząć?',
    answer: 'Jeśli masz podstawowe dokumenty, zwykle cały proces od zgłoszenia do pierwszego zlecenia zajmuje od kilku dni do około dwóch tygodni – zależnie od miasta i urzędów.',
  },
  {
    question: 'W jakich aplikacjach mogę pracować?',
    answer: 'Po rejestracji możesz pracować w aplikacjach takich jak Uber, Bolt, FreeNow. Docelowo będziesz mógł również pracować w aplikacjach delivery (jedzenie, zakupy) – przygotowujemy tę opcję.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      observer.disconnect();
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // WCAG 2.2: Keyboard navigation for FAQ accordion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#020617] border-t border-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Najczęściej zadawane pytania
        </h2>
        <p
          className={`text-base md:text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '200ms',
          }}
        >
          Sprawdź odpowiedzi na najczęstsze pytania dotyczące pracy jako kierowca w aplikacjach.
        </p>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group relative bg-[#0D1020] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#0BA14E]/20 hover:border-[#0BA14E]/40 overflow-hidden ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${
                  isOpen ? 'border-[#0BA14E]/50' : ''
                }`}
                style={{
                  transitionDelay: `${400 + index * 80}ms`,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between hover:bg-[#020617]/50 focus-visible:bg-[#020617]/50 focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-lg transition-colors duration-200 relative z-10"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="font-semibold text-base md:text-lg text-white pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0BA14E] to-[#10b981] flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 relative z-10">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#0BA14E] flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0BA14E] via-[#0BA14E] to-[#0BA14E] transition-opacity duration-500 rounded-b-3xl"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`relative py-12 md:py-16 px-6 md:px-8 overflow-hidden bg-gradient-to-br from-[#0BA14E] via-[#10b981] to-[#0BA14E] rounded-3xl text-white text-center shadow-2xl transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '1000ms',
            boxShadow: '0 15px 50px rgba(52, 211, 153, 0.4), 0 5px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md">
              Nie znalazłeś odpowiedzi?
            </h3>
            <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Skontaktuj się z nami – odpowiemy na wszystkie Twoje pytania.
            </p>
            <Link
              href="/kontakt"
              className="group inline-block bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-base hover:bg-gray-100 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2 mx-auto max-w-xs"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              Skontaktuj się z nami
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

