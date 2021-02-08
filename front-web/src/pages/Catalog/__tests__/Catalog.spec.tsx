import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import history from 'core/utils/history';
import Catalog from '..';

const productsResponse = {
  "content": [
    {
      "id": 3,
      "name": "Macbook Pro",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "price": 1250.0,
      "imgUrl": "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg",
      "date": "2020-07-14T10:00:00Z",
      "categories": []
    },
    {
      "id": 1,
      "name": "Notebook Pro",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "price": 2000.0,
      "imgUrl": "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/6-big.jpg",
      "date": null,
      "categories": []
    }
  ],
  "totalPages": 2
};

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