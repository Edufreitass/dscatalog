package com.devsuperior.dscatalog.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPCGamerProducts;
	private long countCategoryThreeProducts;
	private Pageable pageable;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		countCategoryThreeProducts = 23L;
		pageable = PageRequest.of(0, 10);
	}
	
	@Test
	public void findShouldReturnOnlySelectedCategoryWhenCategoryInformed() {
		// Arrange
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(3l, null));
		
		// Act
		Page<Product> result = repository.find(categories, "", pageable);
		
		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategoryThreeProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenCategoryNotInformed() {
		// Arrange
		List<Category> categories = null;
		
		// Act
		Page<Product> result = repository.find(categories, "", pageable);
		
		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}

	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		// Arrange
		String name = "";
		
		// Act
		Page<Product> result = repository.find(null, name, pageable);
		
		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		// Arrange
		String name = "pc gAMer";
		
		// Act
		Page<Product> result = repository.find(null, name, pageable);
		
		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		// Arrange
		String name = "PC Gamer";
		
		// Act
		Page<Product> result = repository.find(null, name, pageable);
		
		// Assert
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		// Arrange
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		// Act
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		// Assert
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		repository.deleteById(existingId);
		Optional<Product> result = repository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}

	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}

}
