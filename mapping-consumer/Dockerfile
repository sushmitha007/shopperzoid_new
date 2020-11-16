FROM adoptopenjdk/openjdk11-openj9:alpine-jre

ADD ./target/mapping-consumer-0.0.1-SNAPSHOT.jar /usr/src/mapping-consumer-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "mapping-consumer-0.0.1-SNAPSHOT.jar"]