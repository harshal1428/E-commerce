# 🗄️ MongoDB Atlas Free Setup Guide

## 📝 Step-by-Step Instructions:

### 1. Create Account & Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" → Sign up with Google/GitHub
3. Choose "Create a Shared Cluster" (FREE)
4. Select **M0 Sandbox** (Free tier)
5. Choose **AWS** as cloud provider
6. Select region closest to you (e.g., Mumbai)
7. Click "Create Cluster"

### 2. Create Database User
1. Go to "Database Access" → "Add New Database User"
2. Username: `ecommerce_user`
3. Password: Generate strong password (save it!)
4. Click "Add User"

### 3. Configure Network Access
1. Go to "Network Access" → "Add IP Address"
2. Select "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 4. Get Connection String
1. Go to "Database" → Click "Connect" on your cluster
2. Select "Drivers"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `ecommerce`

### 5. Your Connection String Format:
```
mongodb+srv://ecommerce_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### 6. Seed Your Database (Optional)
1. Connect to your cluster using MongoDB Compass
2. Run the seed script to populate products

## ✅ Free Tier Limits:
- 512MB storage
- Shared RAM
- Sufficient for development and small projects
