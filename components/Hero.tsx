'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);

    const video = videoRef.current;

    if (video) {
      // Set video playback rate
      video.playbackRate = 0.7;

      // Handle video loaded
      const handleVideoReady = () => {
        setVideoLoaded(true);
        // Ensure video plays
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err);
        });
      };

      // Show video immediately - don't wait for full load
      setVideoLoaded(true);
      
      // Handle metadata loaded
      const handleMetadataLoaded = () => {
        setVideoLoaded(true);
        video.play().catch(() => {});
      };
      
      // Try multiple events to ensure video loads
      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      video.addEventListener('loadedmetadata', handleMetadataLoaded);

      // Ensure video plays on load
      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });
      
      // Fallback: show video after 1 second even if not loaded
      const timeoutId = setTimeout(() => {
        setVideoLoaded(true);
      }, 1000);

      // Subtle parallax effect on scroll
      const handleScroll = () => {
        if (containerRef.current && video) {
          const scrolled = window.scrollY;
          const rate = scrolled * 0.3; // Very subtle parallax
          video.style.transform = `translateY(${rate}px)`;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        clearTimeout(timeoutId);
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('canplaythrough', handleVideoReady);
        video.removeEventListener('loadedmetadata', handleMetadataLoaded);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="kierowca"
      className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 md:pt-24 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#020617]"
    >
      {/* Video Background with Lazy Loading */}
      <div className="absolute inset-0 z-0">
        {/* Blurred placeholder - shows first, disappears quickly */}
        <div
          className={`absolute inset-0 bg-[#020617] transition-opacity duration-300 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: 'url(/videos/hero-banner-poster.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />

        {/* Video - WCAG 2.2: Decorative video with proper attributes */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectPosition: 'center center',
          }}
        >
          <source src="/videos/hero-banner.mp4" type="video/mp4" />
          <source src="/videos/hero-banner.webm" type="video/webm" />
        </video>

        {/* Dark overlay for dark theme - stronger */}
        <div className="absolute inset-0 bg-[#020617]/80"></div>

        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/70 to-[#020617]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div
            className={`space-y-8 md:space-y-10 transition-all duration-1000 ease-out relative ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Headline with fade + slide up */}
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white transition-all duration-1000 ease-out delay-100 relative z-10 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-6'
              }`}
            >
              Zacznij zarabiać jako kierowca Uber, Bolt i FreeNow nawet w 3 dni
            </h1>

            {/* Subtext with stagger */}
            <p
              className={`text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed transition-all duration-1000 ease-out delay-200 relative z-10 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Zgłaszasz się do nas, a my organizujemy wszystko: auto, formalności, licencję taxi i aktywację w aplikacjach. Ty skupiasz się wyłącznie na jeździe i zarabianiu.
            </p>

            {/* Bullet points with stagger */}
            <ul className="space-y-4 md:space-y-5">
              {[
                'Bez zakładania działalności gospodarczej - rozliczamy Cię na podstawie umowy',
                'Organizujemy wszystkie badania i licencję taxi - Ty tylko przychodzisz na wizytę.',
                'Jeździsz w aplikacjach Uber, Bolt, FreeNow - a jeśli chcesz, rozszerzymy to o dodatkowe platformy.',
                'Jasne zasady rozliczeń i pełne wsparcie koordynatora.',
              ].map((text, index) => (
                <li
                  key={index}
                  className={`flex items-start transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${300 + index * 80}ms`,
                  }}
                >
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 text-[#34D399] mr-4 flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white text-sm md:text-base font-medium relative z-10">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Buttons with scale-in animation */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-6 transition-all duration-800 ease-out delay-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              <button
                onClick={() => scrollToSection('aplikuj')}
                className="group bg-[#34D399] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#10b981] hover:shadow-2xl hover:shadow-[#34D399]/30 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all duration-300 text-center transform hover:scale-105 active:scale-100"
                style={{
                  boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
                }}
              >
                Zgłoś się teraz
              </button>
              <button
                onClick={() => scrollToSection('jak-to-dziala')}
                className="group border-2 border-[#34D399] text-white px-6 py-3 rounded-xl font-semibold text-base bg-transparent hover:bg-[#34D399]/10 focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-100"
              >
                Zobacz jak to działa
              </button>
            </div>
          </div>

          {/* Right side - Premium Earnings card */}
          <div
            className={`hidden md:block transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div
              className="group relative bg-[#0D1020] rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-[#34D399]/20 hover:border-[#34D399]/40"
              style={{
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-6 h-6 text-[#34D399]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-base lg:text-lg font-bold text-white uppercase tracking-wide">
                    Tygodniowy przychód
                  </h3>
                </div>
              
                <div className="mb-2">
                  <div
                    className="text-4xl lg:text-5xl xl:text-6xl font-black text-[#34D399] mb-2 leading-none"
                    style={{
                      letterSpacing: '-0.02em',
                    }}
                  >
                    2200–2800
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white/90 mb-4">
                    zł brutto
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#34D399]/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#34D399]/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
