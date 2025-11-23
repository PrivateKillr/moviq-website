'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Czy muszę zakładać własną działalność gospodarczą?',
    answer:
      'Nie. Współpracujemy w oparciu o umowę, dzięki czemu nie musisz prowadzić własnej firmy ani martwić się o skomplikowane rozliczenia.',
  },
  {
    question: 'Czy muszę mieć własny samochód?',
    answer:
      'Najlepiej, jeśli masz własne auto w dobrym stanie. Jeśli nie – skontaktuj się z nami, powiemy Ci, jakie masz opcje w Twoim mieście.',
  },
  {
    question: 'Ile mogę zarobić?',
    answer:
      'Wysokość zarobków zależy od miasta, liczby godzin i ilości zleceń. W praktyce wielu kierowców osiąga przychody rzędu 2000–3000 zł brutto tygodniowo przy intensywnej pracy.',
  },
  {
    question: 'Czy mogę pracować tylko w weekendy lub po pracy?',
    answer:
      'Tak. To Ty decydujesz, kiedy jeździsz – możesz traktować to jako pracę dodatkową lub pełnoetatową.',
  },
  {
    question: 'Jak szybko mogę zacząć?',
    answer:
      'Jeśli masz podstawowe dokumenty, zwykle cały proces od zgłoszenia do pierwszego zlecenia zajmuje od kilku dni do około dwóch tygodni – zależnie od miasta i urzędów.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          Najczęstsze pytania
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-lg text-gray-800 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

