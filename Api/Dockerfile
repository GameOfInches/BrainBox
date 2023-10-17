FROM maven:3.6.3-openjdk-8 AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package



FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/api.jar /app/api.jar

EXPOSE 8080

CMD ["java", "-jar", "api.jar"]


