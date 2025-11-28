package org.pruebatecnicarene.service.impl;

import lombok.RequiredArgsConstructor;
import org.pruebatecnicarene.dto.ProductRequestDTO;
import org.pruebatecnicarene.dto.ProductResponseDTO;
import org.pruebatecnicarene.exception.ProductNotFoundException;
import org.pruebatecnicarene.mapper.ProductMapper;
import org.pruebatecnicarene.model.Product;
import org.pruebatecnicarene.model.ProductType;
import org.pruebatecnicarene.model.User;
import org.pruebatecnicarene.repository.ProductRepository;
import org.pruebatecnicarene.repository.ProductTypeRepository;
import org.pruebatecnicarene.repository.UserRepository;
import org.pruebatecnicarene.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;
    private final ProductTypeRepository typeRepo;
    private final UserRepository userRepo;
    private final ProductMapper mapper;

    @Override
    public List<ProductResponseDTO> findAll() {
        return productRepo.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public ProductResponseDTO findById(Long id) {
        return productRepo.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public ProductResponseDTO create(ProductRequestDTO dto, String userEmail) {

        ProductType type = typeRepo.findById(dto.getProductTypeId())
                .orElseThrow(() -> new RuntimeException("Tipo inválido"));

        User creator = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Product p = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .productType(type)
                .createdBy(creator)
                .build();

        return mapper.toResponse(productRepo.save(p));
    }

    @Override
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {

        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con id: " + id));

        ProductType type = typeRepo.findById(dto.getProductTypeId())
                .orElseThrow(() -> new RuntimeException("Tipo inválido"));

        mapper.update(p, dto);
        p.setProductType(type);

        return mapper.toResponse(productRepo.save(p));
    }


    @Override
    public void delete(Long id) {
        if (!productRepo.existsById(id))
            throw new ProductNotFoundException("Producto no existe");

        productRepo.deleteById(id);
    }
}
