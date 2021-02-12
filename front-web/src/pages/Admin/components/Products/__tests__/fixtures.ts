import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const categoriesResponse = {
  "content": [
    {
      "id": 1,
      "name": "Books"
    },
    {
      "id": 3,
      "name": "Computers"
    },
    {
      "id": 2,
      "name": "Electronics"
    }
  ]
}

export const fillFormData = () => {
  const nameInput = screen.getByTestId('name');
  const priceInput = screen.getByTestId('price');
  const imgUrlInput = screen.getByTestId('imgUrl');
  const descriptionInput = screen.getByTestId('description');

  userEvent.type(nameInput, 'Computador');
  userEvent.type(priceInput, '5000');
  userEvent.type(imgUrlInput, 'image.jpg');
  userEvent.type(descriptionInput, 'ótimo computador');
}