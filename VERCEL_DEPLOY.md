# Wdrożenie na Vercel

## Metoda 1: Przez Vercel CLI (Zalecane)

### 1. Zainstaluj Vercel CLI (jeśli jeszcze nie masz)
```bash
npm i -g vercel
```

### 2. Zaloguj się do Vercel
```bash
vercel login
```

### 3. Wdróż projekt
```bash
vercel
```

Postępuj zgodnie z instrukcjami:
- **Set up and deploy?** → Y
- **Which scope?** → Wybierz swoje konto
- **Link to existing project?** → N (pierwszy raz)
- **What's your project's name?** → moviq-website (lub wybierz inną nazwę)
- **In which directory is your code located?** → ./ (Enter)

### 4. Wdróż do produkcji
```bash
vercel --prod
```

## Metoda 2: Przez GitHub + Vercel Dashboard

### 1. Utwórz repozytorium GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <URL_TWOJEGO_REPO>
git push -u origin main
```

### 2. Połącz z Vercel
1. Przejdź do [vercel.com](https://vercel.com)
2. Zaloguj się i kliknij **"Add New Project"**
3. Wybierz swoje repozytorium GitHub
4. Vercel automatycznie wykryje Next.js i skonfiguruje projekt

## Konfiguracja zmiennych środowiskowych

**WAŻNE:** Musisz dodać zmienną środowiskową `RESEND_API_KEY` w ustawieniach projektu na Vercel:

1. Przejdź do projektu na Vercel Dashboard
2. Kliknij **Settings** → **Environment Variables**
3. Dodaj:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Twój klucz API z Resend
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)

## Po wdrożeniu

- Vercel automatycznie przypisze URL (np. `moviq-website.vercel.app`)
- Możesz dodać własną domenę w ustawieniach projektu
- Każdy push do głównej gałęzi automatycznie wdroży nową wersję

## Uwagi

- Wszystkie pliki w `public/` będą dostępne publicznie
- API routes (`app/api/`) będą działać automatycznie
- Vercel automatycznie optymalizuje obrazy i statyczne zasoby

