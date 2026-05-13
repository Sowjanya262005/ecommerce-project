package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.OrderItem;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Order placeOrder(Order order) {
        order.setOrderTrackingNumber(UUID.randomUUID().toString());
        order.setStatus("DELIVERED"); // Hardcoding for demonstration
        
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                item.setOrder(order);
            }
        }
        
        return orderRepository.save(order);
    }
    
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
