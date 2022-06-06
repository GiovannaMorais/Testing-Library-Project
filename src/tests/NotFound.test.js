import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testando o componente NotFound', () => {
  it('Teste se a página contém um heading com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText(/page requested not found/i,
      { level: 2 });
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
