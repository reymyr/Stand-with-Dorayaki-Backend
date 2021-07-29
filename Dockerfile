FROM node:14.17-alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm ci
EXPOSE 5000
CMD ["npm","start"]