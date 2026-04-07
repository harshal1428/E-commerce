# 🛍️ E-commerce Website

A modern full-stack e-commerce application with React frontend and Node.js backend.

## 🚀 Deployment Options

### 1. **Vercel (Recommended for Frontend) + Render (Backend)**
- **Frontend**: Deploy to Vercel (free tier)
- **Backend**: Deploy to Render (free tier)
- **Database**: MongoDB Atlas (free tier)

### 2. **Netlify (Frontend) + Railway (Backend)**
- **Frontend**: Deploy to Netlify (free tier)
- **Backend**: Deploy to Railway (free tier)
- **Database**: MongoDB Atlas (free tier)

### 3. **AWS (Production)**
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS EC2 or Elastic Beanstalk
- **Database**: MongoDB Atlas or AWS DocumentDB

## 📋 Prerequisites for Deployment

1. **MongoDB Atlas Database**
   - Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get connection string

2. **Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs for production

3. **Environment Variables**
   - Configure all required environment variables

## 🔧 Environment Variables Required

### Backend (.env)
```env
PORT=5006
MONGO_URI=your_mongodb_atlas_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### Frontend
- Update API URLs to production backend URL
- Update Google OAuth redirect URI

## 📦 Build & Deploy Commands

### Frontend
```bash
cd frontend
npm install
npm run build
```

### Backend
```bash
cd backend
npm install
npm start
```

## 🌐 Quick Deploy Links

- [Deploy to Vercel](https://vercel.com/new)
- [Deploy to Render](https://render.com/)
- [Deploy to Netlify](https://app.netlify.com/)
- [Deploy to Railway](https://railway.app/)

## 📱 Features

- ✅ User Authentication (Google OAuth)
- ✅ Product Management
- ✅ Shopping Cart
- ✅ Wishlist
- ✅ Order Management
- ✅ Responsive Design
- ✅ Indian Rupee Pricing
- ✅ Modern UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js
- Express
- MongoDB
- JWT Authentication
- Google OAuth

## 📞 Support

For deployment issues, check the troubleshooting section or create an issue.
