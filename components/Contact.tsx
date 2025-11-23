'use client';

import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    hasCar: '',
    contactPreference: '',
    message: '',
    rodo: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Tutaj można dodać logikę wysyłki formularza
    alert('Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.');
    // Reset formularza
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      hasCar: '',
      contactPreference: '',
      message: '',
      rodo: false,
    });
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
      id="kontakt"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Zgłoś się i zacznij zarabiać
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Wypełnij formularz – oddzwonimy lub odpiszemy, żeby odpowiedzieć na
          Twoje pytania i przeprowadzić Cię przez kolejne kroki.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Numer telefonu *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Adres e-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Miasto, w którym chcesz pracować *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="hasCar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Czy masz własny samochód? *
            </label>
            <select
              id="hasCar"
              name="hasCar"
              required
              value={formData.hasCar}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            >
              <option value="">Wybierz opcję</option>
              <option value="yes">Tak</option>
              <option value="no">Nie</option>
              <option value="soon">Planuję w najbliższym czasie</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contactPreference"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Preferowany sposób kontaktu *
            </label>
            <select
              id="contactPreference"
              name="contactPreference"
              required
              value={formData.contactPreference}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            >
              <option value="">Wybierz opcję</option>
              <option value="phone">Telefon</option>
              <option value="sms">SMS</option>
              <option value="email">E-mail</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dodatkowe informacje / pytania
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="rodo"
              name="rodo"
              required
              checked={formData.rodo}
              onChange={handleChange}
              className="mt-1 mr-3 w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <label htmlFor="rodo" className="text-sm text-gray-700">
              Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie oferty
              współpracy jako kierowca. *
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0a8a3f] hover:shadow-lg transition-all duration-200"
            >
              Wyślij zgłoszenie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

