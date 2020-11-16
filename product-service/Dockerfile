FROM adoptopenjdk/openjdk11-openj9:alpine-jre

ADD ./target/product-service-0.0.1-SNAPSHOT.jar /usr/src/product-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "product-service-0.0.1-SNAPSHOT.jar"]