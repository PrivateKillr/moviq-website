'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  Car, 
  Smartphone, 
  FileCheck, 
  Stethoscope,
  Shield,
  FileText
} from 'lucide-react';

const basicRequirements = [
  {
    icon: Car,
    text: 'Prawo jazdy kategorii B (ważne)',
  },
  {
    icon: Car,
    text: 'Samochód w dobrym stanie technicznym (lub chęć korzystania z auta, które zapewnimy w przyszłości – ta opcja jest w przygotowaniu)',
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

export default function Requirements() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle video loading
  useEffect(() => {
    if (isVisible && videoRef.current) {
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
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="wymagania"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
          <source src="/videos/Umowa.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading with fade-in */}
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-white transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          Jakie są wymagania?
        </h2>

        {/* Intro text with fade-in */}
        <p 
          className={`text-base md:text-lg text-white/90 text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '200ms',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.5)',
          }}
        >
          Nie musisz mieć wszystkiego od razu – pomagamy zorganizować dokumenty i badania. Jeśli nie wiesz, od czego zacząć, po prostu zgłoś się.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Basic Requirements */}
          <div 
            className={`bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white/50 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '400ms',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border-2 border-accent/10">
                <Car className="w-7 h-7 text-accent" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Podstawowe wymagania
              </h3>
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
                      transitionDelay: `${600 + index * 100}ms`,
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-5 h-5 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-base md:text-lg text-gray-900 leading-relaxed font-medium pt-1">
                      {req.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Documents */}
          <div 
            className={`bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white/50 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '500ms',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border-2 border-accent/10">
                <FileCheck className="w-7 h-7 text-accent" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Dokumenty i badania, które pomagamy zorganizować
              </h3>
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
                      transitionDelay: `${700 + index * 100}ms`,
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mt-0.5">
                      <IconComponent className="w-5 h-5 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-base md:text-lg text-gray-900 leading-relaxed font-medium pt-1">
                      {doc.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <p 
          className={`text-center text-base md:text-lg text-white/80 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '1200ms',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          Jeśli nie wiesz, od czego zacząć – po prostu zgłoś się. Powiemy Ci
          dokładnie, czego potrzebujesz w Twoim mieście.
        </p>
      </div>
    </section>
  );
}
