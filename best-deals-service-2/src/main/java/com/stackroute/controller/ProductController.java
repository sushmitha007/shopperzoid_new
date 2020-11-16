package com.stackroute.controller;

import com.stackroute.domain.Product;
import com.stackroute.domain.Seller;
import com.stackroute.exceptions.ProductNotFoundException;
import com.stackroute.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RestController annotation is used to create Restful web services using Spring MVC
 */
@RestController

/**
 * RequestMapping annotation maps HTTP requests to handler methods
 */
@RequestMapping(value = "api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    public ProductService productService;

    /**
     * Constructor based Dependency injection to inject TrackService into controller
     */
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * PostMapping Annotation for mapping HTTP POST requests onto specific handler methods.
     */
    @PostMapping("product")
    public ResponseEntity<?> saveProduct(@RequestBody Product product) throws Exception {

        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<Product>(savedProduct, HttpStatus.CREATED);
    }

    /**
     * GetMapping Annotation for mapping HTTP GET requests onto specific handler methods.
     */
    @GetMapping("product/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) throws Exception {

        Product retrieveProductById = productService.getProductById(id);
        return new ResponseEntity<Product>(retrieveProductById, HttpStatus.OK);
    }

    /**
     * GetMapping Annotation for getting product by productName.
     */

    @GetMapping("product/name/{productName}")
    public ResponseEntity<?> getProductsByName(@PathVariable String productName) throws Exception {

        Product retrieveProductByName = productService.getProductByName(productName);
        return new ResponseEntity<Product>(retrieveProductByName, HttpStatus.OK);
    }
    /**
     * GetMapping Annotation for getting all product.
     */
    @GetMapping("products")
    public ResponseEntity<?> getAllProducts() throws Exception {

        List<Product> retrieveProducts = productService.getAllProducts();
        return new ResponseEntity<List<Product>>(retrieveProducts, HttpStatus.OK);
    }

    /**
     * DeleteMapping Annotation for mapping HTTP Delete requests onto specific handler methods.
     */
    @DeleteMapping("product/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable String id) throws ProductNotFoundException {
        return new ResponseEntity<>(productService.deleteProductById(id), HttpStatus.OK);
    }
    /**
     * DeleteMapping Annotation for delete all product.
     */
    @DeleteMapping("products")
    public ResponseEntity<?> deleteAllProducts() throws Exception {
        return new ResponseEntity<>(productService.deleteAllProducts(), HttpStatus.OK);
    }

    /**
     * PutMapping Annotation for mapping HTTP PUT requests onto specific handler methods.
     */
    @PutMapping("product")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) throws ProductNotFoundException {

        Product updatedProduct = productService.updateProduct(product);
        return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    }
    /**
     * GetMapping Annotation for getting product by productName.
     */
    @GetMapping("products/{productName}")
    public ResponseEntity<?> getProductByName(@PathVariable String productName) throws ProductNotFoundException {

        List<Seller> retrieveSellerByProduct = productService.getSellerByProductName(productName);
        return new ResponseEntity<List<Seller>>(retrieveSellerByProduct, HttpStatus.OK);
    }

    /**
     * GetMapping Annotation for getting product by particular seller.
     */
    @GetMapping("products/buy/{productName}/{sellerId}/")
    public ResponseEntity<?> buyProduct(@PathVariable String productName,@PathVariable String sellerId) throws ProductNotFoundException {

        productService.buyProduct(productName,sellerId);
        return new ResponseEntity<String>("Your Order has been Placed", HttpStatus.OK);
    }
    /**
     * GetMapping Annotation for getting product by particular seller.
     */
    @GetMapping("products/{productName}/{sellerId}/")
    public ResponseEntity<?> productWithSellerId(@PathVariable String productName,@PathVariable String sellerId) throws ProductNotFoundException {

        Seller seller=productService.productWithSellerId(productName,sellerId);
        return new ResponseEntity<Seller>(seller, HttpStatus.OK);
    }

}
