'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, RefreshCw, Clock, ArrowRight, Car, Smartphone, FileCheck, Stethoscope, Shield, FileText, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    number: 1,
    day: 'Dzień 1',
    title: 'Zgłaszasz się do nas',
    description:
      'Zgłaszasz się do nas i od razu ustalamy termin badań oraz weryfikację dokumentów.',
    icon: ClipboardCheck,
  },
  {
    number: 2,
    day: 'Dzień 1–2',
    title: 'Badania i dokumenty',
    description:
      'Umawiamy Cię na badania lekarskie i psychotesty. Ty jedziesz, robisz badania i wychodzisz — resztą zajmujemy się my.',
    icon: Stethoscope,
  },
  {
    number: 3,
    day: 'Dzień 2–3',
    title: 'Załatwiamy formalności',
    description:
      'Organizujemy licencję taxi, przygotowujemy dokumenty i aktywujemy Cię w Uber, Bolt, FreeNow.',
    icon: FileCheck,
  },
  {
    number: 4,
    day: 'Od dnia 3',
    title: 'Zaczynasz jeździć i zarabiać',
    description:
      'Odbierasz auto i zaczynasz pracę w aplikacjach — a my dbamy o rozliczenia i wsparcie.',
    icon: Car,
  },
];

const targetGroups = [
  {
    title: 'Studenci',
    description: 'Idealna opcja na zarobek w czasie studiów. Elastyczny grafik pozwala łączyć pracę z nauką.',
    icon: GraduationCap,
  },
  {
    title: 'Osoby szukające dodatkowego zajęcia',
    description: 'Chcesz dorobić do głównego źródła dochodu? Możesz pracować wieczorami, w weekendy lub w wybrane dni.',
    icon: Briefcase,
  },
  {
    title: 'Osoby zmieniające branżę',
    description: 'Szukasz nowej ścieżki kariery? Praca jako kierowca aplikacji to dobry start, nawet bez doświadczenia.',
    icon: RefreshCw,
  },
  {
    title: 'Osoby, które chcą elastycznej pracy',
    description: 'Osoby, które chcą elastycznej pracy, ale mogą przeznaczyć min. 3 pełne dni tygodniowo na jazdę.',
    icon: Clock,
  },
];

const basicRequirements = [
  {
    icon: Car,
    text: 'Prawo jazdy kategorii B (ważne)',
  },
  {
    icon: Car,
    text: 'Osoby, które chcą pracować naszym samochodem — zapewniamy auto gotowe do jazdy. Możesz też dołączyć ze swoim samochodem.',
  },
  {
    icon: Smartphone,
    text: 'Smartfon z dostępem do internetu',
  },
  {
    icon: Smartphone,
    text: 'Podstawowa znajomość obsługi aplikacji mobilnych',
  },
];

const documents = [
  {
    icon: Stethoscope,
    text: 'Badania lekarskie do pracy jako kierowca',
  },
  {
    icon: Shield,
    text: 'Zaświadczenie o niekaralności (jeśli wymagane)',
  },
  {
    icon: FileCheck,
    text: 'Licencja taxi / wypis z licencji (jeśli wymagane przez miasto)',
  },
  {
    icon: FileText,
    text: 'Umowa współpracy z naszym partnerem flotowym',
  },
];

