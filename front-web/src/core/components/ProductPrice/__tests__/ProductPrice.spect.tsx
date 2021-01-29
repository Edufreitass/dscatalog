import React from 'react';
import { render, screen } from "@testing-library/react";
import ProductPrice from '..'

test('should render ProductPrice', () => {
  // Arrange
  const price = 1200;

  // Act
  render(
    <ProductPrice price={price} />
  );

  // Assert
  // screen.debug();
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('1,200.00');
  
  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});