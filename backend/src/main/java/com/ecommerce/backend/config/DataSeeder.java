package com.ecommerce.backend.config;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            Product p1 = new Product(null, "Sony WH-1000XM5 Wireless Noise Canceling Headphones", "Industry-leading noise cancellation", new BigDecimal("398.00"), "/hero_headphone.png", "Audio", 50);
            Product p2 = new Product(null, "Apple Watch Series 9 GPS + Cellular", "Smart watch with health features", new BigDecimal("499.00"), "/product_watch.png", "Wearables", 30);
            Product p3 = new Product(null, "Sony Alpha a7 IV Mirrorless Camera", "Full-frame mirrorless interchangeable lens camera", new BigDecimal("2498.00"), "/product_camera.png", "Cameras", 15);
            
            productRepository.saveAll(Arrays.asList(p1, p2, p3));
            System.out.println("Sample products seeded successfully.");
        }
    }
}
