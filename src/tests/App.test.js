import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  it('Testando o primeiro link do topo da aplicação', () => {
    const { history } = renderWithRouter(<App />);

    const firstLink = screen.getByRole('link', { name: /home/i });
    expect(firstLink).toBeInTheDocument();

    userEvent.click(firstLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testando o segundo link do topo da aplicação', () => {
    const { history } = renderWithRouter(<App />);

    const secondLink = screen.getByRole('link', { name: /about/i });
    expect(secondLink).toBeInTheDocument();

    userEvent.click(secondLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testando o terceiro link do topo da aplicação', () => {
    const { history } = renderWithRouter(<App />);

    const thirdLink = screen.getByText(/Favorite/i);
    expect(thirdLink).toBeInTheDocument();

    userEvent.click(thirdLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testando se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const NotFound = screen.getByText('Page requested not found');
    expect(NotFound).toBeInTheDocument();
  });
});
