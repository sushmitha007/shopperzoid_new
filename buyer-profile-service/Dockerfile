FROM adoptopenjdk/openjdk11-openj9:alpine-jre

ADD ./target/buyer-profile-service-0.0.1-SNAPSHOT.jar /usr/src/buyer-profile-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "buyer-profile-service-0.0.1-SNAPSHOT.jar"]