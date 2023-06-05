<?php
$jsonData = file_get_contents('http://localhost:8080/pokemon.json');
$pokemon = json_decode($jsonData, true);

$search = $_GET['search'] ?? '';
$filteredPokemon = array_filter($pokemon, function ($p) use ($search) {
  return strpos(strtolower($p['name']), strtolower($search)) !== false;
});

header('Content-Type: application/json');
echo json_encode(array_slice($filteredPokemon, 0, 20));
?>