export default function PracaOdZarazSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
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
        // Zwolnienie animacji - zmniejszamy mnożnik z 1.5 do 1.2
        progressValue = ((scrollY - scrollStart) / scrollRange) * 100 * 1.2;
        progressValue = Math.max(0, Math.min(100, progressValue));
      } else {
        progressValue = scrollY > cardsBottom ? 100 : 0;
      }

      setProgress(progressValue);
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
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      const video = videoRef.current;
      video.playbackRate = 0.7;

      const handleVideoReady = () => {
        setVideoLoaded(true);
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err);
        });
      };

      setVideoLoaded(true);

      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      video.addEventListener('loadedmetadata', () => {
        setVideoLoaded(true);
        video.play().catch(() => {});
      });

      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });

      setTimeout(() => {
        setVideoLoaded(true);
      }, 1000);

      return () => {
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('canplaythrough', handleVideoReady);
        video.removeEventListener('loadedmetadata', handleVideoReady);
      };
    }
  }, [isVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="praca-od-zaraz"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#020617] border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Jak wygląda współpraca krok po kroku? - Przeniesione z HowItWorks */}
        <div id="jak-to-dziala" className="mb-16 md:mb-20 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 md:mb-20 text-white">
            Jak wygląda współpraca krok po kroku?
          </h2>

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

            {/* Animated car moving along timeline - zwolniony jeszcze bardziej */}
            <div
              className="hidden md:block absolute top-0 transition-all duration-3000 ease-out z-20"
              style={{
                left: `calc(${progress}% - 24px)`,
                transform: 'translateY(-50%)',
              }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0BA14E] to-[#089a42] rounded-xl p-3 shadow-2xl border-4 border-[#0D1020]">
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
                const isHighlighted = progress >= (index + 1) * 25; // Podświetlanie dla każdego stepa
                
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
                    {/* Mobile Timeline dot - hidden on mobile */}
                    <div className="hidden absolute -left-[3.5rem] top-0">
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

                    {/* Card - z podświetlaniem dla każdego stepa i wideo dla ostatniego */}
                    <div className={`group relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-1000 border-2 overflow-hidden p-8 md:p-10 h-full ${
                      isHighlighted
                        ? 'border-[#0BA14E] shadow-2xl shadow-[#0BA14E]/30 scale-105'
                        : 'border-[#0BA14E]/20 hover:border-[#0BA14E]/40 hover:-translate-y-3'
                    } ${isLastStep ? '' : 'bg-[#0D1020]'}`}
                    style={{
                      boxShadow: isHighlighted 
                        ? '0 20px 60px rgba(52, 211, 153, 0.2), 0 10px 30px rgba(0, 0, 0, 0.4)'
                        : '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}>
                      {/* Video Background dla ostatniego kafelka */}
                      {isLastStep && (
                        <>
                          <div className="absolute inset-0 z-0">
                            <div
                              className={`absolute inset-0 bg-[#0D1020] transition-opacity duration-500 ${
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
                              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-3xl ${
                                videoLoaded ? 'opacity-100' : 'opacity-0'
                              }`}
                            >
                              <source src="/videos/next.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-[#0D1020]/70 rounded-3xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1020]/60 via-[#0D1020]/70 to-[#0D1020]/80 rounded-3xl"></div>
                          </div>
                        </>
                      )}
                      
                      {!isLastStep && isHighlighted && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0BA14E]/10 to-transparent rounded-3xl animate-pulse"></div>
                      )}
                      
                      {/* Icon and Day */}
                      <div className="hidden md:flex items-center gap-4 mb-6 relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0BA14E]/10 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-[#0BA14E]/20">
                          <IconComponent className="w-6 h-6 text-[#0BA14E]" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm md:text-base font-semibold text-gray-400 uppercase tracking-wide">
                          {step.day}
                        </span>
                      </div>

                      {/* Mobile: Icon and Day */}
                      <div className="md:hidden flex items-center gap-4 mb-6 relative z-10">
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
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed relative z-10 mb-6">
                        {step.description}
                      </p>

                      {/* Ikony przewoźników dla ostatniego kafelka */}
                      {isLastStep && (
                        <div className="relative z-10 mt-6 pt-6 border-t border-gray-700/50">
                          <p className="text-xs font-semibold text-gray-300 mb-4 uppercase tracking-wide text-center">
                            Pracuj w najpopularniejszych aplikacjach
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            {/* Uber */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/30 flex flex-col items-center justify-center">
                              <div className="relative w-12 h-12 mb-2">
                                <Image
                                  src="/images/uber.png"
                                  alt="Uber"
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <span className="font-semibold text-xs text-gray-900">Uber</span>
                            </div>

                            {/* Bolt */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/30 flex flex-col items-center justify-center">
                              <div className="relative w-12 h-12 mb-2">
                                <Image
                                  src="/images/bolt.webp"
                                  alt="Bolt"
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <span className="font-semibold text-xs text-gray-900">Bolt</span>
                            </div>

                            {/* FreeNow */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/30 flex flex-col items-center justify-center">
                              <div className="relative w-12 h-12 mb-2">
                                <Image
                                  src="/images/freenow.png"
                                  alt="FreeNow"
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <span className="font-semibold text-xs text-gray-900">FreeNow</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0BA14E]/30 via-[#0BA14E] to-[#0BA14E]/30 ${isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500 rounded-b-3xl z-10`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dla kogo */}
        <div className="mb-16 md:mb-20">
          <h3
            className={`text-2xl md:text-3xl font-bold text-center mb-12 text-white transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '400ms',
            }}
          >
            Dla kogo jest ta praca?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {targetGroups.map((group, index) => {
              const IconComponent = group.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#0BA14E]/20 hover:border-[#0BA14E]/40 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-[#0BA14E]/10 flex items-center justify-center border-2 border-[#0BA14E]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <IconComponent className="w-8 h-8 text-[#0BA14E]" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-xl md:text-2xl font-bold mb-4 text-white leading-tight group-hover:text-[#0BA14E] transition-colors duration-300">
                        {group.title}
                      </h4>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0BA14E]/30 via-[#0BA14E] to-[#0BA14E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Jakie są wymagania? - Przeniesione z Requirements */}
        <div className="mb-16">
          <h3
            className={`text-2xl md:text-3xl font-bold text-center mb-6 text-white transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '1000ms',
            }}
          >
            Jakie są wymagania?
          </h3>
          <p
            className={`text-sm md:text-base text-gray-400 text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '1100ms',
            }}
          >
            Nie musisz mieć wszystkiego od razu – pomagamy zorganizować dokumenty i badania. Jeśli nie wiesz, od czego zacząć, po prostu zgłoś się.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Basic Requirements */}
            <div 
              className={`bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#0BA14E]/20 transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '1200ms',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#0BA14E]/10 flex items-center justify-center border-2 border-[#0BA14E]/20">
                  <Car className="w-7 h-7 text-[#0BA14E]" strokeWidth={2.5} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white">
                  Podstawowe wymagania
                </h4>
              </div>
              <ul className="space-y-5">
                {basicRequirements.map((req, index) => {
                  const IconComponent = req.icon;
                  return (
                    <li 
                      key={index} 
                      className={`flex items-start gap-4 transition-all duration-700 ease-out ${
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{
                        transitionDelay: `${1400 + index * 100}ms`,
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0BA14E]/10 flex items-center justify-center mt-0.5 border border-[#0BA14E]/20">
                        <IconComponent className="w-5 h-5 text-[#0BA14E]" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm md:text-base text-gray-300 leading-relaxed font-medium pt-1">
                        {req.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Documents */}
            <div 
              className={`bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#0BA14E]/20 transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '1300ms',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#0BA14E]/10 flex items-center justify-center border-2 border-[#0BA14E]/20">
                  <FileCheck className="w-7 h-7 text-[#0BA14E]" strokeWidth={2.5} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white">
                  Dokumenty i badania, które w całości dla Ciebie organizujemy
                </h4>
              </div>
              <ul className="space-y-5">
                {documents.map((doc, index) => {
                  const IconComponent = doc.icon;
                  return (
                    <li 
                      key={index} 
                      className={`flex items-start gap-4 transition-all duration-700 ease-out ${
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{
                        transitionDelay: `${1500 + index * 100}ms`,
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0BA14E]/10 flex items-center justify-center mt-0.5 border border-[#0BA14E]/20">
                        <IconComponent className="w-5 h-5 text-[#0BA14E]" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm md:text-base text-gray-300 leading-relaxed font-medium pt-1">
                        {doc.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <p 
            className={`text-center text-sm md:text-base text-gray-400 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '2000ms',
            }}
          >
            Jeśli nie wiesz, od czego zacząć – po prostu zgłoś się. Powiemy Ci
            dokładnie, czego potrzebujesz w Twoim mieście.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '2200ms',
          }}
        >
          <button
            onClick={() => scrollToSection('aplikuj')}
            className="group bg-[#0BA14E] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#089a42] hover:shadow-2xl hover:shadow-[#0BA14E]/30 transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2 mx-auto"
            style={{
              boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
            }}
          >
            Zgłoś się teraz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
