package com.stackroute.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class RibbonController {
    @Autowired
    Environment environment;

    @GetMapping("/")
    public String health(){
        return "I am ok";
    }

    @GetMapping("/backend")
    public String backend(){
        System.out.println("inside myrestcontroller backend");
        String serverPort = environment.getProperty("local.server.port");
        return "Hello from backend"+"host:localhost"+"::port"+serverPort;
    }
}
