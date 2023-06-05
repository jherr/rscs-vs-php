<?php
$jsonData = file_get_contents('http://localhost:8080/pokemon.json');
$pokemon = json_decode($jsonData, true);

$search = $_GET['search'] ?? '';
$filteredPokemon = array_slice(
  array_filter($pokemon, function ($p) use ($search) {
    return strpos(strtolower($p['name']), strtolower($search)) !== false;
  }),
  0, 20);
?>

<div class="font-bold">Name</div>
<div class="font-bold">Type</div>
<div class="font-bold">HP</div>
<div class="font-bold">Attack</div>
<div class="font-bold">Defense</div>
<div class="font-bold">Sp. Attack</div>
<div class="font-bold">Sp. Defense</div>
<div class="font-bold">Speed</div>
<?php foreach ($filteredPokemon as $p) { ?>
  <div class="font-bold"><?= $p['name'] ?></div>
  <div><?= implode(', ', $p['type']) ?></div>
  <div><?= $p['hp'] ?></div>
  <div><?= $p['attack'] ?></div>
  <div><?= $p['defense'] ?></div>
  <div><?= $p['special_attack'] ?></div>
  <div><?= $p['special_defense'] ?></div>
  <div><?= $p['speed'] ?></div>
<?php } ?>

