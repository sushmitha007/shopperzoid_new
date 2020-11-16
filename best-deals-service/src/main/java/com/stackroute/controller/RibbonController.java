package com.stackroute.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class RibbonController {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }

    @Autowired
    RestTemplate restTemplate;

    @RequestMapping("/")
    public String ribbonfn(@PathVariable String productName){
        String string = this.restTemplate.getForObject("http://best-deal-production",String.class);
        return string;
    }

//    @RequestMapping("loadbalancer/backend")
//    public String ribbonfn2(){
//        String string = this.restTemplate.
//    }

}
