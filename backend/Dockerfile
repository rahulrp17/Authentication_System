# Use Maven to build the JAR
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app
COPY . .

# Build the project (skip tests to speed up)
RUN mvn clean package -DskipTests

# Use a lighter base image for running the JAR
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/authify-0.0.1-SNAPSHOT.jar app.jar

# Expose Spring Boot's default port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
