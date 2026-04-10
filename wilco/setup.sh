#!/bin/bash
# ============================================================
# Wilco – Setup local + push para GitHub
# Execute: bash setup.sh
# ============================================================

set -e

REPO="https://github.com/ecommprt/infinitoo.git"
DIR="wilco"

echo "📦 Clonando repositório..."
git clone $REPO $DIR 2>/dev/null || true
cd $DIR

echo "⚙️  Criando estrutura do projeto..."
mkdir -p src/components/{ui,layout,tm} src/pages src/lib src/types src/hooks supabase

# .env.local (NÃO vai para o git)
cat > .env.local << 'ENV'
VITE_SUPABASE_URL=https://knuxtyucgaxuusgwbleg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtudXh0eXVjZ2F4dXVzZ3dibGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2ODY0ODIsImV4cCI6MjA5MTI2MjQ4Mn0.UeFD0gD1YkaORQ2TgFjxSvwHCTw-HY9dd8AV6lHDVXI
ENV

echo "📥 Instalando dependências..."
npm install

echo "🔍 Verificando TypeScript..."
npx tsc --noEmit && echo "✅ Zero erros TypeScript"

echo ""
echo "✅ Pronto! Para rodar localmente:"
echo "   cd $DIR && npm run dev"
echo ""
echo "📤 Para fazer push:"
echo "   git add -A && git commit -m 'feat: Wilco v0.1' && git push origin main"
