FROM node:20-slim

WORKDIR /app

# Copy package files first to leverage docker layer caching
COPY package*.json ./

# Install dependencies (including dev deps so tsx can run)
RUN npm install --silent

# Copy the rest of the project
COPY . .

EXPOSE 3000

# Run the dev server (uses tsx from devDependencies)
CMD ["npm", "run", "dev"]
