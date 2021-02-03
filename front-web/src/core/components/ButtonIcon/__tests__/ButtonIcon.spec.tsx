import React from 'react';
import { render, screen } from "@testing-library/react";
import ButtonIcon from '..';

test('should render ButtonIcon', () => {
  const text = 'logar';

  render(
    <ButtonIcon text={text} />
  );

  const textElement = screen.getByText(text);
  const iconElement = screen.getByTestId('arrow-icon');
  
  expect(textElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
});