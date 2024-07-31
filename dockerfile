# Build Stage
FROM node:18 AS build


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .



# Build the application
RUN npm run build

# Production Stage
FROM node:18


# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

# Install production dependencies
RUN npm install



# Expose port
EXPOSE 3000
CMD ["node", "./dist/index.js"]