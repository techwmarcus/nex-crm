FROM node:22-alpine AS build

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci


# Copy the rest of the source files into the image.
COPY . .
RUN npm run build

# Run the application as a non-root user.
USER node

# Stage 2: Serve the production build with Nginx
FROM nginx:alpine
# Copy the compiled static assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
# Run the application.
CMD ["nginx", "-g", "daemon off;"]
