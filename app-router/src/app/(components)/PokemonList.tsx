"use client";
import React, { useState } from "react";

import { Pokemon } from "../types";
import { flushSync } from "react-dom";

function PokemonList({
  initialData,
  pokemonSearch,
}: {
  initialData: Pokemon[];
  pokemonSearch: (search: string) => Promise<Pokemon[]>;
}) {
  const [pokemon, setPokemon] = useState(initialData);

  return (
    <>
      <input
        type="text"
        id="search"
        placeholder="Search"
        className="border border-gray-400 p-2 rounded-lg w-full mt-5 text-black"
        onChange={async (evt) => {
          const data = await pokemonSearch(evt.target.value);
          const start = performance.now();
          flushSync(() => {
            setPokemon(data);
          });
          console.log(performance.now() - start);
        }}
      />
      <div
        className="grid grid-cols-[15%_25%_10%_10%_10%_10%_10%_10%] mt-3"
        id="table"
      >
        <div className="font-bold">Name</div>
        <div className="font-bold">Type</div>
        <div className="font-bold">HP</div>
        <div className="font-bold">Attack</div>
        <div className="font-bold">Defense</div>
        <div className="font-bold">Sp. Attack</div>
        <div className="font-bold">Sp. Defense</div>
        <div className="font-bold">Speed</div>

        {pokemon.slice(0, 20).map((p) => (
          <React.Fragment key={p.id}>
            <div className="font-bold">{p.name}</div>
            <div>{p.type.join(", ")}</div>
            <div>{p.hp}</div>
            <div>{p.attack}</div>
            <div>{p.defense}</div>
            <div>{p.special_attack}</div>
            <div>{p.special_defense}</div>
            <div>{p.speed}</div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default PokemonList;
