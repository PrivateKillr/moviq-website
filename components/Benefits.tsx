'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Shield, 
  DollarSign, 
  FileCheck, 
  Smartphone, 
  Calendar,
  Phone 
} from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle2,
    text: 'Nie musisz zakładać działalności – rozliczamy Cię na podstawie umowy.',
  },
  {
    icon: DollarSign,
    text: 'Jasne i proste rozliczenia – zero ukrytych opłat, wszystko widzisz na swoim rozliczeniu.',
  },
  {
    icon: FileCheck,
    text: 'Pomagamy w licencji i badaniach – mówimy, co i gdzie załatwić, prowadzimy Cię krok po kroku.',
  },
  {
    icon: Smartphone,
    text: 'Możliwość pracy w kilku aplikacjach jednocześnie – Uber, Bolt, FreeNow i inne w jednym miejscu.',
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

export default function Benefits() {
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
    <section 
      ref={sectionRef}
      className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-[#020617] border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
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
                  transitionDelay: `${200 + index * 80}ms`,
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
            transitionDelay: `${400 + benefits.length * 80}ms`,
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
    </section>
  );
}
