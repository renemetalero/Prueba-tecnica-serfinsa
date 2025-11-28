package org.pruebatecnicarene.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductResponseDTO {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;

    private Long productTypeId;
    private String productTypeName;

    private Long createdBy;
}