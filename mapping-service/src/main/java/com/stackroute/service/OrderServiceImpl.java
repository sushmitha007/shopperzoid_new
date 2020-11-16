package com.stackroute.service;

import com.stackroute.domain.*;
import com.stackroute.exceptions.ProductNotFoundException;
import com.stackroute.kafka.ProductDto;
import com.stackroute.repository.OrderRepository;
import com.stackroute.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    private ProductService productService;

    private OrderRepository orderRepository;

    private KafkaProducer kafkaProducer;

    private static final Logger logger= LoggerFactory.getLogger(OrderService.class);

    @Autowired
    public OrderServiceImpl(KafkaProducer kafkaProducer,ProductService productService,OrderRepository orderRepository) {
        this.kafkaProducer = kafkaProducer;
        this.orderRepository=orderRepository;
        this.productService=productService;
    }

//for save the order

    @Value("${minutes}")
    private int i;

    @Value("${discountPercent}")
    private float discount;

    public Order saveOrder(Order order) throws ProductNotFoundException{
        order.setTimestamp(new Date());
        Calendar cal = Calendar.getInstance(); // creates calendar
        cal.setTime(order.getTimestamp()); // sets calendar time/date
        cal.add(Calendar.MINUTE, i); // adds one hour
        order.setFinishTimestamp(cal.getTime());
        Order savedOrder=orderRepository.save(order);
        return savedOrder;
    }
//get all the orders
    public List<Order> getAllOrders() throws Exception {
        /**Throws Exception if Database connection issue happens*/
        orderRepository.findAll();
        return orderRepository.findAll();
    }
//delete order by giving id of order.
    public Order deleteOrderById(String id) throws ProductNotFoundException {
        /**Throw productNotFoundException if product we want to delete is not found*/
        if (orderRepository.existsById(id)) {
            Order deletedOrder = orderRepository.findById(id).get();
            orderRepository.deleteById(id);
            return deletedOrder;
        } else {
            throw new ProductNotFoundException("product you want to delete is not found");
        }
    }

    //scheduling algorithm runs after every 15 mins..

    public List<Order> mappedSeller() throws Exception {
        Order savedOrder=new Order();
        List<Order> totalOrders=this.orderRepository.findAll();
        for(Order order:totalOrders){
            if(order.getFinishTimestamp().compareTo(new Date())<0){
                order.setStatus("Placed");
                for(Products product:order.getProducts()){
                    Product updatedProduct=this.productService.buyProduct(product.getProductName(),product.getSellerEmail(),product.getProductQty());
                    if(product.getProductFinalPrice()==0||product.getProductFinalPrice()==null) {
                        product.setProductFinalPrice(product.getProductPrice());
                    }
                    else
                        product.setProductFinalPrice(product.getProductFinalPrice());
                    savedOrder=orderRepository.save(order);
                }
                orderRepository.save(order);
                this.kafkaProducer.sendOrderDetails(savedOrder);
                this.kafkaProducer.sendOrderToMail(savedOrder);
                orderRepository.delete(order);
            }
            else{

                for(Products product:order.getProducts()) {
                    Seller seller = this.productService.getSellerByProductName(product.getProductName()).get(0);
                    if (seller.getProductPrice() < product.getProductPrice() - (discount * product.getProductPrice())) {
                        Product updatedProduct=this.productService.buyProduct(product.getProductName(),product.getSellerEmail(),product.getProductQty());
                        product.setSellerEmail(seller.getSellerId());
                        order.setStatus("Placed");
                        product.setProductFinalPrice(seller.getProductPrice());
                        savedOrder=orderRepository.save(order);
                        this.kafkaProducer.sendOrderDetails(savedOrder);
                        this.kafkaProducer.sendOrderToMail(savedOrder);
                        orderRepository.delete(order);
                    }
                    else{
                        order.setStatus("Processing");
                        savedOrder=orderRepository.save(order);
                        this.kafkaProducer.sendOrderDetails(savedOrder);
                    }
                }

            }
            }
        return totalOrders;
        }
//kafka listener
    @KafkaListener(topics = "orderDetails", groupId = "order-id",containerFactory = "kafkaListenerContainerFactory2")
    public void consumeSeller(@Payload Order order) throws ProductNotFoundException {
        logger.info(String.format(order.toString()));
        this.saveOrder(order);
    }
}
