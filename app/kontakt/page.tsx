'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      content: '+48 123 456 789',
      link: 'tel:+48123456789',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'kontakt@moviq.pl',
      link: 'mailto:kontakt@moviq.pl',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Adres',
      content: 'ul. Bydgoska 15, 86-031 Osielsko',
      link: 'https://maps.google.com/?q=Osielsko+Bydgoska+15',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: Clock,
      title: 'Godziny pracy',
      content: 'Pon–Pt, 9:00–17:00',
      link: null,
      gradient: 'from-[#0BA14C] to-[#0a8a3f]',
    },
  ];

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center pt-20 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0BA14C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center text-white">
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0BA14C] to-[#0a8a3f] shadow-xl flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{
                textShadow: '0 6px 40px rgba(0, 0, 0, 1), 0 3px 15px rgba(0, 0, 0, 0.9)',
              }}
            >
              Skontaktuj się z nami
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto"
              style={{
                textShadow: '0 4px 25px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              Masz pytania o współpracę, formalności lub zarobki? Napisz lub zadzwoń – odpowiemy i pomożemy podjąć decyzję.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Dane kontaktowe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const content = info.link ? (
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:text-[#0BA14C] transition-colors duration-300"
                >
                  {info.content}
                </a>
              ) : (
                <span>{info.content}</span>
              );

              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-[#0BA14C]/30 hover:-translate-y-3 overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Decorative gradient background */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${info.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl`}
                  ></div>

                  {/* Top accent glow */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0BA14C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>

                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex items-center justify-center mb-6`}
                    >
                      <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#0BA14C] transition-colors duration-300">
                      {info.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                      {content}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0BA14C] to-[#0BA14C] opacity-100 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] border-t-2 border-gray-200">
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
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-gray-200 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0BA14C] to-[#0a8a3f] flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Napisz do nas
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin. Odpowiemy na wszystkie Twoje pytania dotyczące współpracy jako kierowca.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0BA14C] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-gray-700 leading-relaxed">
                      Odpowiadamy na wszystkie zapytania
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0BA14C] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-gray-700 leading-relaxed">
                      Pomagamy w całym procesie rejestracji
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0BA14C] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-gray-700 leading-relaxed">
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
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
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
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0BA14C] focus:border-[#0BA14C] outline-none transition-all text-gray-900"
                      placeholder="Jan Kowalski"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900 mb-2"
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
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0BA14C] focus:border-[#0BA14C] outline-none transition-all text-gray-900"
                        placeholder="jan.kowalski@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Telefon (opcjonalnie)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0BA14C] focus:border-[#0BA14C] outline-none transition-all text-gray-900"
                        placeholder="+48 123 456 789"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Temat *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0BA14C] focus:border-[#0BA14C] outline-none transition-all text-gray-900"
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
                      className="block text-sm font-semibold text-gray-900 mb-2"
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
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0BA14C] focus:border-[#0BA14C] outline-none transition-all resize-none text-gray-900"
                      placeholder="Napisz swoją wiadomość..."
                    />
                  </div>

                  <div className="flex items-start bg-[#0BA14C]/5 rounded-xl p-4 border-2 border-[#0BA14C]/20">
                    <input
                      type="checkbox"
                      id="rodo"
                      name="rodo"
                      required
                      checked={formData.rodo}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-5 h-5 text-[#0BA14C] border-2 border-gray-300 rounded focus:ring-[#0BA14C] focus:ring-2"
                    />
                    <label htmlFor="rodo" className="text-sm text-gray-700 leading-relaxed">
                      Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie
                      mojego zapytania. *
                    </label>
                  </div>

                  {/* Submit Message */}
                  {submitMessage && (
                    <div
                      className={`p-4 rounded-xl ${
                        submitMessage.type === 'success'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      <p className="font-medium">{submitMessage.text}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`w-full bg-[#0BA14C] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-2xl hover:shadow-[#0BA14C]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      style={{
                        boxShadow: '0 4px 20px rgba(11, 161, 76, 0.3)',
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
