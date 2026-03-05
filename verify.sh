#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       iD+ Landing Page - Verification Script             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check Node.js
echo -e "${YELLOW}→ Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi

# Check npm
echo ""
echo -e "${YELLOW}→ Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi

# Check dependencies
echo ""
echo -e "${YELLOW}→ Checking project dependencies...${NC}"
if [ -d "node_modules" ]; then
    PACKAGE_COUNT=$(ls -1 node_modules | wc -l)
    echo -e "${GREEN}✓ Dependencies installed ($PACKAGE_COUNT packages)${NC}"
else
    echo -e "${RED}✗ Dependencies not installed${NC}"
    echo -e "${YELLOW}  Run: npm install${NC}"
    exit 1
fi

# Check build output
echo ""
echo -e "${YELLOW}→ Checking production build...${NC}"
if [ -d "dist" ]; then
    BUNDLE_SIZE=$(du -sh dist | cut -f1)
    echo -e "${GREEN}✓ Production build exists: $BUNDLE_SIZE${NC}"
    
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✓ HTML bundle created${NC}"
    fi
    
    if [ -f "dist/assets/index-"*.js ]; then
        echo -e "${GREEN}✓ JavaScript bundles created${NC}"
    fi
    
    if [ -f "dist/assets/index-"*.css ]; then
        echo -e "${GREEN}✓ CSS bundles created${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Production build not found${NC}"
    echo -e "${YELLOW}  Run: npm run build${NC}"
fi

# Check key files
echo ""
echo -e "${YELLOW}→ Checking project structure...${NC}"
REQUIRED_FILES=(
    "index.html"
    "src/main.tsx"
    "src/app/App.tsx"
    "src/app/components/navbar.tsx"
    "src/app/components/hero.tsx"
    "vite.config.ts"
    "package.json"
)

MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file (missing)${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

# Check dev server
echo ""
echo -e "${YELLOW}→ Checking development server...${NC}"
if nc -z localhost 5173 &> /dev/null; then
    echo -e "${GREEN}✓ Dev server running at http://localhost:5173${NC}"
else
    echo -e "${YELLOW}⚠ Dev server not running${NC}"
    echo -e "${YELLOW}  Start with: npm run dev${NC}"
fi

# Summary
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    Verification Summary                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo -e "  1. Open http://localhost:5173 in your browser"
    echo -e "  2. Test all interactive features"
    echo -e "  3. Run Lighthouse audit (DevTools → Lighthouse)"
    echo -e "  4. Check performance metrics in browser console"
    echo ""
    echo -e "${GREEN}Your landing page is ready for production!${NC}"
else
    echo -e "${RED}✗ $MISSING_FILES file(s) missing${NC}"
    echo -e "${YELLOW}Please resolve issues and try again${NC}"
    exit 1
fi

echo ""
