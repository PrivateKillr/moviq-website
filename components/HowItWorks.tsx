'use client';

import { useEffect, useRef, useState } from 'react';
import { ClipboardCheck, Stethoscope, FileCheck, Car, Smartphone, ArrowDown } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    number: 1,
    day: 'Dzień 1',
    title: 'Zgłaszasz się do nas',
    description:
      'Wypełniasz krótki formularz lub dzwonisz. Oddzwaniamy, odpowiadamy na pytania i od razu umawiamy termin badań.',
    icon: ClipboardCheck,
  },
  {
    number: 2,
    day: 'Dzień 1–2',
    title: 'Badania i dokumenty',
    description:
      'To my umawiamy Cię na badania. Ty jedziesz, robisz je i wychodzisz. Informujemy, jakie dokumenty będą potrzebne. Koszt badań rozbijamy w rozliczeniach, więc praktycznie ich nie odczuwasz.',
    icon: Stethoscope,
  },
  {
    number: 3,
    day: 'Dzień 2–3',
    title: 'Załatwiamy formalności',
    description:
      'Przygotowujemy umowę, pomagamy z licencją taxi (jeśli jest wymagana) i aktywujemy Cię w aplikacjach.',
    icon: FileCheck,
  },
  {
    number: 4,
    day: 'Od dnia 3',
    title: 'Zaczynasz jeździć i zarabiać',
    description:
      'Po formalnościach możesz przyjmować zlecenia i pracować w aplikacjach — a my wspieramy Cię dalej.',
    icon: Car,
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showNextSection, setShowNextSection] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    // Calculate progress based on scroll position
    const calculateProgress = () => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      const heroSection = document.getElementById('kierowca');
      const cardsContainer = cardsContainerRef.current;
      
      if (!heroSection || !cardsContainer) return;
      
      const heroRect = heroSection.getBoundingClientRect();
      const cardsRect = cardsContainer.getBoundingClientRect();
      
      const heroTop = heroRect.top + scrollY;
      const cardsTop = cardsRect.top + scrollY;
      const cardsHeight = cardsRect.height;
      const cardsBottom = cardsTop + cardsHeight;
      
      const startTrigger = windowHeight * 0.2;
      const endTrigger = windowHeight * 0.7;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top + scrollY;
      
      const scrollStart = sectionTop - startTrigger;
      const scrollEnd = cardsTop + (cardsHeight * 0.6) - endTrigger;
      const scrollRange = scrollEnd - scrollStart;
      
      let progressValue = 0;
      
      if (scrollY <= scrollStart) {
        progressValue = 0;
      } else if (scrollY >= scrollEnd) {
        progressValue = 100;
      } else if (scrollRange > 0) {
        progressValue = ((scrollY - scrollStart) / scrollRange) * 100 * 1.5;
        progressValue = Math.max(0, Math.min(100, progressValue));
      } else {
        progressValue = scrollY > cardsBottom ? 100 : 0;
      }

      setProgress(progressValue);

      if (progressValue >= 100 && !showNextSection) {
        setShowNextSection(true);
      } else if (progressValue < 100) {
        setShowNextSection(false);
      }
    };

    let rafId: number | null = null;
    let ticking = false;

    const updateProgress = () => {
      calculateProgress();
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    calculateProgress();

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    };
  }, [showNextSection]);

  useEffect(() => {
    if (showNextSection && videoRef.current) {
      const video = videoRef.current;
      video.playbackRate = 0.7;

      const handleVideoReady = () => {
        setVideoLoaded(true);
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err);
        });
      };

      const handleMetadataLoaded = () => {
        setVideoLoaded(true);
        video.play().catch(() => {});
      };

      setVideoLoaded(true);

      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      video.addEventListener('loadedmetadata', handleMetadataLoaded);

      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });

      const timeoutId = setTimeout(() => {
        setVideoLoaded(true);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('canplaythrough', handleVideoReady);
        video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      };
    }
  }, [showNextSection]);

  return (
    <section
      ref={sectionRef}
      id="jak-to-dziala"
      className="pt-16 md:pt-20 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 bg-[#020617]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 md:mb-20 text-white">
          Jak wygląda współpraca krok po kroku?
        </h2>
      </div>

      {/* Full-width Timeline - Above cards */}
      <div className="hidden md:block relative mb-20 -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Background line - full width */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800"></div>
        
        {/* Animated progress line - full width */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#0BA14E] via-[#0BA14E] to-[#0BA14E] transition-all duration-1000 ease-out shadow-lg"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
          }}
        ></div>

        {/* Animated car moving along timeline */}
        <div
          className="hidden md:block absolute top-0 transition-all duration-2000 ease-out z-20"
          style={{
            left: `calc(${progress}% - 24px)`,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="relative">
            <div className="bg-gradient-to-br from-[#0BA14E] to-[#10b981] rounded-xl p-3 shadow-2xl border-4 border-[#0D1020]">
              <Car className="w-8 h-8 text-white" strokeWidth={2.5} fill="currentColor" />
            </div>
            <div className="absolute inset-0 bg-[#0BA14E]/30 rounded-xl blur-lg -z-10 animate-pulse"></div>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0BA14E]/30 rounded-full blur-md"></div>
          </div>
        </div>

        {/* Timeline dots with numbers */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center"
                style={{ width: '25%' }}
              >
                <div
                  className={`relative transition-all duration-1000 ease-out ${
                    isVisible && progress >= (index + 1) * 25
                      ? 'scale-110'
                      : 'scale-100'
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                      isVisible && progress >= (index + 1) * 25
                        ? 'bg-[#0BA14E]/30 scale-150 animate-pulse'
                        : 'bg-transparent'
                    }`}
                  ></div>
                  
                  <div
                    className={`relative w-12 h-12 bg-[#0BA14E] rounded-full border-4 border-[#0D1020] shadow-xl flex items-center justify-center transition-all duration-1000 ${
                      isVisible && progress >= (index + 1) * 25
                        ? 'ring-4 ring-[#0BA14E]/50'
                        : ''
                    }`}
                    style={{
                      boxShadow: isVisible && progress >= (index + 1) * 25
                        ? '0 0 20px rgba(52, 211, 153, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2)'
                        : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <span className="text-white font-black text-base">
                      {step.number}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Timeline Container */}
        <div className="relative pb-8 md:pb-16">
          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden relative pl-12">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-800 rounded-full"></div>
            
            <div
              className="absolute left-6 top-0 w-1 bg-gradient-to-b from-[#0BA14E] via-[#0BA14E] to-[#0BA14E] rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{
                height: `${progress}%`,
                boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
              }}
            ></div>
          </div>

          {/* Steps Cards */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isLastStep = index === 3;
              const isHighlighted = isLastStep && progress >= 100;
              
              return (
                <div
                  key={step.number}
                  className={`relative transition-all duration-1500 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 250 + 400}ms`,
                  }}
                >
                  {/* Mobile Timeline dot */}
                  <div className="md:hidden absolute -left-[3.5rem] top-0">
                    <div
                      className={`relative transition-all duration-1000 ease-out ${
                        isVisible && progress >= (index + 1) * 25
                          ? 'scale-110'
                          : 'scale-100'
                      }`}
                      style={{
                        transitionDelay: `${index * 200}ms`,
                      }}
                    >
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                          isVisible && progress >= (index + 1) * 25
                            ? 'bg-[#0BA14E]/30 scale-150 animate-pulse'
                            : 'bg-transparent'
                        }`}
                      ></div>
                      
                      <div
                        className={`relative w-12 h-12 bg-[#0BA14E] rounded-full border-4 border-[#0D1020] shadow-xl flex items-center justify-center transition-all duration-1000 ${
                          isVisible && progress >= (index + 1) * 25
                            ? 'ring-4 ring-[#0BA14E]/50'
                            : ''
                        }`}
                        style={{
                          boxShadow: isVisible && progress >= (index + 1) * 25
                            ? '0 0 20px rgba(52, 211, 153, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2)'
                            : '0 4px 15px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <span className="text-white font-black text-lg">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card - Dark Theme */}
                  <div className={`group relative bg-[#0D1020] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-1000 border-2 overflow-hidden p-8 md:p-10 h-full ${
                    isHighlighted
                      ? 'border-[#0BA14E] shadow-2xl shadow-[#0BA14E]/30 scale-105'
                      : 'border-[#0BA14E]/20 hover:border-[#0BA14E]/40 hover:-translate-y-3'
                  }`}
                  style={{
                    boxShadow: isHighlighted 
                      ? '0 20px 60px rgba(52, 211, 153, 0.2), 0 10px 30px rgba(0, 0, 0, 0.4)'
                      : '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}>
                    {isHighlighted && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0BA14E]/10 to-transparent rounded-3xl animate-pulse"></div>
                    )}
                    
                    {isHighlighted && (
                      <div className="absolute bottom-4 right-4 z-20">
                        <div className="bg-gradient-to-br from-[#0BA14E] to-[#10b981] rounded-full p-3 shadow-xl border-2 border-[#0D1020]/50 animate-bounce">
                          <ArrowDown className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="absolute inset-0 bg-[#0BA14E]/30 rounded-full blur-md -z-10 animate-pulse"></div>
                      </div>
                    )}
                    
                    {/* Icon and Day */}
                    <div className="hidden md:flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0BA14E]/10 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-[#0BA14E]/20">
                        <IconComponent className="w-6 h-6 text-[#0BA14E]" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-400 uppercase tracking-wide">
                        {step.day}
                      </span>
                    </div>

                    {/* Mobile: Icon and Day */}
                    <div className="md:hidden flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0BA14E]/10 shadow-md border border-[#0BA14E]/20">
                        <IconComponent className="w-6 h-6 text-[#0BA14E]" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                        {step.day}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white leading-tight group-hover:text-[#0BA14E] transition-colors duration-300 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed relative z-10">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0BA14E]/30 via-[#0BA14E] to-[#0BA14E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Section - App Icons with Video Background */}
        <div
          className={`mt-20 md:mt-32 transition-all duration-1000 ease-out relative overflow-hidden rounded-3xl ${
            showNextSection
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-16 scale-95 pointer-events-none'
          }`}
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <div
              className={`absolute inset-0 bg-[#020617] transition-opacity duration-500 ${
                videoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                filter: 'blur(20px)',
              }}
            />

            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src="/videos/next.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[#020617]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/70 to-[#020617]/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
              showNextSection
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: showNextSection ? '200ms' : '0ms',
            }}>
              <Smartphone className={`w-16 h-16 mx-auto mb-6 text-[#0BA14E] transition-all duration-1000 ease-out ${
                showNextSection
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 rotate-12'
              }`}
              style={{
                transitionDelay: showNextSection ? '300ms' : '0ms',
              }}
              strokeWidth={2} />
              <h3 
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white transition-all duration-1000 ease-out ${
                  showNextSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: showNextSection ? '400ms' : '0ms',
                }}
              >
                Zaczynasz zarabiać w aplikacjach!
              </h3>
              <p 
                className={`text-base md:text-lg text-gray-300 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
                  showNextSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: showNextSection ? '500ms' : '0ms',
                }}
              >
                Po zakończeniu formalności możesz od razu przyjmować zlecenia w najpopularniejszych aplikacjach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Uber */}
              <div className={`bg-[#0D1020] backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 border border-[#0BA14E]/20 hover:border-[#0BA14E]/40 flex flex-col items-center justify-center ${
                showNextSection
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: showNextSection ? '600ms' : '0ms',
              }}>
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4">
                  <Image
                    src="/images/uber.png"
                    alt="Uber"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="font-semibold text-base text-white">Uber</span>
              </div>

              {/* Bolt */}
              <div className={`bg-[#0D1020] backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 border border-[#0BA14E]/20 hover:border-[#0BA14E]/40 flex flex-col items-center justify-center ${
                showNextSection
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: showNextSection ? '700ms' : '0ms',
              }}>
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4">
                  <Image
                    src="/images/bolt.webp"
                    alt="Bolt"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="font-semibold text-base text-white">Bolt</span>
              </div>

              {/* FreeNow */}
              <div className={`bg-[#0D1020] backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 border border-[#0BA14E]/20 hover:border-[#0BA14E]/40 flex flex-col items-center justify-center ${
                showNextSection
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: showNextSection ? '800ms' : '0ms',
              }}>
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4">
                  <Image
                    src="/images/freenow.png"
                    alt="FreeNow"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="font-semibold text-base text-white">FreeNow</span>
              </div>
            </div>

            <p 
              className={`text-center text-sm md:text-base text-gray-400 mt-8 italic transition-all duration-1000 ease-out ${
                showNextSection
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: showNextSection ? '900ms' : '0ms',
              }}
            >
              I wiele innych – jesteśmy elastycznym partnerem flotowym.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div
          className={`mt-12 text-center transition-all duration-1000 ease-out delay-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm md:text-base text-gray-400 italic max-w-3xl mx-auto">
            Cały proces może zająć nawet tylko 3 dni — wszystko zależy głównie od
            dostępnych terminów badań.
          </p>
        </div>

        {/* Additional note */}
        <div
          className={`mt-4 text-center transition-all duration-1000 ease-out delay-1200 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto">
            Docelowo będziesz mógł również pracować w aplikacjach delivery
            (jedzenie, zakupy) – przygotowujemy tę opcję.
          </p>
        </div>
      </div>
    </section>
  );
}
