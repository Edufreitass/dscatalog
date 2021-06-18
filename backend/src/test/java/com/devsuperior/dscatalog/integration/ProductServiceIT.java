package com.devsuperior.dscatalog.integration;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIT {

	@Autowired
	private ProductService service;

	private Long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPCGamerProducts;
	private PageRequest pageRequest;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 100L;
		countPCGamerProducts = 96L;
		pageRequest = PageRequest.of(0, 10);
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
	}

	@Test
	public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {

		String name = "Camera";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		Assertions.assertTrue(result.isEmpty());
	}

	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {
		// Arranger
		String name = "";

		// Act
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExistsIgnoringCase() {
		// Arranger
		String name = "pc gAMer";

		// Act
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}

}
