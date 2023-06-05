import React from "react";

import { Pokemon } from "@/src/types";

export async function getServerSideProps() {
  const pokemonReq = await fetch(`http://localhost:8080/pokemon.json`, {
    cache: "no-cache",
  });
  const pokemon = (await pokemonReq.json()) as Pokemon[];

  return {
    props: {
      pokemon: pokemon.slice(0, 20),
    },
  };
}

function Home({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold">Pokemon</h1>

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
    </main>
  );
}

export default Home;
