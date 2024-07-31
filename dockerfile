# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json (if present) to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files to /app
COPY . .

# Build the project
RUN npm run build

# Stage 2: Production
FROM node:18-slim

WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/dist ./dist

# Copy package.json and package-lock.json to /app
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["node", "./dist/index.js"]
