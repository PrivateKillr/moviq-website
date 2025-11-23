'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Users, Shield, DollarSign } from 'lucide-react';

export default function RejestracjaPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    hasCar: '',
    workType: '',
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


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/rejestracja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: 'Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.',
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          hasCar: '',
          workType: '',
          message: '',
          rodo: false,
        });
        // Clear message after 5 seconds
        setTimeout(() => setSubmitMessage(null), 5000);
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.error || 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <div 
          ref={sectionRef}
          className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        >
      {/* Hero Section + Main Content - Combined */}
      <section className="relative py-6 md:py-8 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Hero Header */}
        <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
          <div className={`space-y-2 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Rejestracja kierowcy
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Zgłaszasz się do nas, a my załatwiamy za Ciebie formalności, umowy i rozliczenia. 
              Po rejestracji możesz pracować w aplikacjach takich jak Uber, Bolt, FreeNow i delivery.
            </p>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Formularz */}
            <div className={`transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
            style={{
              transitionDelay: '400ms',
            }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border-2 border-accent/10">
                      <Users className="w-6 h-6 text-accent" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Formularz zgłoszeniowy
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name and Phone in 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-gray-900"
                          placeholder="Jan Kowalski"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-gray-900"
                          placeholder="+48 123 456 789"
                        />
                      </div>
                    </div>

                    {/* Email and City in 2 columns */}
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
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-gray-900"
                          placeholder="jan.kowalski@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Miasto *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-gray-900"
                          placeholder="Warszawa"
                        />
                      </div>
                    </div>

                    {/* Car and Work Type in 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="hasCar"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Własny samochód? *
                        </label>
                        <select
                          id="hasCar"
                          name="hasCar"
                          required
                          value={formData.hasCar}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-gray-900"
                        >
                          <option value="">Wybierz</option>
                          <option value="yes">Tak</option>
                          <option value="no">Nie</option>
                          <option value="soon">Planuję</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="workType"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Typ pracy *
                        </label>
                        <select
                          id="workType"
                          name="workType"
                          required
                          value={formData.workType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-gray-900"
                        >
                          <option value="">Wybierz</option>
                          <option value="taxi">Taxi</option>
                          <option value="delivery">Delivery</option>
                          <option value="both">Oba</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Dodatkowe informacje (opcjonalnie)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none text-gray-900"
                        placeholder="Masz pytania? Napisz tutaj..."
                      />
                    </div>

                    {/* RODO */}
                    <div className="flex items-start bg-accent/5 rounded-xl p-4 border-2 border-accent/20">
                      <input
                        type="checkbox"
                        id="rodo"
                        name="rodo"
                        required
                        checked={formData.rodo}
                        onChange={handleChange}
                        className="mt-1 mr-3 w-5 h-5 text-accent border-2 border-gray-300 rounded focus:ring-accent focus:ring-2"
                      />
                      <label htmlFor="rodo" className="text-sm text-gray-700 leading-relaxed">
                        Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie oferty
                        współpracy jako kierowca. *
                      </label>
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                      <div
                        className={`p-4 rounded-xl ${
                          submitMessage.type === 'success'
                            ? 'bg-green-50 border-2 border-green-200 text-green-800'
                            : 'bg-red-50 border-2 border-red-200 text-red-800'
                        }`}
                      >
                        <p className="font-medium">{submitMessage.text}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        style={{
                          boxShadow: '0 4px 20px rgba(11, 161, 76, 0.3)',
                        }}
                      >
                        {isSubmitting ? (
                          <>
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
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            Wyślij zgłoszenie
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Column - Image with integrated content */}
            <div className={`relative transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
            style={{
              transitionDelay: '600ms',
            }}>
              {/* Image with overlay content */}
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: '800ms',
              }}>
                <div className="relative w-full h-full min-h-[600px] md:min-h-[700px]">
                  <Image
                    src="/images/people.png"
                    alt="Zespół moviQ"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  {/* Strong gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    <div className={`space-y-6 transition-all duration-1000 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: '1000ms',
                    }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border-2 border-accent/30">
                          <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <h3 
                          className="text-3xl md:text-4xl font-bold text-white"
                          style={{
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8)',
                          }}
                        >
                          Mały zespół, duża rzetelność
                        </h3>
                      </div>
                      <p 
                        className="text-lg md:text-xl text-white leading-relaxed max-w-md"
                        style={{
                          textShadow: '0 3px 15px rgba(0, 0, 0, 0.8), 0 1px 5px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        Jesteśmy małym, ale dobrym zespołem. Rzetelni, z uczciwą atmosferą. 
                        Każdy kierowca jest dla nas ważny – nie jesteś tylko numerem.
                      </p>
                      
                      {/* Benefits with icons */}
                      <div className="space-y-3 pt-4">
                        {[
                          { icon: Shield, text: 'Bez zakładania działalności gospodarczej' },
                          { icon: CheckCircle2, text: 'Wsparcie w formalnościach i dokumentach' },
                          { icon: DollarSign, text: 'Regularne wypłaty co tydzień' },
                        ].map((benefit, index) => {
                          const IconComponent = benefit.icon;
                          return (
                            <div 
                              key={index}
                              className="flex items-start gap-3 transition-all duration-700 ease-out"
                              style={{
                                transitionDelay: `${1200 + index * 100}ms`,
                              }}
                            >
                              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                                <IconComponent className="w-5 h-5 text-accent" strokeWidth={2.5} />
                              </div>
                              <span 
                                className="text-white text-base md:text-lg"
                                style={{
                                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 1px 5px rgba(0, 0, 0, 0.7)',
                                }}
                              >
                                {benefit.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* App Icons - Enhanced */}
                    <div className={`mt-8 pt-8 border-t border-white/30 transition-all duration-1000 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: '1500ms',
                    }}>
                      <p 
                        className="text-sm font-semibold text-white mb-5 uppercase tracking-wide"
                        style={{
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        Pracuj w najpopularniejszych aplikacjach
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'Uber', src: '/images/uber.png', delay: '1600ms' },
                          { name: 'Bolt', src: '/images/bolt.webp', delay: '1700ms' },
                          { name: 'FreeNow', src: '/images/freenow.png', delay: '1800ms' },
                        ].map((app, index) => (
                          <div 
                            key={app.name}
                            className={`bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/30 flex flex-col items-center justify-center group ${
                              isVisible
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-95'
                            }`}
                            style={{
                              transitionDelay: app.delay,
                            }}
                          >
                            <div className="relative w-20 h-20 mb-3 group-hover:scale-110 transition-transform duration-300">
                              <Image
                                src={app.src}
                                alt={app.name}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <span className="font-semibold text-sm text-gray-900">{app.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
