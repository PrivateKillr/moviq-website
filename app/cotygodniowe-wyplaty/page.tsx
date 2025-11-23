'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2,
  XCircle,
  ArrowRight,
  Smartphone,
  CreditCard
} from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Pracujesz jak zwykle',
    description:
      'Pracujesz w aplikacjach (Uber, Bolt, FreeNow itd.) i przyjmujesz zlecenia tak, jak zawsze.',
    icon: Smartphone,
    apps: ['uber', 'bolt', 'freenow'],
  },
  {
    number: 2,
    title: 'My rozliczamy wpływy',
    description:
      'Rozliczamy wpływy z aplikacji, przygotowujemy rozliczenie i wyliczamy Twoje wynagrodzenie.',
    icon: DollarSign,
  },
  {
    number: 3,
    title: 'Przelew co tydzień',
    description:
      'Raz w tygodniu przelewamy Twoje wynagrodzenie na konto – zawsze w tym samym dniu.',
    icon: CreditCard,
  },
];

const benefits = [
  {
    icon: CheckCircle2,
    text: 'Łatwiej zarządzać domowym budżetem – wiesz, kiedy dostaniesz pieniądze',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: CheckCircle2,
    text: 'Regularny cashflow przy pracy part-time i full-time',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: CheckCircle2,
    text: 'Jasne rozliczenia – raz w tygodniu podsumowanie',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    icon: CheckCircle2,
    text: 'Brak niespodzianek – zawsze wiesz, kiedy wypłata',
    gradient: 'from-accent to-[#0a8a3f]',
  },
];

export default function CotygodnioweWyplatyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
  const [ctaVideoLoaded, setCtaVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);

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

  // Handle hero video loading
  useEffect(() => {
    if (isVisible && heroVideoRef.current) {
      const video = heroVideoRef.current;
      video.playbackRate = 0.7;

      const handleVideoReady = () => {
        setHeroVideoLoaded(true);
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err);
        });
      };

      setHeroVideoLoaded(true);

      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      video.addEventListener('loadedmetadata', () => {
        setHeroVideoLoaded(true);
        video.play().catch(() => {});
      });

      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });

      setTimeout(() => {
        setHeroVideoLoaded(true);
      }, 1000);

      return () => {
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('canplaythrough', handleVideoReady);
        video.removeEventListener('loadedmetadata', handleVideoReady);
      };
    }
  }, [isVisible]);

  // Handle CTA video loading
  useEffect(() => {
    if (isVisible && ctaVideoRef.current) {
      const video = ctaVideoRef.current;
      video.playbackRate = 0.7;

      const handleVideoReady = () => {
        setCtaVideoLoaded(true);
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err);
        });
      };

      setCtaVideoLoaded(true);

      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      video.addEventListener('loadedmetadata', () => {
        setCtaVideoLoaded(true);
        video.play().catch(() => {});
      });

      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });

      setTimeout(() => {
        setCtaVideoLoaded(true);
      }, 1000);

      return () => {
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('canplaythrough', handleVideoReady);
        video.removeEventListener('loadedmetadata', handleVideoReady);
      };
    }
  }, [isVisible]);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen"
    >
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[80vh] flex items-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Blurred placeholder */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-opacity duration-500 ${
              heroVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              filter: 'blur(20px)',
            }}
          />

          {/* Video */}
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              heroVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectPosition: 'center center',
            }}
          >
            <source src="/videos/next.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
          <div className={`space-y-8 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)',
              }}
            >
              Cotygodniowe wypłaty – stabilne i przewidywalne
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.5)',
              }}
            >
              Kierowca wie, kiedy dostanie pieniądze. Łatwiej planować budżet. Zero niespodzianek.
            </p>
            
            {/* Quick stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '300ms',
            }}>
              {[
                { label: 'Wypłata', value: 'Co tydzień', icon: Calendar },
                { label: 'Rozliczenie', value: 'Jasne i proste', icon: DollarSign },
                { label: 'Zero ukrytych opłat', value: 'Wszystko widzisz', icon: CheckCircle2 },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
                    style={{
                      transitionDelay: `${400 + index * 100}ms`,
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-accent mx-auto mb-3" strokeWidth={2.5} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Jak to działa - Enhanced */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '600ms',
          }}>
            Jak to działa?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-gray-200 hover:border-accent/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${800 + index * 150}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border-2 border-accent/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <IconComponent className="w-8 h-8 text-accent" strokeWidth={2.5} />
                      </div>
                      <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    {/* App icons for first step */}
                    {step.apps && (
                      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                        {step.apps.map((app, appIndex) => (
                          <div
                            key={app}
                            className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-300"
                            style={{
                              transitionDelay: `${1000 + index * 150 + appIndex * 50}ms`,
                            }}
                          >
                            <div className="relative w-10 h-10">
                              <Image
                                src={`/images/${app}.${app === 'bolt' ? 'webp' : 'png'}`}
                                alt={app}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent/30 via-accent to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dlaczego tygodniówka - Enhanced with gradients */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '1200ms',
          }}>
            Dlaczego tygodniówka się opłaca?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-gray-200 hover:border-accent/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${1400 + index * 100}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Gradient background */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${benefit.gradient} opacity-5 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <p className="text-base md:text-lg text-gray-900 leading-relaxed font-semibold pt-1">
                      {benefit.text}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Porównanie - Enhanced split screen style */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-gray-100/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '1800ms',
          }}>
            Raz w tygodniu vs. raz w miesiącu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Wypłata co tydzień - Enhanced */}
            <div className={`group relative bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-accent/40 transition-all duration-1000 ease-out hover:scale-[1.02] ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
            style={{
              transitionDelay: '2000ms',
              boxShadow: '0 20px 60px rgba(11, 161, 76, 0.2), 0 10px 30px rgba(0, 0, 0, 0.1)',
            }}>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Wypłata co tydzień
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Łatwiejsze planowanie budżetu',
                    'Regularny dostęp do zarobków',
                    'Mniejsze ryzyko problemów z płynnością',
                  ].map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 transition-all duration-700 ease-out"
                      style={{
                        transitionDelay: `${2200 + index * 100}ms`,
                      }}
                    >
                      <svg
                        className="w-6 h-6 text-accent flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-900 font-semibold">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Wypłata raz w miesiącu - Enhanced */}
            <div className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-gray-200 transition-all duration-1000 ease-out hover:scale-[1.02] ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
            style={{
              transitionDelay: '2000ms',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
            }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-300 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-gray-600" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-600">
                  Wypłata raz w miesiącu
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Trudniejsze zarządzanie budżetem',
                  'Długie oczekiwanie na wypłatę',
                  'Większe ryzyko problemów z płynnością',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-base md:text-lg text-gray-500 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced with video background */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-opacity duration-500 ${
              ctaVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              filter: 'blur(20px)',
            }}
          />
          <video
            ref={ctaVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              ctaVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectPosition: 'center center',
            }}
          >
            <source src="/videos/Umowa.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '2400ms',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)',
          }}>
            Zacznij zarabiać z regularnymi wypłatami
          </h2>
          <p className={`text-xl md:text-2xl text-white/90 mb-10 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '2600ms',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.7)',
          }}>
            Zarejestruj się jako kierowca i ciesz się stabilnymi, cotygodniowymi
            wypłatami.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '2800ms',
          }}>
            <Link
              href="/rejestracja"
              className="group bg-accent text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
              style={{
                boxShadow: '0 4px 20px rgba(11, 161, 76, 0.4)',
              }}
            >
              Zarejestruj się jako kierowca
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/faq"
              className="border-2 border-white/50 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              Masz pytania o rozliczenia? Zobacz FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
