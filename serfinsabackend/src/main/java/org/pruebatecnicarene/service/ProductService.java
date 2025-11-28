package org.pruebatecnicarene.service;


import org.pruebatecnicarene.dto.ProductRequestDTO;
import org.pruebatecnicarene.dto.ProductResponseDTO;

import java.util.List;

public interface ProductService {

    List<ProductResponseDTO> findAll();
    ProductResponseDTO findById(Long id);
    ProductResponseDTO create(ProductRequestDTO dto, String userEmail);
    ProductResponseDTO update(Long id, ProductRequestDTO dto);
    void delete(Long id);
}