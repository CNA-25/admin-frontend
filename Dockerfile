# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:latest

# Copy the built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the correct port
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
