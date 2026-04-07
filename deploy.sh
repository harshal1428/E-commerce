#!/bin/bash

# 🚀 E-commerce Deployment Script

echo "🚀 Starting E-commerce Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if required tools are installed
check_dependencies() {
    echo "🔍 Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "All dependencies are installed!"
}

# Build frontend
build_frontend() {
    echo "🏗️  Building frontend..."
    cd frontend
    
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    npm run build
    if [ $? -ne 0 ]; then
        print_error "Failed to build frontend"
        exit 1
    fi
    
    cd ..
    print_success "Frontend built successfully!"
}

# Install backend dependencies
install_backend() {
    echo "📦 Installing backend dependencies..."
    cd backend
    
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    cd ..
    print_success "Backend dependencies installed!"
}

# Main deployment function
deploy() {
    echo "🌐 Starting deployment process..."
    
    check_dependencies
    install_backend
    build_frontend
    
    print_success "🎉 Deployment files are ready!"
    
    echo ""
    echo "📋 Next Steps:"
    echo "1. Choose your deployment platform:"
    echo "   - Vercel: https://vercel.com/new"
    echo "   - Render: https://render.com/"
    echo "   - Netlify: https://app.netlify.com/"
    echo ""
    echo "2. Configure environment variables:"
    echo "   - Copy .env.example to .env"
    echo "   - Fill in your MongoDB Atlas connection string"
    echo "   - Add Google OAuth credentials"
    echo "   - Set JWT secret"
    echo ""
    echo "3. Deploy and test your application!"
}

# Run deployment
deploy
