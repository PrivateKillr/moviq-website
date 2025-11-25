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

  return (
    <section
      ref={sectionRef}
      id="wymagania"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#020617]"
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
          <source src="/videos/Umowa.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#020617]/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/80 to-[#020617]/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Jakie są wymagania?
        </h2>

        <p 
          className={`text-sm md:text-base text-gray-400 text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '200ms',
          }}
        >
          Nie musisz mieć wszystkiego od razu – pomagamy zorganizować dokumenty i badania. Jeśli nie wiesz, od czego zacząć, po prostu zgłoś się.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Basic Requirements */}
          <div 
            className={`bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#34D399]/20 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '400ms',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#34D399]/10 flex items-center justify-center border-2 border-[#34D399]/20">
                <Car className="w-7 h-7 text-[#34D399]" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#34D399]/10 flex items-center justify-center mt-0.5 border border-[#34D399]/20">
                      <IconComponent className="w-5 h-5 text-[#34D399]" strokeWidth={2.5} />
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
            className={`bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#34D399]/20 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '500ms',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#34D399]/10 flex items-center justify-center border-2 border-[#34D399]/20">
                <FileCheck className="w-7 h-7 text-[#34D399]" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#34D399]/10 flex items-center justify-center mt-0.5 border border-[#34D399]/20">
                      <IconComponent className="w-5 h-5 text-[#34D399]" strokeWidth={2.5} />
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
            transitionDelay: '1200ms',
          }}
        >
          Jeśli nie wiesz, od czego zacząć – po prostu zgłoś się. Powiemy Ci
          dokładnie, czego potrzebujesz w Twoim mieście.
        </p>
      </div>
    </section>
  );
}
