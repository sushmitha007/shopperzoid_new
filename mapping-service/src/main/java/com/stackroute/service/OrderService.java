package com.stackroute.service;

import com.stackroute.domain.Order;
import com.stackroute.exceptions.ProductNotFoundException;

import java.util.List;

public interface OrderService {
    //for save the order
    public Order saveOrder(Order order) throws ProductNotFoundException;
    //get all the orders
    public List<Order> getAllOrders() throws Exception;
    //delete order by giving id of order.
    public Order deleteOrderById(String id) throws ProductNotFoundException;
    //scheduling algorithm runs after every 15 mins..
    public List<Order> mappedSeller() throws Exception;

}
