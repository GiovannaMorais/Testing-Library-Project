import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../pages/Pokedex';
import App from '../App';

describe('Testando o componente Pokédex', () => {
  const pokeNameId = 'pokemon-name';

  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', { name: /Encountered pokémons/i,
      level: 2 });
    expect(encountered).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo é clicado',
    () => {
      renderWithRouter(<App />);

      const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(buttonProximo).toBeInTheDocument();

      userEvent.click(buttonProximo);
      const nextPokemon = screen.getByTestId(pokeNameId);
      //   console.log('nextPokemon', nextPokemon.innerHTML) => Resultado: Charmander
      expect(nextPokemon.innerHTML).toBe('Charmander');
      userEvent.click(buttonProximo);
      expect(nextPokemon.innerHTML).toBe('Caterpie');
      userEvent.click(buttonProximo);
      expect(nextPokemon.innerHTML).toBe('Ekans');
      userEvent.click(buttonProximo);
      expect(nextPokemon.innerHTML).toBe('Alakazam');
    });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(pokeNameId);
    // console.log(pokemon.length);
    expect(pokemon.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const elementsFilter = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    const pokemonBtn = screen.getAllByTestId('pokemon-type-button');
    // console.log(elementsFilter[0]);
    expect(pokemonBtn.length).toBe(elementsFilter.length);
    pokemonBtn.forEach(
      (element, index) => expect(element.innerHTML).toBe(elementsFilter[index]),
    );
  });

  it('A  Pokédex deve circular somente pelos pokémons de determinado tipo', () => {
    renderWithRouter(<App />);
    const psychicBtn = screen.getByRole('button', {
      name: /psychic/i,
    });
    expect(psychicBtn).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');

    userEvent.click(psychicBtn);
    expect(pokemonName.innerHTML).toBe('Alakazam');

    const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonProximo);
    expect(pokemonName.innerHTML).toBe('Mew');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const psychicBtn = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(psychicBtn);
    const pokemonName = screen.getByTestId(pokeNameId);
    expect(pokemonName.innerHTML).toBe('Alakazam');

    expect(btnAll).toBeInTheDocument();
    expect(btnAll.innerHTML).toBe('All');
    userEvent.click(btnAll);
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonProximo);
    expect(pokemonName.innerHTML).toBe('Charmander');
  });
});
