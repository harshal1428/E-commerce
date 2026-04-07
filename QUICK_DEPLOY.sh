#!/bin/bash

# 🚀 Quick Deploy Script for Vercel + Render

echo "🌐 Quick Deploy: Vercel + Render"
echo "================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}📋 DEPLOYMENT CHECKLIST:${NC}"
echo "✅ MongoDB Atlas setup (5 mins)"
echo "✅ Google OAuth setup (10 mins)" 
echo "✅ Backend deployment to Render (10 mins)"
echo "✅ Frontend deployment to Vercel (10 mins)"
echo "✅ Total time: ~35 minutes"
echo ""

echo -e "${YELLOW}🔗 QUICK LINKS:${NC}"
echo "MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
echo "Google Cloud: https://console.cloud.google.com/"
echo "Render: https://render.com/"
echo "Vercel: https://vercel.com/new"
echo ""

echo -e "${BLUE}📝 REQUIRED INFO:${NC}"
echo "1. MongoDB connection string"
echo "2. Google OAuth Client ID"
echo "3. Google OAuth Client Secret"
echo "4. JWT Secret Key"
echo ""

echo -e "${GREEN}🚀 READY TO DEPLOY!${NC}"
echo "Follow the step-by-step guide in DEPLOY_GUIDE.md"
echo ""

echo -e "${YELLOW}💡 PRO TIPS:${NC}"
echo "- Save all credentials securely"
echo "- Use different credentials for production"
echo "- Test locally before deploying"
echo "- Check deployment logs if issues occur"
echo ""

echo -e "${GREEN}🎉 YOUR SITE WILL BE LIVE AT:${NC}"
echo "Frontend: https://your-app.vercel.app"
echo "Backend: https://ecommerce-backend.onrender.com"
echo ""

echo "Let's deploy! 🚀"
