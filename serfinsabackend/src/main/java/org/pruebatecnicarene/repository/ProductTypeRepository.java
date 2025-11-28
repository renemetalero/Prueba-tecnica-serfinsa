package org.pruebatecnicarene.repository;

import org.pruebatecnicarene.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
}