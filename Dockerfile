# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built React app from the previous stage
COPY --from=build /app/build/ .

# Ensure proper permissions for OpenShift (fixing permission issue)
RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

# Copy custom Nginx config
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for OpenShift
EXPOSE 8080

# Run as non-root user for OpenShift compatibility
USER 1001  

CMD ["nginx", "-g", "daemon off;"]
