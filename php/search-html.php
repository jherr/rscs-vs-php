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
<?php foreach ($pokemon as $row) { ?>
  <div class="font-bold"><?= htmlspecialchars($row['name']) ?></div>
  <div><?= htmlspecialchars(implode(', ', $row['type'])) ?></div>
  <div><?= htmlspecialchars($row['hp']) ?></div>
  <div><?= htmlspecialchars($row['attack']) ?></div>
  <div><?= htmlspecialchars($row['defense']) ?></div>
  <div><?= htmlspecialchars($row['special_attack']) ?></div>
  <div><?= htmlspecialchars($row['special_defense']) ?></div>
  <div><?= htmlspecialchars($row['speed']) ?></div>
<?php } ?>

