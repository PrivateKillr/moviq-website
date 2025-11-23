#!/bin/bash

# Skrypt do połączenia lokalnego repo z GitHub
# Użycie: ./connect-to-github.sh <GITHUB_REPO_URL>

if [ -z "$1" ]; then
    echo "❌ Błąd: Podaj URL repozytorium GitHub"
    echo "Użycie: ./connect-to-github.sh https://github.com/USERNAME/moviq-website.git"
    exit 1
fi

GITHUB_URL=$1

echo "🔧 Konfiguracja git..."
git config user.email "balcerzak@comoq.pl"
git config user.name "Pawel Balcerzak"

echo "📦 Sprawdzanie statusu repozytorium..."
if [ ! -d ".git" ]; then
    echo "📁 Inicjalizacja repozytorium git..."
    git init
fi

echo "📝 Dodawanie plików..."
git add .

echo "💾 Tworzenie commita..."
git commit -m "Initial commit - moviQ website ready for deployment" || echo "Commit już istnieje lub brak zmian"

echo "🌿 Ustawianie gałęzi main..."
git branch -M main

echo "🔗 Dodawanie remote GitHub..."
# Sprawdź czy remote już istnieje
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' już istnieje. Aktualizowanie..."
    git remote set-url origin "$GITHUB_URL"
else
    echo "➕ Dodawanie nowego remote 'origin'..."
    git remote add origin "$GITHUB_URL"
fi

echo "✅ Konfiguracja zakończona!"
echo ""
echo "📤 Aby wypchnąć kod na GitHub, uruchom:"
echo "   git push -u origin main"
echo ""
echo "🔐 Jeśli GitHub wymaga autoryzacji, możesz użyć:"
echo "   - Personal Access Token (Settings → Developer settings → Personal access tokens)"
echo "   - SSH keys (jeśli używasz SSH URL)"

