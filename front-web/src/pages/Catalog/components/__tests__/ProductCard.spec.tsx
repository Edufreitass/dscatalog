import React from 'react';
import { render, screen } from "@testing-library/react";
import ProductCard from '../ProductCard';
import { Product } from 'core/types/Product';

test('should render ProductCard', () => {
  // Arrange
  const product = {
    name: 'computador',
    imgUrl: 'image.jpg',
    price: 40
  } as Product;

  // Act
  render(
    <ProductCard product={product} />
  );

  // Assert
  expect(screen.getByText('computador')).toBeInTheDocument();
  expect(screen.getByAltText('computador')).toBeInTheDocument();
  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('40.00')).toBeInTheDocument();
});