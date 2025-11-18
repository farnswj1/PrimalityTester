# frontend image
FROM node:22-slim AS frontend_build

# set directory
WORKDIR /opt/app

# add application and install dependencies
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./

# setup the build
RUN npm run lint && npm run build

# backend image
FROM node:22-slim

# expose port(s)
EXPOSE 8000

# set directory
WORKDIR /opt/app

# add application and install dependencies
COPY backend/package*.json ./
RUN npm ci
COPY backend ./

# copy build from frontend
COPY --from=frontend_build /opt/app/dist ./src/static

# run linting
RUN npm run lint

# run the server
CMD ["npm", "start"]
