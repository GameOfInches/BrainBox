FROM ubuntu:latest

EXPOSE 8080

RUN apt-get update && \
    apt-get install -y nodejs npm

WORKDIR /app

COPY . /app/

RUN npm init -y

CMD ["node", "index.js"]