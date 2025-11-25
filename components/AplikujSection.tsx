'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Users, Shield, DollarSign } from 'lucide-react';

export default function AplikujSection() {
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setFieldErrors({});

    // Basic client-side validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Imię i nazwisko jest wymagane';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Telefon jest wymagany';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Podaj prawidłowy adres e-mail';
    }
    if (!formData.city.trim()) {
      errors.city = 'Miasto pracy jest wymagane';
    }
    if (!formData.hasCar) {
      errors.hasCar = 'Wybierz opcję';
    }
    if (!formData.workType) {
      errors.workType = 'Wybierz typ pracy';
    }
    if (!formData.rodo) {
      errors.rodo = 'Wymagana jest zgoda na przetwarzanie danych';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

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
        setFieldErrors({});
        // Focus on success message for screen readers
        setTimeout(() => {
          const successElement = document.getElementById('form-status');
          if (successElement) {
            successElement.focus();
          }
        }, 100);
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
        text: 'Wystąpił błąd sieci. Sprawdź połączenie i spróbuj ponownie.',
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
    <section
      ref={sectionRef}
      id="aplikuj"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#020617] border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className={`space-y-4 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Aplikuj jako kierowca
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Zgłoś się i zacznij pracować jako kierowca Uber, Bolt i FreeNow. Wypełnij formularz, a my skontaktujemy się z Tobą i przeprowadzimy Cię przez cały proces — od badań, przez licencję, po odbiór auta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Formularz */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8'
          }`}
          style={{
            transitionDelay: '200ms',
          }}>
            <div className="bg-[#0D1020] rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[#0BA14E]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0BA14E]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#0BA14E]/10 flex items-center justify-center border-2 border-[#0BA14E]/20">
                    <Users className="w-6 h-6 text-[#0BA14E]" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Formularz zgłoszeniowy
                  </h3>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-white mb-2"
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
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={fieldErrors.name ? 'true' : 'false'}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.name ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                        placeholder="Jan Kowalski"
                      />
                      {fieldErrors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-white mb-2"
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
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={fieldErrors.phone ? 'true' : 'false'}
                        aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.phone ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                        placeholder="+48 123 456 789"
                      />
                      {fieldErrors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-white mb-2"
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
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={fieldErrors.email ? 'true' : 'false'}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.email ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                        placeholder="jan.kowalski@example.com"
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Miasto pracy *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        aria-required="true"
                        aria-invalid={fieldErrors.city ? 'true' : 'false'}
                        aria-describedby={fieldErrors.city ? 'city-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.city ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                        placeholder="Warszawa"
                      />
                      {fieldErrors.city && (
                        <p id="city-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="hasCar"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Własny samochód? *
                      </label>
                      <select
                        id="hasCar"
                        name="hasCar"
                        required
                        value={formData.hasCar}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={fieldErrors.hasCar ? 'true' : 'false'}
                        aria-describedby={fieldErrors.hasCar ? 'hasCar-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.hasCar ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                      >
                        <option value="">Wybierz</option>
                        <option value="yes">Tak</option>
                        <option value="no">Nie</option>
                        <option value="soon">Planuję</option>
                      </select>
                      {fieldErrors.hasCar && (
                        <p id="hasCar-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.hasCar}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="workType"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Typ pracy *
                      </label>
                      <select
                        id="workType"
                        name="workType"
                        required
                        value={formData.workType}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={fieldErrors.workType ? 'true' : 'false'}
                        aria-describedby={fieldErrors.workType ? 'workType-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.workType ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                      >
                        <option value="">Wybierz</option>
                        <option value="taxi">Taxi</option>
                        <option value="delivery">Delivery</option>
                        <option value="both">Oba</option>
                      </select>
                      {fieldErrors.hasCar && (
                        <p id="hasCar-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.hasCar}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="workType"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Typ pracy *
                      </label>
                      <select
                        id="workType"
                        name="workType"
                        required
                        value={formData.workType}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={fieldErrors.workType ? 'true' : 'false'}
                        aria-describedby={fieldErrors.workType ? 'workType-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#020617] border-2 rounded-xl focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all text-white ${
                          fieldErrors.workType ? 'border-red-500' : 'border-gray-800 focus:border-[#0BA14E]'
                        }`}
                      >
                        <option value="">Wybierz</option>
                        <option value="taxi">Taxi</option>
                        <option value="delivery">Delivery</option>
                        <option value="both">Oba</option>
                      </select>
                      {fieldErrors.workType && (
                        <p id="workType-error" className="mt-1 text-sm text-red-400" role="alert">
                          {fieldErrors.workType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      Dodatkowe informacje (opcjonalnie)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#020617] border-2 border-gray-800 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all resize-none text-white"
                      placeholder="Masz pytania? Napisz tutaj..."
                    />
                  </div>

                  <div className={`flex items-start bg-[#0BA14E]/5 rounded-xl p-4 border-2 ${
                    fieldErrors.rodo ? 'border-red-500/50' : 'border-[#0BA14E]/20'
                  }`}>
                    <input
                      type="checkbox"
                      id="rodo"
                      name="rodo"
                      required
                      checked={formData.rodo}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={fieldErrors.rodo ? 'true' : 'false'}
                      aria-describedby={fieldErrors.rodo ? 'rodo-error' : undefined}
                      className="mt-1 mr-3 w-5 h-5 text-[#0BA14E] border-2 border-gray-700 rounded focus-visible:outline-2 focus-visible:outline-[#0BA14E] focus-visible:outline-offset-2 bg-[#020617]"
                    />
                    <label htmlFor="rodo" className="text-sm text-gray-300 leading-relaxed">
                      Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie oferty
                      współpracy jako kierowca. *
                    </label>
                    {fieldErrors.rodo && (
                      <p id="rodo-error" className="mt-1 text-sm text-red-400" role="alert">
                        {fieldErrors.rodo}
                      </p>
                    )}
                  </div>

                  {/* WCAG 2.2: aria-live region for form status updates */}
                  {submitMessage && (
                    <div
                      id="form-status"
                      className={`p-4 rounded-xl ${
                        submitMessage.type === 'success'
                          ? 'bg-green-900/30 border-2 border-green-500/50 text-green-300'
                          : 'bg-red-900/30 border-2 border-red-500/50 text-red-300'
                      }`}
                      role="alert"
                      aria-live="polite"
                      aria-atomic="true"
                      tabIndex={-1}
                    >
                      <p className="font-medium">{submitMessage.text}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`w-full bg-[#0BA14E] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#089a42] hover:shadow-2xl hover:shadow-[#0BA14E]/30 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      style={{
                        boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
                      }}
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
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
                          <span aria-hidden="true">Wysyłanie...</span>
                        </>
                      ) : (
                        <>
                          Wyślij zgłoszenie
                          <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
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
            transitionDelay: '400ms',
          }}>
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: '600ms',
            }}>
              <div className="relative w-full h-full min-h-[600px] md:min-h-[600px]">
                <Image
                  src="/images/people.png"
                  alt="Zespół moviQ"
                  fill
                  className="object-cover"
                  unoptimized
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
                
                <div className="absolute inset-0 flex flex-col overflow-hidden p-6 pt-10 md:p-8 md:pt-8 lg:p-10 lg:pt-10 justify-start md:justify-end">
                  <div className={`space-y-5 transition-all duration-1000 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: '800ms',
                  }}>
                    <h3 
                      className="text-2xl md:text-3xl font-bold text-white"
                      style={{
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      Mały zespół, duża rzetelność
                    </h3>
                    <p 
                      className="text-base md:text-lg text-white leading-relaxed max-w-md"
                      style={{
                        textShadow: '0 3px 15px rgba(0, 0, 0, 0.8), 0 1px 5px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      Jesteśmy małym, ale dobrym zespołem. Rzetelni, z uczciwą atmosferą. 
                      Każdy kierowca jest dla nas ważny – nie jesteś tylko numerem.
                    </p>
                    
                    <div className="space-y-2.5 pt-3">
                      {[
                        { icon: Shield, text: 'Bez zakładania działalności gospodarczej' },
                        { icon: CheckCircle2, text: 'Wsparcie w formalnościach i dokumentach' },
                        { icon: DollarSign, text: 'Regularne wypłaty co tydzień' },
                          ].map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                              <div key={index} className="flex items-start gap-3">
                                <IconComponent
                                  className="w-6 h-6 text-[#0BA14E] flex-shrink-0 mt-0.5 drop-shadow-lg"
                                  strokeWidth={2.5}
                                  aria-hidden="true"
                                />
                            <span 
                              className="text-white text-sm md:text-base"
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
                  
                  <div className={`mt-6 pt-6 border-t border-white/30 transition-all duration-1000 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: '1000ms',
                  }}>
                    <p 
                      className="text-sm font-semibold text-white mb-4 uppercase tracking-wide"
                      style={{
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      Pracuj w najpopularniejszych aplikacjach
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: 'Uber', src: '/images/uber.png', delay: '1200ms' },
                        { name: 'Bolt', src: '/images/bolt.webp', delay: '1300ms' },
                        { name: 'FreeNow', src: '/images/freenow.png', delay: '1400ms' },
                      ].map((app, index) => (
                        <div 
                          key={app.name}
                          className={`bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/30 flex flex-col items-center justify-center ${
                            isVisible
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-95'
                          }`}
                          style={{
                            transitionDelay: app.delay,
                          }}
                        >
                          <div className="relative w-16 h-16 mb-2">
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
  );
}

