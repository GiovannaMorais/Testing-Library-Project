import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

describe('Testando o componente FavoritePokemons', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const favoriteNotFound = screen.getByText('No favorite pokemon found');
    expect(favoriteNotFound).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    pokemons.forEach((pokemon) => {
      const pokeName = screen.getByText(pokemon.name);
      expect(pokeName).toBeInTheDocument();
    });
  });
});
