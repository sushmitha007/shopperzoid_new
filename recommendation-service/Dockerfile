FROM adoptopenjdk/openjdk11-openj9:alpine-jre

ADD ./target/recommendation-service-0.0.1-SNAPSHOT.jar /usr/src/recommendation-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "recommendation-service-0.0.1-SNAPSHOT.jar"]