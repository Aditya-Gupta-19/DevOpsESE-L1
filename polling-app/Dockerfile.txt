# Use Node.js LTS base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the source
COPY . .

# Expose port
EXPOSE 8080

# Define environment variable
ENV ENV=production

# Start app
CMD ["npm", "start"]
