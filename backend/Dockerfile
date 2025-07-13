# Use lightweight Java 17 base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy your compiled JAR file into the image
COPY target/authify-0.0.1-SNAPSHOT.jar app.jar

# Set environment variable (optional)
ENV SPRING_PROFILES_ACTIVE=prod

# Expose port
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
