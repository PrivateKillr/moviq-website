'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    rodo: false,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

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

    // Video loading
    const video = videoRef.current;
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (video) {
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

      timeoutId = setTimeout(() => {
        setVideoLoaded(true);
      }, 1000);

      // Subtle parallax effect on scroll
      const handleScroll = () => {
        if (containerRef.current && video) {
          const scrolled = window.scrollY;
          const rate = scrolled * 0.3;
          video.style.transform = `translateY(${rate}px)`;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('canplaythrough', handleVideoReady);
        video.removeEventListener('loadedmetadata', handleMetadataLoaded);
        window.removeEventListener('scroll', handleScroll);
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
        observer.disconnect();
      };
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitMessage({
        type: 'success',
        text: 'Dziękujemy za kontakt! Odpowiemy wkrótce.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        rodo: false,
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(null), 5000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  return (
    <div ref={sectionRef} className="bg-[#020617] min-h-screen">
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative min-h-[30vh] md:min-h-[35vh] flex items-center pt-20 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-800"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Blurred placeholder */}
          <div
            className={`absolute inset-0 bg-[#020617] transition-opacity duration-300 ${
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
            <source src="/videos/contactus.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center text-white">
          <div
            className={`space-y-3 md:space-y-4 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white"
              style={{
                textShadow: '0 6px 40px rgba(0, 0, 0, 1), 0 3px 15px rgba(0, 0, 0, 0.9)',
              }}
            >
              Skontaktuj się z nami
            </h1>
            <p
              className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-gray-300"
              style={{
                textShadow: '0 4px 25px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              Masz pytania o współpracę, formalności lub zarobki? Napisz lub zadzwoń – odpowiemy i pomożemy podjąć decyzję.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{
                transitionDelay: '200ms',
              }}
            >
              <div className="bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#0BA14E]/20 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0BA14E]/10 border-2 border-[#0BA14E]/20 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-[#0BA14E]" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Napisz do nas
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8">
                  Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin. Odpowiemy na wszystkie Twoje pytania dotyczące współpracy jako kierowca.
                </p>
                
                {/* Contact Information */}
                <div className="space-y-5 mb-8 pt-6 border-t border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0BA14E]/10 border border-[#0BA14E]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#0BA14E]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-1">Telefon</p>
                      <a
                        href="tel:+48123456789"
                        className="text-sm md:text-base text-white hover:text-[#0BA14E] transition-colors duration-300"
                      >
                        +48 123 456 789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0BA14E]/10 border border-[#0BA14E]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#0BA14E]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-1">E-mail</p>
                      <a
                        href="mailto:kontakt@moviq.pl"
                        className="text-sm md:text-base text-white hover:text-[#0BA14E] transition-colors duration-300"
                      >
                        kontakt@moviq.pl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0BA14E]/10 border border-[#0BA14E]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0BA14E]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-1">Adres</p>
                      <a
                        href="https://maps.google.com/?q=Centralna+2T+Osielsko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-base text-white hover:text-[#0BA14E] transition-colors duration-300"
                      >
                        Centralna 2T 86-031 Osielsko
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0BA14E]/10 border border-[#0BA14E]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#0BA14E]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-1">Godziny pracy</p>
                      <p className="text-sm md:text-base text-white">
                        Pon–Pt, 9:00–17:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 pt-6 border-t border-gray-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0BA14E] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Odpowiadamy na wszystkie zapytania
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0BA14E] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Pomagamy w całym procesie rejestracji
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0BA14E] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Jasne odpowiedzi na wszystkie pytania
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
              style={{
                transitionDelay: '400ms',
              }}
            >
              <div className="bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#0BA14E]/20">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-gray-300 mb-2"
                    >
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                      placeholder="Jan Kowalski"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-300 mb-2"
                      >
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                        placeholder="jan.kowalski@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-gray-300 mb-2"
                      >
                        Telefon (opcjonalnie)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                        placeholder="+48 123 456 789"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-gray-300 mb-2"
                    >
                      Temat *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                    >
                      <option value="">Wybierz temat</option>
                      <option value="rejestracja">Rejestracja jako kierowca</option>
                      <option value="pytania">Pytania ogólne</option>
                      <option value="rozliczenia">Rozliczenia i wypłaty</option>
                      <option value="inne">Inne</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-300 mb-2"
                    >
                      Wiadomość *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all resize-none text-white"
                      placeholder="Napisz swoją wiadomość..."
                    />
                  </div>

                  <div className="flex items-start bg-[#0BA14E]/5 rounded-xl p-3 border border-[#0BA14E]/20">
                    <input
                      type="checkbox"
                      id="rodo"
                      name="rodo"
                      required
                      checked={formData.rodo}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-4 h-4 text-[#0BA14E] border-gray-600 rounded focus:ring-[#0BA14E] focus:ring-2 bg-gray-800"
                    />
                    <label htmlFor="rodo" className="text-xs text-gray-300 leading-relaxed">
                      Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie
                      mojego zapytania. *
                    </label>
                  </div>

                  {/* Submit Message */}
                  {submitMessage && (
                    <div
                      className={`p-3 rounded-xl text-sm ${
                        submitMessage.type === 'success'
                          ? 'bg-green-900/30 text-green-300 border border-green-700'
                          : 'bg-red-900/30 text-red-300 border border-red-700'
                      }`}
                    >
                      <p className="font-medium">{submitMessage.text}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`w-full bg-[#0BA14E] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#10b981] hover:shadow-2xl hover:shadow-[#0BA14E]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      style={{
                        boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <>
                          Wyślij wiadomość
                          <Send className="w-5 h-5" strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
