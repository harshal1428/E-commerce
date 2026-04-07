# 🔐 Google OAuth Setup for Production

## 📝 Step-by-Step Instructions:

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "NEW PROJECT"
4. Project name: `E-commerce Production`
5. Click "Create"

### 2. Enable OAuth APIs
1. In your project, go to "APIs & Services" → "Library"
2. Search and enable:
   - **Google+ API**
   - **Google OAuth2 API**
   - **Google People API**

### 3. Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. Application type: **Web application**
4. Name: `E-commerce Production`
5. Add authorized JavaScript origins:
   ```
   http://localhost:5173
   https://your-frontend-domain.vercel.app
   ```
6. Add authorized redirect URIs:
   ```
   http://localhost:5173/login
   https://your-frontend-domain.vercel.app/login
   ```
7. Click "Create"

### 4. Get Your Credentials
1. Copy **Client ID** (starts with numbers)
2. Copy **Client Secret** (long string)
3. Save these securely!

### 5. Update Environment Variables
```env
GOOGLE_CLIENT_ID=123456789-xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxx
```

## ⚠️ Important Notes:
- **Never commit secrets to Git**
- **Use different credentials for production vs development**
- **Update redirect URIs after deployment**
- **Keep your domain consistent**

## ✅ Testing OAuth:
1. Start your application locally
2. Try Google login
3. Verify redirect works correctly
