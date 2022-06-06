import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  const pikachu = pokemons[0];
  it('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pikachu;
    const name = screen.getByTestId('pokemon-name');
    expect(name.innerHTML).toBe(pikachu.name);

    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe(pikachu.type);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByAltText(`${pikachu.name} sprite`).src;
    expect(img).toBe(pikachu.image);
  });

  it('Teste se o card do pokémon contém um link para exibir detalhes deste pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      expect(maisDetalhes).toHaveAttribute('href', '/pokemons/25');
      expect(maisDetalhes).toBeInTheDocument();
    });

  it('Teste se ao clicar no link do pokémon,redireciona para a página de detalhes',
    () => {
      renderWithRouter(<App />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      userEvent.click(maisDetalhes);
      const summary = screen.getByRole('heading', { name: /summary/i });
      expect(summary).toBeInTheDocument();
    });

  it('Teste se ao clicar no link do pokémon,a URL exibida no navegador muda ',
    () => {
      const { history } = renderWithRouter(<App />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      userEvent.click(maisDetalhes);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pikachu.id}`);
    });

  it('Teste se existe um ícone de estrela nos pokémons favoritados ',
    () => {
      renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
      const image = screen.getByAltText(`${pikachu.name} is marked as favorite`);
      expect(image.src).toContain('/star-icon.svg');
    });
});
