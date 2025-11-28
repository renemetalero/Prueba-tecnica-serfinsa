package org.pruebatecnicarene.mapper;


import org.pruebatecnicarene.dto.ProductRequestDTO;
import org.pruebatecnicarene.dto.ProductResponseDTO;
import org.pruebatecnicarene.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponseDTO toResponse(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setProductTypeId(product.getProductType().getId());
        dto.setProductTypeName(product.getProductType().getName());
        dto.setCreatedBy(product.getCreatedBy() != null ? product.getCreatedBy().getId() : null);

        return dto;
    }

    public void update(Product product, ProductRequestDTO dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
    }
}