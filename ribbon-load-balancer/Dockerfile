FROM adoptopenjdk/openjdk11-openj9:alpine-jre

ADD ./target/ribbon-load-balancer-0.0.1-SNAPSHOT.jar /usr/src/ribbon-load-balancer-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "ribbon-load-balancer-0.0.1-SNAPSHOT.jar"]