# Landing Page - Partner Flotowy dla Kierowców

Nowoczesna, responsywna strona landing page dla polskiej firmy - partnera flotowego dla kierowców aplikacji (Uber, Bolt, FreeNow itd.).

## Technologie

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom serwer deweloperski:
```bash
npm run dev
```

3. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Struktura projektu

```
/app
  /components
    - Navigation.tsx      # Sticky nawigacja z hamburger menu
    - Hero.tsx           # Sekcja główna / Dla kierowcy
    - HowItWorks.tsx     # Jak to działa (4 kroki)
    - Benefits.tsx       # Korzyści / Oferta
    - Requirements.tsx   # Wymagania / Dokumenty
    - Apps.tsx           # Obsługiwane aplikacje
    - FAQ.tsx            # Najczęstsze pytania (akordeon)
    - Contact.tsx        # Formularz kontaktowy
    - Footer.tsx         # Stopka
  - page.tsx             # Główna strona
  - layout.tsx           # Layout aplikacji
  - globals.css          # Globalne style
  - constants.ts         # Stałe (nazwa firmy)
```

## Dostosowanie

Aby zmienić nazwę firmy, edytuj plik `app/constants.ts`:

```typescript
export const COMPANY_NAME = "Twoja Firma";
```

## Funkcjonalności

- ✅ Responsywna nawigacja (sticky) z hamburger menu na mobile
- ✅ Smooth scroll do sekcji (anchor links)
- ✅ Sekcja Hero z CTA
- ✅ 4-krokowy proces współpracy
- ✅ Lista korzyści
- ✅ Wymagania i dokumenty
- ✅ Obsługiwane aplikacje
- ✅ FAQ z akordeonem
- ✅ Formularz kontaktowy (na razie z console.log)
- ✅ Stopka z informacjami

## Kolory

- Tło: #F7F7F7 / #FFFFFF
- Tekst: #000000
- Akcent: #0BA14C

## Build

```bash
npm run build
npm start
```

