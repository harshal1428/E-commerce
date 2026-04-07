# 🚀 Complete Free Deployment Guide: Vercel + Render

## 📋 Overview
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Free)
- **Total Cost**: $0/month

---

## 🗄️ Step 1: Setup MongoDB Atlas (5 minutes)

1. **Create Account**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Free Cluster**: 
   - M0 Sandbox (FREE)
   - AWS, Mumbai region
   - Database name: `ecommerce`
3. **Create User**: `ecommerce_user` with strong password
4. **Network Access**: Allow from anywhere (0.0.0.0/0)
5. **Get Connection String** from Database → Connect → Drivers

**Save your connection string:**
```
mongodb+srv://ecommerce_user:PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## 🔐 Step 2: Setup Google OAuth (10 minutes)

1. **Go to**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Create Project**: "E-commerce Production"
3. **Enable APIs**: Google+ API, Google OAuth2 API
4. **Create Credentials**:
   - OAuth client ID
   - Web application
   - Add: `http://localhost:5173` and `https://your-app.vercel.app`
5. **Save**: Client ID and Client Secret

---

## 🚀 Step 3: Deploy Backend to Render (10 minutes)

1. **Go to**: [Render](https://render.com/)
2. **Sign up** with GitHub
3. **Create New** → "Web Service"
4. **Connect Repository**: Select your GitHub repo
5. **Configure**:
   - **Name**: `ecommerce-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5006
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   JWT_SECRET=your_super_secret_key_32_chars_long
   ```

7. **Deploy** → Wait for deployment
8. **Copy your backend URL**: `https://ecommerce-backend.onrender.com`

---

## 🌐 Step 4: Deploy Frontend to Vercel (10 minutes)

1. **Go to**: [Vercel](https://vercel.com/new)
2. **Sign up** with GitHub
3. **Import Project**: Select your GitHub repo
4. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

6. **Deploy** → Wait for deployment
7. **Copy your frontend URL**: `https://your-app.vercel.app`

---

## 🔧 Step 5: Update Production URLs

### Update Google OAuth:
1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Edit your OAuth credentials
3. Add your Vercel URL to authorized origins and redirect URIs

### Update Backend OAuth Callback:
1. In your Render dashboard, go to your backend service
2. Add environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```

---

## 🧪 Step 6: Test Everything

1. **Backend Test**: Visit `https://your-backend.onrender.com/api/products`
2. **Frontend Test**: Visit `https://your-app.vercel.app`
3. **Google OAuth**: Try login with Google
4. **Database**: Verify products are loading

---

## 🎉 Your Live E-commerce Site!

**What you get:**
- ✅ Live e-commerce website
- ✅ Google authentication
- ✅ Product catalog with Indian prices
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Responsive design
- ✅ $0/month hosting

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://ecommerce-backend.onrender.com`

---

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS Errors**: Update frontend API URLs
2. **OAuth Failures**: Check redirect URIs in Google Console
3. **Database Connection**: Verify MongoDB credentials
4. **Build Failures**: Check package.json scripts

### Free Tier Limits:
- **Render**: 750 hours/month (sufficient for always-on)
- **Vercel**: 100GB bandwidth/month
- **MongoDB**: 512MB storage

---

## 📞 Support

If you face any issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check CORS configuration

**Your e-commerce site is now live and completely free! 🎉**
