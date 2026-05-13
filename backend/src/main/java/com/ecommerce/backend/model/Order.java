package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String orderTrackingNumber;
    
    private int totalQuantity;
    private BigDecimal totalPrice;
    private String status; // PENDING, DELIVERED, CANCELLED
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();
    
    private LocalDateTime dateCreated = LocalDateTime.now();
    
    public void addOrderItem(OrderItem item) {
        orderItems.add(item);
        item.setOrder(this);
    }
}
