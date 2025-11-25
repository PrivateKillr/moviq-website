# Instrukcje wypchnięcia zmian do Git i publikacji na Vercel

## Krok 1: Dodaj zmiany do Git

Wykonaj następujące komendy w terminalu:

```bash
cd /Users/pawelkapelan/moviQ_website

# Sprawdź status
git status

# Dodaj wszystkie zmiany
git add -A

# Utwórz commit
git commit -m "Add WCAG 2.2 accessibility improvements and fix scroll to timeline section"
```

## Krok 2: Wypchnij na GitHub

Jeśli repozytorium już istnieje na GitHub:

```bash
# Sprawdź czy remote jest skonfigurowany
git remote -v

# Jeśli nie ma remote, dodaj go (użyj swojego URL):
git remote add origin https://github.com/PrivateKillr/moviq-website.git

# Wypchnij zmiany
git push -u origin main
```

Jeśli repozytorium nie istnieje, najpierw utwórz je na GitHub, a następnie:

```bash
# Inicjalizuj repozytorium (jeśli jeszcze nie)
git init

# Dodaj remote
git remote add origin https://github.com/TWOJA_NAZWA_UZYTKOWNIKA/moviq-website.git

# Ustaw branch na main
git branch -M main

# Wypchnij
git push -u origin main
```

**Uwaga**: Jeśli GitHub wymaga autoryzacji, użyj Personal Access Token zamiast hasła.

## Krok 3: Publikacja na Vercel

1. Przejdź na [vercel.com](https://vercel.com)
2. Zaloguj się do swojego konta
3. Kliknij **"Add New Project"** lub **"Import Project"**
4. Wybierz repozytorium `moviq-website` z GitHub
5. Vercel automatycznie wykryje, że to projekt Next.js
6. **Dodaj zmienną środowiskową**:
   - Name: `RESEND_API_KEY`
   - Value: Twój klucz API z Resend
7. Kliknij **"Deploy"**

## Zmiany w tym commicie

- ✅ Dodano WCAG 2.2 accessibility improvements:
  - Skip link do treści głównej
  - Widoczne stany fokusa dla ciemnego motywu
  - Pełna obsługa klawiatury dla nawigacji i FAQ
  - Poprawne atrybuty ARIA
  - Dostępne formularze z walidacją i komunikatami błędów
  - aria-hidden dla ikon dekoracyjnych
  
- ✅ Naprawiono scroll do sekcji "Jak wygląda współpraca krok po kroku?"
  - Dodano ID `jak-to-dziala` do sekcji timeline
  - Przycisk "Zobacz jak to działa" teraz poprawnie scrolluje

## Pliki zmienione

- `app/layout.tsx` - dodano skip link
- `app/globals.css` - dodano style dla focus states
- `components/Navbar.tsx` - poprawki dostępności
- `components/FAQSection.tsx` - poprawki dostępności
- `components/Hero.tsx` - poprawki dostępności
- `components/AplikujSection.tsx` - pełna dostępność formularza
- `components/PracaOdZarazSection.tsx` - dodano ID dla scroll
- `WCAG_IMPROVEMENTS.md` - dokumentacja zmian

