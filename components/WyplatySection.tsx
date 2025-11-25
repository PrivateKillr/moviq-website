'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, DollarSign, Smartphone, CreditCard, CheckCircle2, Shield, FileCheck, Phone } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    number: 1,
    title: 'Pracujesz jak zwykle',
    description: 'Pracujesz w aplikacjach (Uber, Bolt, FreeNow itd.) i przyjmujesz zlecenia tak, jak zawsze.',
    icon: Smartphone,
    apps: ['uber', 'bolt', 'freenow'],
  },
  {
    number: 2,
    title: 'My rozliczamy wpływy',
    description: 'Rozliczamy wpływy z aplikacji, przygotowujemy rozliczenie i wyliczamy Twoje wynagrodzenie.',
    icon: DollarSign,
  },
  {
    number: 3,
    title: 'Przelew co tydzień',
    description: 'Raz w tygodniu przelewamy Twoje wynagrodzenie na konto – zawsze w tym samym dniu.',
    icon: CreditCard,
  },
];

const benefits = [
  {
    icon: CheckCircle2,
    text: 'Nie musisz zakładać działalności – rozliczamy Cię na podstawie umowy.',
  },
  {
    icon: DollarSign,
    text: 'Jasne i proste rozliczenia – zero ukrytych opłat, wszystko widzisz na swoim rozliczeniu. Pełny podgląd stawek i prowizji.',
  },
  {
    icon: FileCheck,
    text: 'Pomagamy w licencji i badaniach – mówimy, co i gdzie załatwić, prowadzimy Cię krok po kroku.',
  },
  {
    icon: Smartphone,
    text: 'Możliwość pracy w kilku aplikacjach jednocześnie – Uber, Bolt, FreeNow i inne w jednym miejscu. Wszystkie rozliczenia i zestawienia dostępne w jednym miejscu.',
  },
  {
    icon: Calendar,
    text: 'Regularne, przewidywalne wypłaty – wiesz, kiedy i za co dostajesz pieniądze.',
  },
  {
    icon: Phone,
    text: 'Wsparcie koordynatora – odbieramy telefon, odpowiadamy na pytania i pomagamy rozwiązywać problemy.',
  },
];


export default function WyplatySection() {
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

  return (
    <section
      ref={sectionRef}
      id="wyplaty"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#020617] border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Cotygodniowe wypłaty – stabilne i przewidywalne
        </h2>
        <p
          className={`text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '200ms',
          }}
        >
          Kierowca wie, kiedy dostanie pieniądze. Łatwiej planować budżet. Zero niespodzianek.
        </p>

        {/* Quick stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '400ms',
          }}
        >
          {[
            { label: 'Wypłata', value: 'Zawsze na czas', icon: Calendar },
            { label: 'Rozliczenie', value: 'Pełna transparentność', icon: DollarSign },
            { label: 'Stawki i prowizje', value: 'Pełny podgląd', icon: DollarSign },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#0D1020] rounded-2xl p-6 shadow-xl border-2 border-[#34D399]/20 hover:border-[#34D399]/40 transition-all duration-300"
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
              >
                <IconComponent className="w-8 h-8 text-[#34D399] mx-auto mb-3" strokeWidth={2.5} />
                <div className="text-xl font-bold text-white mb-1 text-center">{stat.value}</div>
                <div className="text-xs text-gray-400 text-center">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Jak to działa */}
        <div className="mb-16">
          <h3
            className={`text-2xl md:text-3xl font-bold text-center mb-12 text-white transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '800ms',
            }}
          >
            Jak to działa?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className={`group relative bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-xl border-2 border-[#34D399]/20 hover:border-[#34D399]/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${1000 + index * 150}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#34D399]/10 flex items-center justify-center border-2 border-[#34D399]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <IconComponent className="w-8 h-8 text-[#34D399]" strokeWidth={2.5} />
                      </div>
                      <div className="w-12 h-12 bg-[#34D399] text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#34D399] transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    {step.apps && (
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <p className="text-xs font-semibold text-gray-300 mb-4 uppercase tracking-wide text-center">
                          Pracuj w najpopularniejszych aplikacjach
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {step.apps.map((app) => (
                            <div
                              key={app}
                              className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/30 flex flex-col items-center justify-center"
                            >
                              <div className="relative w-12 h-12 mb-2">
                                <Image
                                  src={`/images/${app}.${app === 'bolt' ? 'webp' : 'png'}`}
                                  alt={app}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <span className="font-semibold text-xs text-gray-900">
                                {app === 'uber' ? 'Uber' : app === 'bolt' ? 'Bolt' : 'FreeNow'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#34D399]/30 via-[#34D399] to-[#34D399]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* U nas wszystko jest przejrzyste - Przeniesione z Benefits */}
        <div className="mt-16 md:mt-20">
          <h3
            className={`text-xl md:text-2xl font-bold text-center mb-4 text-white transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '1400ms',
            }}
          >
            U nas wszystko jest przejrzyste i fair — a Twoja praca jest naprawdę doceniana.
          </h3>
          <p
            className={`text-sm md:text-base text-gray-400 text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '1500ms',
            }}
          >
            Staramy się dla Ciebie – bez ukrytych opłat, bez gwiazdek w umowie, bez niejasnych zasad. Wszystko jest przejrzyste i uczciwe.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#34D399]/20 hover:border-[#34D399]/40 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${1600 + index * 80}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* Decorative gradient background on hover */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#34D399]/5 via-transparent to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex items-start gap-6">
                    {/* Icon with green check - positioned top left */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-[#34D399]/10 flex items-center justify-center group-hover:bg-[#34D399]/20 transition-all duration-300 border-2 border-[#34D399]/20 group-hover:border-[#34D399]/40 shadow-md group-hover:shadow-lg group-hover:scale-110">
                        <IconComponent className="w-8 h-8 text-[#34D399] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 pt-2">
                      <p className="text-sm md:text-base text-white leading-relaxed font-semibold">
                        {benefit.text}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line - always visible but stronger on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#34D399]/30 via-[#34D399] to-[#34D399]/30 group-hover:from-[#34D399] via-[#34D399] to-[#34D399] transition-all duration-500 rounded-b-3xl"></div>
                  
                  {/* Top accent glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34D399]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div 
            className={`text-center transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: `${1600 + benefits.length * 80}ms`,
            }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('aplikuj');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-block bg-[#34D399] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#10b981] hover:shadow-2xl hover:shadow-[#34D399]/30 transition-all duration-300 transform hover:scale-105 active:scale-100"
              style={{
                boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
              }}
            >
              Chcę dołączyć jako kierowca
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

