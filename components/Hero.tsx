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
      
      // Try multiple events to ensure video loads
      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      // Show video immediately after metadata loads
      video.addEventListener('loadedmetadata', () => {
        setVideoLoaded(true);
        video.play().catch(() => {});
      });

      // Ensure video plays on load
      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });
      
      // Fallback: show video after 1 second even if not loaded
      setTimeout(() => {
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
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="kierowca"
      className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 md:pt-24 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Video Background with Lazy Loading */}
      <div className="absolute inset-0 z-0">
        {/* Blurred placeholder - shows first, disappears quickly */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-opacity duration-300 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: 'url(/videos/hero-banner-poster.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
          <source src="/videos/hero-banner.mp4" type="video/mp4" />
          <source src="/videos/hero-banner.webm" type="video/webm" />
        </video>

        {/* Dark overlay for text readability - increased to 60% for much better contrast */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Gradient overlay for better text contrast - much stronger */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60"></div>
        
        {/* Additional darkening in center where text is */}
        <div className="absolute inset-0 bg-black/20"></div>
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
            {/* Semi-transparent background behind text for extra readability */}
            <div className="absolute -inset-4 md:-inset-8 bg-black/30 rounded-2xl blur-xl -z-10"></div>
            {/* Headline with fade + slide up */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white transition-all duration-1000 ease-out delay-100 relative z-10 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-6'
              }`}
              style={{
                textShadow: '0 6px 40px rgba(0, 0, 0, 1), 0 3px 15px rgba(0, 0, 0, 0.9), 0 1px 5px rgba(0, 0, 0, 0.8)',
                WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
              }}
            >
              Zacznij zarabiać jako kierowca aplikacji w kilka dni
            </h1>

            {/* Subtext with stagger */}
            <p
              className={`text-lg md:text-xl lg:text-2xl text-white leading-relaxed transition-all duration-1000 ease-out delay-200 relative z-10 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                textShadow: '0 4px 25px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9), 0 1px 5px rgba(0, 0, 0, 0.8)',
                WebkitTextStroke: '0.3px rgba(0, 0, 0, 0.2)',
              }}
            >
              Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy
              i rozliczenia. Ty po prostu jeździsz w aplikacjach takich jak
              Uber, Bolt czy FreeNow i zarabiasz pieniądze.
            </p>

            {/* Bullet points with stagger */}
            <ul className="space-y-4 md:space-y-5">
              {[
                'Bez zakładania własnej działalności gospodarczej',
                'Pomagamy w licencji taxi i badaniach lekarskich',
                'Możliwość pracy w kilku aplikacjach jednocześnie',
                'Jasne zasady rozliczeń i wsparcie na każdym etapie',
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
                    className="w-6 h-6 md:w-7 md:h-7 text-accent mr-4 flex-shrink-0 mt-0.5 drop-shadow-md"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span
                    className="text-white text-base md:text-lg font-medium relative z-10"
                    style={{
                      textShadow: '0 3px 20px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9), 0 1px 5px rgba(0, 0, 0, 0.8)',
                    }}
                  >
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
              <Link
                href="/rejestracja"
                className="group bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 text-center transform hover:scale-105 active:scale-100"
                style={{
                  boxShadow: '0 4px 20px rgba(11, 161, 76, 0.3)',
                }}
              >
                Zgłoś się teraz
              </Link>
              <button
                onClick={() => scrollToSection('#jak-to-dziala')}
                className="group border-2 border-white/90 text-white px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 backdrop-blur-sm hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100"
                style={{
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
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
              className="group relative bg-gradient-to-br from-accent via-[#0BA14C] to-[#0a8a3f] rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
              style={{
                boxShadow:
                  '0 25px 70px rgba(11, 161, 76, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg lg:text-xl font-bold text-white uppercase tracking-wide">
                    Tygodniowy przychód
                  </h3>
                </div>
              
                <div className="mb-2">
                  <div
                    className="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 leading-none"
                    style={{
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 10px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    2200–2800
                  </div>
                  <div
                    className="text-3xl lg:text-4xl font-bold text-white/90 mb-4"
                    style={{
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    zł brutto
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
