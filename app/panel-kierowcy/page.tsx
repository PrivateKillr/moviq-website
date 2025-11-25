'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LogIn, Lock, Mail, ArrowRight, Users, UserPlus, CheckCircle2, Shield, DollarSign, FileText, Calendar, CreditCard, BarChart, Settings } from 'lucide-react';

export default function PanelKierowcyPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Simulate login - in production, this would call an API
    setTimeout(() => {
      console.log('Login attempt:', loginData);
      setSubmitMessage({
        type: 'error',
        text: 'Funkcjonalność logowania będzie wkrótce dostępna. Skontaktuj się z nami, jeśli masz pytania.',
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(null), 5000);
    }, 1000);
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/rejestracja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: 'Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.',
        });
        setRegisterData({
          name: '',
          phone: '',
          email: '',
          city: '',
          hasCar: '',
          workType: '',
          message: '',
          rodo: false,
        });
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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setRegisterData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div ref={sectionRef} className="bg-[#020617] min-h-screen pt-20 md:pt-24">
      {/* Form Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
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
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0BA14E]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#0BA14E]/10 flex items-center justify-center border-2 border-[#0BA14E]/20">
                      {isLoginMode ? (
                        <LogIn className="w-6 h-6 text-[#0BA14E]" strokeWidth={2.5} />
                      ) : (
                        <UserPlus className="w-6 h-6 text-[#0BA14E]" strokeWidth={2.5} />
                      )}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      {isLoginMode ? 'Logowanie' : 'Rejestracja'}
                    </h2>
                  </div>

                  {isLoginMode ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-gray-300 mb-2"
                        >
                          E-mail *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" strokeWidth={2} />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                            placeholder="twoj.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-xs font-semibold text-gray-300 mb-2"
                        >
                          Hasło *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500" strokeWidth={2} />
                          </div>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="w-4 h-4 text-[#0BA14E] border-gray-600 rounded focus:ring-[#0BA14E] focus:ring-2 bg-gray-800"
                          />
                          <label htmlFor="remember" className="ml-2 text-xs text-gray-400">
                            Zapamiętaj mnie
                          </label>
                        </div>
                        <a
                          href="#"
                          className="text-xs text-[#0BA14E] hover:text-[#10b981] transition-colors duration-200"
                        >
                          Zapomniałeś hasła?
                        </a>
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

                      <div className="pt-2 space-y-3">
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
                              Zaloguj się
                              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsLoginMode(false)}
                          className="w-full border-2 border-[#0BA14E] text-[#0BA14E] px-6 py-3 rounded-xl font-semibold text-base bg-transparent hover:bg-[#0BA14E]/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-100"
                        >
                          Zarejestruj się
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                            placeholder="Jan Kowalski"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-gray-300 mb-2"
                          >
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={registerData.phone}
                            onChange={handleRegisterChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                            placeholder="+48 123 456 789"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="reg-email"
                            className="block text-xs font-semibold text-gray-300 mb-2"
                          >
                            E-mail *
                          </label>
                          <input
                            type="email"
                            id="reg-email"
                            name="email"
                            required
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                            placeholder="jan.kowalski@example.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-xs font-semibold text-gray-300 mb-2"
                          >
                            Miasto pracy *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={registerData.city}
                            onChange={handleRegisterChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                            placeholder="Warszawa"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="hasCar"
                            className="block text-xs font-semibold text-gray-300 mb-2"
                          >
                            Własny samochód? *
                          </label>
                          <select
                            id="hasCar"
                            name="hasCar"
                            required
                            value={registerData.hasCar}
                            onChange={handleRegisterChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
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
                            className="block text-xs font-semibold text-gray-300 mb-2"
                          >
                            Typ pracy *
                          </label>
                          <select
                            id="workType"
                            name="workType"
                            required
                            value={registerData.workType}
                            onChange={handleRegisterChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all text-white"
                          >
                            <option value="">Wybierz</option>
                            <option value="taxi">Taxi</option>
                            <option value="delivery">Delivery</option>
                            <option value="both">Oba</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold text-gray-300 mb-2"
                        >
                          Dodatkowe informacje (opcjonalnie)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={registerData.message}
                          onChange={handleRegisterChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#0BA14E] focus:border-[#0BA14E] outline-none transition-all resize-none text-white"
                          placeholder="Masz pytania? Napisz tutaj..."
                        />
                      </div>

                      <div className="flex items-start bg-[#0BA14E]/5 rounded-xl p-3 border border-[#0BA14E]/20">
                        <input
                          type="checkbox"
                          id="rodo"
                          name="rodo"
                          required
                          checked={registerData.rodo}
                          onChange={handleRegisterChange}
                          className="mt-1 mr-3 w-4 h-4 text-[#0BA14E] border-gray-600 rounded focus:ring-[#0BA14E] focus:ring-2 bg-gray-800"
                        />
                        <label htmlFor="rodo" className="text-xs text-gray-300 leading-relaxed">
                          Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie oferty
                          współpracy jako kierowca. *
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

                      <div className="pt-2 space-y-3">
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
                              Wyślij zgłoszenie
                              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsLoginMode(true)}
                          className="w-full border-2 border-[#0BA14E] text-[#0BA14E] px-6 py-3 rounded-xl font-semibold text-base bg-transparent hover:bg-[#0BA14E]/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-100"
                        >
                          Zaloguj się
                        </button>
                      </div>
                    </form>
                  )}
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
                <div className={`relative w-full h-full ${
                  isLoginMode ? 'min-h-[400px] md:min-h-[450px]' : 'min-h-[600px] md:min-h-[600px]'
                }`}>
                  <Image
                    src="/images/people.png"
                    alt="Zespół moviQ"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
                  
                  <div className={`absolute inset-0 flex flex-col overflow-hidden ${
                    isLoginMode 
                      ? 'p-6 md:p-8 lg:p-10 justify-center' 
                      : 'p-6 pt-10 md:p-8 md:pt-8 lg:p-10 lg:pt-10 justify-start md:justify-end'
                  }`}>
                    {isLoginMode ? (
                      <>
                        <div className={`space-y-5 transition-all duration-1000 ease-out -mt-12 md:-mt-8 ${
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
                            Twój panel kierowcy
                          </h3>
                          <p 
                            className="text-base md:text-lg text-white leading-relaxed max-w-md"
                            style={{
                              textShadow: '0 3px 15px rgba(0, 0, 0, 0.8), 0 1px 5px rgba(0, 0, 0, 0.7)',
                            }}
                          >
                            Po zalogowaniu uzyskasz dostęp do wszystkich informacji o swojej współpracy, rozliczeniach i wypłatach w jednym miejscu.
                          </p>
                          
                          <div className="space-y-2.5 pt-3">
                            {[
                              { icon: FileText, text: 'Szczegółowe rozliczenia i zestawienia' },
                              { icon: Calendar, text: 'Historia wypłat i harmonogram' },
                              { icon: CreditCard, text: 'Informacje o cotygodniowych wypłatach' },
                              { icon: BarChart, text: 'Statystyki i podsumowania zarobków' },
                              { icon: Settings, text: 'Zarządzanie danymi i ustawieniami' },
                            ].map((benefit, index) => {
                              const IconComponent = benefit.icon;
                              return (
                                <div key={index} className="flex items-start gap-3">
                                  <IconComponent
                                    className="w-6 h-6 text-[#0BA14E] flex-shrink-0 mt-0.5 drop-shadow-lg"
                                    strokeWidth={2.5}
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
                      </>
                    ) : (
                      <>
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
                                <span className="font-semibold text-xs text-gray-900">{app.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
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
