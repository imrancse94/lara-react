# Step 1: Use the official Node.js image as a base image
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React application (this will create the build folder)
RUN npm run build

# Step 7: Use a smaller, production-ready server (e.g., nginx) to serve the app
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage into the nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to the outside world
EXPOSE 80

# Step 10: Start nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
