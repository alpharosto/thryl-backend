# ============================
# Stage 1: Builder
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# ============================
# Stage 2: Runtime
# ============================
FROM node:18-alpine

WORKDIR /app

# Copy only package files to install prod deps
COPY package*.json ./

RUN npm install --omit=dev

# Copy only necessary project files
COPY src ./src
COPY .env.example ./

EXPOSE 3000

CMD ["node", "src/index.js"]
