import React from 'react';
import { render, screen } from "@testing-library/react";
import Form from '../Form';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    productId: 'create'
  })
}))

test('should render Form', () => {
  render(
    <Router history={history}> 
      <Form />
    </Router>
  );

  screen.debug();
});