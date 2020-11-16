package com.stackroute;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MappingController {

    @Autowired
    MappingService productService;

    @GetMapping(value = "api/v1/product/{id}")
    public String getProducts(){
        System.out.println("Making a call to the product application");
        return productService.callProductApplication();
    }

    @GetMapping(value = "api/v1/product/name/{productName}")
    public String getProductsByName(){
        System.out.println("Making a call to the product application");
        return productService.callProductApplication();
    }
}
