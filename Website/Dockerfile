FROM node:14

EXPOSE 8080
EXPOSE 443

RUN apt-get update && \
    apt-get install -y nodejs npm libnss3-tools

COPY . /app/

WORKDIR /app

RUN npm init -y && \
    npm install express

CMD ["mkcert", "-install"]
CMD ["node", "index.js"]