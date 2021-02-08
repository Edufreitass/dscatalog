import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { productsResponse } from './fixtures';
import history from 'core/utils/history';
import Catalog from '..';

const server = setupServer(
  rest.get('http://localhost:8080/products', (req, res, ctx) => {
    return res(ctx.json(productsResponse))
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render Catalog', async () => {
  render(
    <Router history={history}>
      <Catalog />
    </Router>
  );

  expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();
  expect(screen.getAllByTitle('Loading...')).toHaveLength(6);
  
  await waitFor(() => expect(screen.getByText('Macbook Pro')).toBeInTheDocument());
  
  expect(screen.getByText('Notebook Pro')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();

  expect(screen.queryAllByTitle('Loading...')).toHaveLength(0);
});