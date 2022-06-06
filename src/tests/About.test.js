import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testando o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getByText(
      /a digital encyclopedia containing all pokémons/i,
    );
    const infoPoke = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(infoPokedex).toBeInTheDocument();
    expect(infoPoke).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafos = screen.getAllByText(/Pokémons/i).length;
    expect(paragrafos).toBe(2);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
