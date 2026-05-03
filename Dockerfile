# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use legacy-peer-deps for html2canvas compatibility
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
# Copy build output to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
# Cloud Run expects the service to listen on port 8080 by default
CMD ["nginx", "-g", "daemon off;"]
