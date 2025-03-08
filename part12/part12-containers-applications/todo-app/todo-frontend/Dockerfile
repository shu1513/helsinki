# Stage 1: Build stage
FROM node:20 AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Set the environment variable for VITE_BACKEND_URL
ENV VITE_BACKEND_URL=http://localhost:3000

# Run tests (you can make this optional if you want to skip tests for production)
RUN npm test

# Build the application for production
RUN npm run build

# Stage 2: Serve stage (using nginx)
FROM nginx:alpine

# Copy the build output from the build stage to the nginx container
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 (default port for nginx)
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
