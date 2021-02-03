import React from 'react';
import { render, screen } from "@testing-library/react";
import Pagination from '..';

test('should render Pagination', () => {
  // Arrange
  const totalPages = 3;
  const activePage = 0;
  const onChange = () => null;

  // Act
  render(
    <Pagination
      totalPages={totalPages}
      activePage={activePage}
      onChange={onChange}
    />
  );

  // Assert
  const previousElement = screen.getByTestId('arrow-icon-previous');
  const nextElement = screen.getByTestId('arrow-icon-next');
  const firstPageItem = screen.getByText('1');
  const secondPageItem = screen.getByText('2');
  const thirdPageItem = screen.getByText('3');

  expect(previousElement).toBeInTheDocument();
  expect(previousElement).toHaveClass('page-inactive');
  expect(nextElement).toBeInTheDocument();
  expect(nextElement).toHaveClass('page-active');
  expect(firstPageItem).toBeInTheDocument();
  expect(firstPageItem).toHaveClass('active');
  expect(secondPageItem).toBeInTheDocument();
  expect(secondPageItem).not.toHaveClass('active');
  expect(thirdPageItem).toBeInTheDocument();
  expect(thirdPageItem).not.toHaveClass('active');
});