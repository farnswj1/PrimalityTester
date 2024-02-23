# base image
FROM node:20-alpine

# expose port(s)
EXPOSE 8000

# set directory
WORKDIR /opt/app

# add application and install dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

# run linting
RUN npm run lint

# run the server
CMD ["npm", "start"]
