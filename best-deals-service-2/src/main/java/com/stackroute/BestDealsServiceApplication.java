package com.stackroute;

import com.stackroute.config.RibbonConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Enables Spring Boot auto config and component scanning.
 */
@SpringBootApplication
/**Enable swagger support in the class*/
@EnableSwagger2
@EnableEurekaClient
@EnableDiscoveryClient
@RibbonClient(name = "loadbalancer",configuration = RibbonConfig.class)
public class BestDealsServiceApplication {

    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(BestDealsServiceApplication.class);
        logger.info(String.format("message"),String.format("Instance 2"));
        SpringApplication.run(BestDealsServiceApplication.class, args);
    }



}
