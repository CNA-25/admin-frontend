# Step 1: Set the base image to Node.js (to build the app)
FROM node:18-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the app using an Nginx image
FROM nginx:alpine

# Step 8: Copy the build files from the build stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the required ports (8080 and 8443)
EXPOSE 8080
EXPOSE 8443

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
