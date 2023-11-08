FROM openjdk:20
ENV MONGO_URI=mongodb://localhost:27017/my_db
LABEL maintainer="john.doe@neuefische.de"
EXPOSE 8888
ADD backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]