# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the React app (this will create a build/ directory)
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:latest

# Copy the built app from the build stage to NGINX's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the HTTP port
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
