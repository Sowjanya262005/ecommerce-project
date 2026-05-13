package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }
    
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }
}
