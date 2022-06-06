import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import PokemonDetails from '../pages/PokemonDetails';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente PokemonsDetails', () => {
  const pikachu = pokemons[0];
  it('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      userEvent.click(maisDetalhes);

      const namePokeDetails = screen.getByText(`${pikachu.name} Details`);
      expect(namePokeDetails).toBeInTheDocument();

      const link = screen.queryByText('More details');
      expect(link).not.toBeInTheDocument();

      const summary = screen.getByRole('heading', { name: /summary/i });
      expect(summary).toBeInTheDocument();

      const pokemonDetail = screen.getByText(`${pikachu.summary}`);
      expect(pokemonDetail).toBeInTheDocument();
    });

  it('Teste se existe na página uma seção com os mapas com as localizações do pokémon',
    () => {
      renderWithRouter(<App />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      userEvent.click(maisDetalhes);

      const locations = screen.getByRole('heading', {
        name: `Game Locations of ${pikachu.name}`,
        level: 2 });

      expect(locations).toBeInTheDocument();

      pikachu.foundAt.forEach(({ location, map }, index) => {
        const localPoke = screen.queryByText(location);
        expect(localPoke).toBeInTheDocument();

        const pokeMap = screen.getAllByAltText(`${pikachu.name} location`);
        expect(pokeMap[index].src).toBe(map);
      });
    });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes:',
    () => {
      renderWithRouter(<App />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      userEvent.click(maisDetalhes);

      const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      expect(checkbox).toBeInTheDocument();

      const label = screen.getByLabelText('Pokémon favoritado?');
      expect(label).toBeInTheDocument();
    });
});
