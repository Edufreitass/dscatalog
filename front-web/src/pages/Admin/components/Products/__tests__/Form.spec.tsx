import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import history from 'core/utils/history';
import Form from '../Form';
import { categoriesResponse, fillFormData } from './fixtures';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    productId: 'create'
  })
}))

const server = setupServer(
  rest.get('http://localhost:8080/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesResponse));
  }),
  rest.post('http://localhost:8080/products', (req, res, ctx) => {
    return res(ctx.status(201));
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render Form and submit with success', async () => {
  render(
    <Router history={history}> 
      <ToastContainer />
      <Form />
    </Router>
  );

  const submitButton = screen.getByRole('button', { name: /salvar/i });
  const categoriesInput = screen.getByLabelText('Categorias');
  await selectEvent.select(categoriesInput, ['Computers', 'Electronics']);

  fillFormData();

  userEvent.click(submitButton);

  await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
  expect(history.location.pathname).toBe('/admin/products');
  expect(screen.getByText(/CADASTRAR UM PRODUTO/i)).toBeInTheDocument();
});

test('should render Form and submit with error', async () => {
  server.use(
    rest.post('http://localhost:8080/products', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(
    <Router history={history}> 
      <ToastContainer />
      <Form />
    </Router>
  );

  const submitButton = screen.getByRole('button', { name: /salvar/i });
  const categoriesInput = screen.getByLabelText('Categorias');
  await selectEvent.select(categoriesInput, ['Computers', 'Electronics']);

  fillFormData();

  userEvent.click(submitButton);

  await waitFor(() => expect(screen.getByText('Erro ao salvar produto!')).toBeInTheDocument());
});

test('should render Form and show validations', async () => {
  render(
    <Router history={history}> 
      <Form />
    </Router>
  );

  const submitButton = screen.getByRole('button', { name: /salvar/i });
  userEvent.click(submitButton);

  await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(5));
  const categoriesInput = screen.getByLabelText('Categorias');
  await selectEvent.select(categoriesInput, ['Computers', 'Electronics']);

  fillFormData();

  await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
});