FROM node

COPY /node /usr/src

WORKDIR /usr/src

EXPOSE 90

ENTRYPOINT [ "node", "index.js" ]