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
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    number: 2,
    day: 'Dzień 1–2',
    title: 'Badania i dokumenty',
    description:
      'To my umawiamy Cię na badania. Ty jedziesz, robisz je i wychodzisz. Informujemy, jakie dokumenty będą potrzebne. Koszt badań rozbijamy w rozliczeniach, więc praktycznie ich nie odczuwasz.',
    icon: Stethoscope,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    number: 3,
    day: 'Dzień 2–3',
    title: 'Załatwiamy formalności',
    description:
      'Przygotowujemy umowę, pomagamy z licencją taxi (jeśli jest wymagana) i aktywujemy Cię w aplikacjach.',
    icon: FileCheck,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    number: 4,
    day: 'Od dnia 3',
    title: 'Zaczynasz jeździć i zarabiać',
    description:
      'Po formalnościach możesz przyjmować zlecenia i pracować w aplikacjach — a my wspieramy Cię dalej.',
    icon: Car,
    gradient: 'from-accent to-[#0a8a3f]',
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

    // Calculate progress based on scroll position - starts from Hero section, ends at cards container
    const calculateProgress = () => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Find Hero section (starts the animation)
      const heroSection = document.getElementById('kierowca');
      const cardsContainer = cardsContainerRef.current;
      
      if (!heroSection || !cardsContainer) return;
      
      // Get positions relative to document
      const heroRect = heroSection.getBoundingClientRect();
      const cardsRect = cardsContainer.getBoundingClientRect();
      
      const heroTop = heroRect.top + scrollY;
      const cardsTop = cardsRect.top + scrollY;
      const cardsHeight = cardsRect.height;
      const cardsBottom = cardsTop + cardsHeight;
      
      // Animation starts when HowItWorks section enters viewport (not Hero, to avoid too much movement in Hero)
      // Animation ends when cards container bottom reaches 50% of viewport
      // Made faster: start earlier and end earlier
      const startTrigger = windowHeight * 0.2; // Start when section is 20% down viewport (was 30%)
      const endTrigger = windowHeight * 0.7; // End when cards bottom is 70% down viewport (was 50%)
      
      // Use HowItWorks section top as start point instead of Hero
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top + scrollY;
      
      // Calculate scroll positions where animation starts and ends
      // Start when HowItWorks section enters viewport, not Hero
      const scrollStart = sectionTop - startTrigger;
      // Make animation end earlier - when cards are still visible but not at bottom
      const scrollEnd = cardsTop + (cardsHeight * 0.6) - endTrigger; // End when cards are 60% scrolled through
      const scrollRange = scrollEnd - scrollStart;
      
      // Calculate progress (0-100%)
      let progressValue = 0;
      
      if (scrollY <= scrollStart) {
        // Before animation starts
        progressValue = 0;
      } else if (scrollY >= scrollEnd) {
        // After animation ends
        progressValue = 100;
      } else if (scrollRange > 0) {
        // Within scroll range - calculate progress with speed multiplier
        // Multiply by 1.5 to make car reach end faster
        progressValue = ((scrollY - scrollStart) / scrollRange) * 100 * 1.5;
        progressValue = Math.max(0, Math.min(100, progressValue));
      } else {
        // Fallback: if range is invalid, check if scrolled past cards
        progressValue = scrollY > cardsBottom ? 100 : 0;
      }

      setProgress(progressValue);

      // Show next section when progress reaches 100% - immediate appearance
      if (progressValue >= 100 && !showNextSection) {
        setShowNextSection(true);
      } else if (progressValue < 100) {
        setShowNextSection(false);
      }
    };

    // Use requestAnimationFrame for smooth animation
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

    // Initial calculation
    calculateProgress();

    // Listen to scroll events with requestAnimationFrame for smooth animation
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    };
  }, [showNextSection]);

  // Handle video loading for next section
  useEffect(() => {
    if (showNextSection && videoRef.current) {
      const video = videoRef.current;
      video.playbackRate = 0.7; // Slow down video

      const handleVideoReady = () => {
        setVideoLoaded(true);
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err);
        });
      };

      // Show video immediately
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

      // Fallback: show video after 1 second
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
  }, [showNextSection]);

  return (
    <section
      ref={sectionRef}
      id="jak-to-dziala"
      className="pt-16 md:pt-20 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20">
          Jak wygląda współpraca krok po kroku?
        </h2>
      </div>

      {/* Full-width Timeline - Above cards */}
      <div className="hidden md:block relative mb-20 -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Background line - full width */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>
        
        {/* Animated progress line - full width */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent via-accent to-accent transition-all duration-1000 ease-out shadow-lg"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(11, 161, 76, 0.5)',
          }}
        ></div>

        {/* Animated car moving along timeline - slower */}
        <div
          className="absolute top-0 transition-all duration-2000 ease-out z-20"
          style={{
            left: `calc(${progress}% - 24px)`,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="relative">
            {/* Car with gradient background */}
            <div className="bg-gradient-to-br from-accent to-[#0a8a3f] rounded-xl p-3 shadow-2xl border-4 border-white">
              <Car className="w-8 h-8 text-white" strokeWidth={2.5} fill="currentColor" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent/30 rounded-xl blur-lg -z-10 animate-pulse"></div>
            {/* Small trail effect */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-accent/30 rounded-full blur-md"></div>
          </div>
        </div>

        {/* Timeline dots with numbers - centered in container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center"
                style={{ width: '25%' }}
              >
                {/* Animated dot */}
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
                  {/* Outer glow */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                      isVisible && progress >= (index + 1) * 25
                        ? 'bg-accent/30 scale-150 animate-pulse'
                        : 'bg-transparent'
                    }`}
                  ></div>
                  
                  {/* Main dot */}
                  <div
                    className={`relative w-12 h-12 bg-accent rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all duration-1000 ${
                      isVisible && progress >= (index + 1) * 25
                        ? 'ring-4 ring-accent/50'
                        : ''
                    }`}
                    style={{
                      boxShadow: isVisible && progress >= (index + 1) * 25
                        ? '0 0 20px rgba(11, 161, 76, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2)'
                        : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <span className="text-white font-black text-lg">
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
            {/* Background line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>
            
            {/* Animated progress line */}
            <div
              className="absolute left-6 top-0 w-1 bg-gradient-to-b from-accent via-accent to-accent rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{
                height: `${progress}%`,
                boxShadow: '0 0 10px rgba(11, 161, 76, 0.5)',
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
                      {/* Outer glow */}
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                          isVisible && progress >= (index + 1) * 25
                            ? 'bg-accent/30 scale-150 animate-pulse'
                            : 'bg-transparent'
                        }`}
                      ></div>
                      
                      {/* Main dot */}
                      <div
                        className={`relative w-12 h-12 bg-accent rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all duration-1000 ${
                          isVisible && progress >= (index + 1) * 25
                            ? 'ring-4 ring-accent/50'
                            : ''
                        }`}
                        style={{
                          boxShadow: isVisible && progress >= (index + 1) * 25
                            ? '0 0 20px rgba(11, 161, 76, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2)'
                            : '0 4px 15px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <span className="text-white font-black text-lg">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-1000 border-2 overflow-hidden p-8 md:p-10 h-full ${
                    isHighlighted
                      ? 'border-accent shadow-2xl shadow-accent/30 scale-105'
                      : 'border-gray-100 hover:border-accent/30 hover:-translate-y-3'
                  }`}>
                    {/* Highlight effect for last card when progress is 100% */}
                    {isHighlighted && (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl animate-pulse"></div>
                    )}
                    
                    {/* Arrow indicator for last card - inside the card */}
                    {isHighlighted && (
                      <div className="absolute bottom-4 right-4 z-20">
                        <div className="bg-gradient-to-br from-accent to-[#0a8a3f] rounded-full p-3 shadow-xl border-2 border-white/50 animate-bounce">
                          <ArrowDown className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-accent/30 rounded-full blur-md -z-10 animate-pulse"></div>
                      </div>
                    )}
                    
                    {/* Decorative gradient background */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl`}></div>
                    
                    {/* Icon and Day - Desktop */}
                    <div className="hidden md:flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <IconComponent className="w-6 h-6 text-black" strokeWidth={2.5} />
                      </div>
                      <span className="text-base md:text-lg font-semibold text-gray-600 uppercase tracking-wide">
                        {step.day}
                      </span>
                    </div>

                    {/* Mobile: Icon and Day */}
                    <div className="md:hidden flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 shadow-md">
                        <IconComponent className="w-6 h-6 text-black" strokeWidth={2.5} />
                      </div>
                      <span className="text-base font-semibold text-gray-600 uppercase tracking-wide">
                        {step.day}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight group-hover:text-accent transition-colors duration-300 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed relative z-10">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
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
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            {/* Blurred placeholder */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-opacity duration-500 ${
                videoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                filter: 'blur(20px)',
              }}
            />

            {/* Video */}
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
              style={{
                objectPosition: 'center center',
              }}
            >
              <source src="/videos/next.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
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
              <Smartphone className={`w-16 h-16 mx-auto mb-6 text-white drop-shadow-lg transition-all duration-1000 ease-out ${
                showNextSection
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 rotate-12'
              }`}
              style={{
                transitionDelay: showNextSection ? '300ms' : '0ms',
              }}
              strokeWidth={2} />
              <h3 
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white transition-all duration-1000 ease-out ${
                  showNextSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)',
                  transitionDelay: showNextSection ? '400ms' : '0ms',
                }}
              >
                Zaczynasz zarabiać w aplikacjach!
              </h3>
              <p 
                className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
                  showNextSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.5)',
                  transitionDelay: showNextSection ? '500ms' : '0ms',
                }}
              >
                Po zakończeniu formalności możesz od razu przyjmować zlecenia w najpopularniejszych aplikacjach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Uber */}
              <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 border border-white/50 flex flex-col items-center justify-center ${
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
                <span className="font-semibold text-lg text-gray-900">Uber</span>
              </div>

              {/* Bolt */}
              <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 border border-white/50 flex flex-col items-center justify-center ${
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
                <span className="font-semibold text-lg text-gray-900">Bolt</span>
              </div>

              {/* FreeNow */}
              <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 border border-white/50 flex flex-col items-center justify-center ${
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
                <span className="font-semibold text-lg text-gray-900">FreeNow</span>
              </div>
            </div>

            <p 
              className={`text-center text-sm md:text-base text-white/80 mt-8 italic transition-all duration-1000 ease-out ${
                showNextSection
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
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
          <p className="text-base md:text-lg text-gray-600 italic max-w-3xl mx-auto">
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
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
            Docelowo będziesz mógł również pracować w aplikacjach delivery
            (jedzenie, zakupy) – przygotowujemy tę opcję.
          </p>
        </div>
      </div>
    </section>
  );
}
