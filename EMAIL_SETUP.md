# Konfiguracja wysyłania emaili

Formularz rejestracji używa **Resend API** do wysyłania emaili. To prostsze i bardziej niezawodne niż SMTP.

## Szybka konfiguracja

1. **Zarejestruj się na Resend**: https://resend.com (darmowe 3000 emaili/miesiąc)

2. **Utwórz API Key**:
   - Przejdź do https://resend.com/api-keys
   - Kliknij "Create API Key"
   - Skopiuj klucz

3. **Dodaj zmienne środowiskowe**:
   
   Utwórz plik `.env.local` w głównym katalogu projektu:
   
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@twoja-domena.pl
   ```

   **Ważne**: 
   - `RESEND_FROM_EMAIL` musi być zweryfikowaną domeną w Resend
   - Lub użyj domeny Resend: `onboarding@resend.dev` (dla testów)

4. **Zweryfikuj domenę** (opcjonalnie, dla produkcji):
   - W Resend Dashboard przejdź do "Domains"
   - Dodaj swoją domenę i dodaj rekordy DNS

5. **Zrestartuj serwer**:
   ```bash
   npm run dev
   ```

## Testowanie

Po skonfigurowaniu, wypełnij formularz rejestracji - email zostanie wysłany na:
- szuda@comoq.pl
- balcerzak@comoq.pl

## Alternatywa: Gmail SMTP (jeśli wolisz)

Jeśli wolisz użyć Gmail zamiast Resend, możesz zmienić kod na nodemailer, ale wymaga to:
- Konfiguracji "App Password" w Google
- Więcej zmiennych środowiskowych
- Więcej konfiguracji

Resend jest prostsze i bardziej niezawodne dla produkcji.
