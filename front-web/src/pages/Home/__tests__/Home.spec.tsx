import React from 'react';
import { render, screen } from "@testing-library/react";
import Home from '..';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';

test('should render Home', () => {
  render(
    <Router history={history}>
      <Home />
    </Router>
  );

  // screen.debug();
  const titleElement = screen.getByText('Conheça o melhor catálogo de produtos');
  const subTitleElement = screen.getByText('Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.');

  expect(titleElement).toBeInTheDocument();
  expect(subTitleElement).toBeInTheDocument();
  expect(screen.getByTestId('main-image')).toBeInTheDocument();
  expect(screen.getByText(/INICIE AGORA A SUA BUSCA/i)).toBeInTheDocument();
});