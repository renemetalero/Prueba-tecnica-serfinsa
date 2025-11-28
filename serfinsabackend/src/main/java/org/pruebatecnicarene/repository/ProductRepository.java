package org.pruebatecnicarene.repository;

import org.pruebatecnicarene.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
