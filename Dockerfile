# Frontend Dockerfile
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ ./
RUN npm run build

# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Copy backend source
COPY backend/ ./backend/

# Copy built frontend
COPY --from=frontend-build /app/frontend/dist ./backend/dist/

# Expose port
EXPOSE 5006

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5006

# Start the server
WORKDIR /app/backend
CMD ["npm", "start"]
