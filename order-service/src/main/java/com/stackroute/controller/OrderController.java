package com.stackroute.controller;

import com.stackroute.domain.Order;
import com.stackroute.domain.Products;
import com.stackroute.exception.OrderAlreadyExistsException;
import com.stackroute.exception.OrderDoesNotExistException;
import com.stackroute.kafka.OrderDto;
import com.stackroute.service.KafkaProducerService;
import com.stackroute.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * RestController annotation is used to create Restful web services using Spring MVC
 */
@RestController

/**
 * RequestMapping annotation maps HTTP requests to handler methods
 */
@RequestMapping(value = "api/v1")

@CrossOrigin(origins = "*")
public class OrderController {

    private OrderService orderService;
    private ResponseEntity responseEntity;
    private KafkaProducerService kafkaProducerService;

    @Autowired
    public OrderController(OrderService orderService, KafkaProducerService kafkaProducerService) {
        this.orderService = orderService;
        this.kafkaProducerService = kafkaProducerService;
    }

    //This method returns all the orders in the collection 'orders'
    @GetMapping("order")
    public ResponseEntity<List<Order>> getAllOrders() {
        responseEntity = new ResponseEntity<List<Order>>(orderService.getAllOrderDetails(), HttpStatus.OK);
        return responseEntity;
    }

    //This method returns the order by the given id in the collection 'orders'
    @GetMapping("order/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) throws OrderDoesNotExistException {
        responseEntity = new ResponseEntity<Order>(orderService.getOrderDetailsById(orderId), HttpStatus.OK);
        return responseEntity;
    }

    //This method returns all the orders by the given buyerEmail in the collection 'orders'
    @GetMapping("order/buyerEmail/{buyerEmail}")
    public ResponseEntity<List<Order>> getAllOrdersByBuyerEmail(@PathVariable String buyerEmail){
        responseEntity = new ResponseEntity<List<Order>>(orderService.getAllOrderDetailsByBuyerEmail(buyerEmail), HttpStatus.OK);
        return responseEntity;
    }

    //This method saves the posted order to the collection 'orders' and produces it to a kafka topic as well
    @PostMapping("order")
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) throws OrderAlreadyExistsException {
        responseEntity = new ResponseEntity<Order>(orderService.saveOrderDetails(order), HttpStatus.CREATED);

        //Producing this order on the kafka topic "orderDetails" for other services to consume
        kafkaProducerService.sendOrderDetails(order);
        OrderDto orderDto = new OrderDto();
        List<String> products=new ArrayList<>();
        for(Products product:order.getProducts()){
            products.add(product.getProductName());
        }
        orderDto.setBuyerEmail(order.getBuyerEmail());
        orderDto.setDeliveryAddress(order.getDeliveryAddress());
        orderDto.setBuyerPhone(order.getBuyerPhone());
        orderDto.setProducts(products);
        kafkaProducerService.sendOrderToRecom(orderDto);
        return responseEntity;
    }

    //This method deletes the order by the given id in the collection 'orders'
    @DeleteMapping("order/{orderId}")
    public ResponseEntity<Boolean> deleteOrder(@PathVariable String orderId) throws OrderDoesNotExistException {
        responseEntity = new ResponseEntity<Boolean>(orderService.deleteOrder(orderId), HttpStatus.OK);
        return responseEntity;
    }

    //This method updates the order if it already exists in the collection 'orders'
    @PutMapping("order")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order) throws OrderDoesNotExistException {
        responseEntity = new ResponseEntity<Order>(orderService.updateOrder(order), HttpStatus.OK);
        return responseEntity;
    }

}