# Stage 1: Build Angular App
FROM node:20.18.1 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files to NGINX's HTML directory
COPY --from=build /app/dist/spin/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]