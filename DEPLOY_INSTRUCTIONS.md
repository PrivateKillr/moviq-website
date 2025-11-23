# Wdrożenie na Vercel przez GitHub

## Krok 1: Utwórz repozytorium na GitHub

1. Przejdź na [github.com](https://github.com)
2. Kliknij **"New repository"** (lub **"+"** → **"New repository"**)
3. Wypełnij:
   - **Repository name:** `moviq-website` (lub wybierz inną nazwę)
   - **Description:** (opcjonalnie) "moviQ - Partner flotowy dla kierowców aplikacji"
   - **Visibility:** Public lub Private (według preferencji)
   - **NIE zaznaczaj** "Initialize with README" (już mamy pliki)
4. Kliknij **"Create repository"**

## Krok 2: Połącz lokalne repozytorium z GitHub

Po utworzeniu repozytorium GitHub pokaże Ci instrukcje. Użyj tych komend (zamień `YOUR_USERNAME` na swoją nazwę użytkownika):

```bash
cd /Users/pawelkapelan/moviQ_website
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moviq-website.git
git push -u origin main
```

**Lub jeśli używasz SSH:**
```bash
git remote add origin git@github.com:YOUR_USERNAME/moviq-website.git
git push -u origin main
```

## Krok 3: Połącz projekt z Vercel

### Opcja A: Przez Vercel Dashboard (Zalecane)

1. Przejdź na [vercel.com](https://vercel.com)
2. Zaloguj się (możesz użyć konta GitHub)
3. Kliknij **"Add New Project"** (lub **"Import Project"**)
4. Wybierz swoje repozytorium `moviq-website` z listy
5. Vercel automatycznie wykryje Next.js i skonfiguruje:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (automatycznie)
   - **Output Directory:** `.next` (automatycznie)
6. **WAŻNE:** Przed kliknięciem "Deploy", dodaj zmienną środowiskową:
   - Kliknij **"Environment Variables"**
   - Dodaj:
     - **Name:** `RESEND_API_KEY`
     - **Value:** Twój klucz API z Resend
     - Zaznacz wszystkie środowiska: Production, Preview, Development
7. Kliknij **"Deploy"**

### Opcja B: Przez Vercel CLI

```bash
# Zainstaluj Vercel CLI (jeśli jeszcze nie masz)
npm install -g vercel

# Zaloguj się
vercel login

# Wdróż projekt (pierwszy raz)
vercel

# Połącz z istniejącym projektem GitHub
# Vercel automatycznie wykryje połączenie z GitHub
```

## Krok 4: Konfiguracja zmiennych środowiskowych

Po pierwszym wdrożeniu:

1. Przejdź do projektu na Vercel Dashboard
2. Kliknij **Settings** → **Environment Variables**
3. Dodaj zmienną:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Twój klucz API z Resend
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)
4. Kliknij **Save**
5. **Ważne:** Po dodaniu zmiennej, musisz zrobić redeploy:
   - Przejdź do **Deployments**
   - Kliknij **"..."** przy ostatnim deployment
   - Wybierz **"Redeploy"**

## Automatyczne wdrożenia

Po połączeniu z GitHub:
- ✅ Każdy push do `main` automatycznie wdroży nową wersję
- ✅ Pull Requesty otrzymają własne preview URLs
- ✅ Vercel automatycznie buduje i optymalizuje projekt

## URL projektu

Po wdrożeniu otrzymasz:
- **Production URL:** `https://moviq-website.vercel.app` (lub podobny)
- **Preview URLs:** Dla każdego PR/branch

## Dodanie własnej domeny (opcjonalnie)

1. Przejdź do **Settings** → **Domains**
2. Dodaj swoją domenę
3. Postępuj zgodnie z instrukcjami DNS

## Troubleshooting

### Build fails
- Sprawdź logi w Vercel Dashboard → Deployments → wybierz deployment → Logs
- Upewnij się, że wszystkie zależności są w `package.json`

### API routes nie działają
- Sprawdź czy zmienne środowiskowe są ustawione
- Upewnij się, że `RESEND_API_KEY` jest dodana dla wszystkich środowisk

### Obrazy/filmy nie ładują się
- Sprawdź czy pliki są w folderze `public/`
- Upewnij się, że ścieżki są poprawne (zaczynają się od `/`)

