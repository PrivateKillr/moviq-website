const apps = [
  { name: 'Uber', available: true },
  { name: 'Bolt', available: true },
  { name: 'FreeNow', available: true },
  { name: 'Uber Eats', available: false, note: 'w przygotowaniu' },
  { name: 'Bolt Food', available: false, note: 'w przygotowaniu' },
  { name: 'Wolt', available: false, note: 'w przygotowaniu' },
];

export default function Apps() {
  return (
    <section
      id="aplikacje"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          Z kim współpracujemy?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-12">
          {apps.map((app, index) => (
            <div
              key={index}
              className={`bg-[#F7F7F7] rounded-lg p-6 md:p-8 text-center shadow-sm ${
                !app.available ? 'opacity-60' : ''
              }`}
            >
              <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {app.name}
              </div>
              {app.note && (
                <div className="text-xs text-gray-500 italic mt-2">
                  {app.note}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          Zakres dostępnych aplikacji zależy od miasta i aktualnych umów.
          Szczegóły omawiamy podczas rozmowy.
        </p>
      </div>
    </section>
  );
}

