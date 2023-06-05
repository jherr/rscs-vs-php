import React from "react";

import { Pokemon } from "./types";

import PokemonList from "./(components)/PokemonList";

export default async function Home() {
  const pokemonReq = await fetch(`http://localhost:8080/pokemon.json`, {
    cache: "no-cache",
  });
  const pokemon = (await pokemonReq.json()) as Pokemon[];

  const pokemonSearch = async (search: string) => {
    "use server";

    const pokemonReq = await fetch(`http://localhost:8080/pokemon.json`, {
      cache: "no-cache",
    });
    const pokemon = (await pokemonReq.json()) as Pokemon[];

    return pokemon
      .filter(({ name }) =>
        name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .slice(0, 20);
  };

  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold">Pokemon</h1>

      <PokemonList initialData={pokemon} pokemonSearch={pokemonSearch} />
    </main>
  );
}
