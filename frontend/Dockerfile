# base image
FROM node:17-alpine

# set directory
WORKDIR /frontend

# add application and install dependencies
RUN npm install -g serve@13.0.2
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

# setup the build
RUN npm run build

# run the build
CMD ["serve", "-s", "build"]
