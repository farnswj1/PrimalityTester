# base image
FROM node:22-alpine AS build

# set directory
WORKDIR /opt/app

# add application and install dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

# setup the build
RUN npm run lint && npm run build

# final image
FROM alpine

# copy build to final image
WORKDIR /opt/app/dist
COPY --from=build /opt/app/dist ./
