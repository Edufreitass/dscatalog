import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import Catalog from '..';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';

test('should render Catalog', async () => {
  render(
    <Router history={history}>
      <Catalog />
    </Router>
  );

  expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();
  expect(screen.getAllByTitle('Loading...')).toHaveLength(6);

  await waitFor(() => expect(screen.getByText('Macbook Pro')).toBeInTheDocument());
});