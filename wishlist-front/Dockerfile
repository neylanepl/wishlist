FROM node:20-slim

WORKDIR /app

# Copy package files first to leverage docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy project files
COPY . .

EXPOSE 5173

# Start the Vite dev server and bind to all interfaces so the host can reach it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
