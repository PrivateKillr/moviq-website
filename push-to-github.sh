#!/bin/bash

# Skrypt do wypchnięcia kodu na GitHub
# Użycie: ./push-to-github.sh

set -e

echo "🔧 Konfiguracja git..."
git config user.email "balcerzak@comoq.pl"
git config user.name "Pawel Balcerzak"

echo "📁 Sprawdzanie repozytorium..."
if [ ! -d ".git" ]; then
    echo "📦 Inicjalizacja repozytorium git..."
    git init
fi

echo "📝 Dodawanie plików..."
git add .

echo "💾 Tworzenie commita..."
git commit -m "Initial commit - moviQ website ready for deployment" || echo "Commit już istnieje lub brak zmian"

echo "🌿 Ustawianie gałęzi main..."
git branch -M main

echo "🔗 Konfiguracja remote..."
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' już istnieje. Aktualizowanie..."
    git remote set-url origin https://github.com/PrivateKillr/moviq-website.git
else
    echo "➕ Dodawanie remote 'origin'..."
    git remote add origin https://github.com/PrivateKillr/moviq-website.git
fi

echo ""
echo "📤 Wypychanie kodu na GitHub..."
echo "⚠️  Jeśli zostaniesz poproszony o hasło, użyj Personal Access Token zamiast hasła!"
echo ""

git push -u origin main

echo ""
echo "✅ Kod został wypchnięty na GitHub!"
echo "🌐 Teraz możesz wdrożyć projekt na Vercel:"
echo "   1. Przejdź na vercel.com"
echo "   2. Kliknij 'Add New Project'"
echo "   3. Wybierz repozytorium 'PrivateKillr/moviq-website'"
echo "   4. Dodaj zmienną środowiskową RESEND_API_KEY"
echo "   5. Kliknij 'Deploy'"

