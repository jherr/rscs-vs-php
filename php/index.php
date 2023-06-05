<?php
$jsonData = file_get_contents('http://localhost:8080/pokemon.json');
$pokemon = array_slice(json_decode($jsonData, true), 0, 20);
?>
<html>
  <body>
    <main class="p-5">
      <h1 class="text-3xl font-bold">Pokemon</h1>

      <input
        type="text"
        id="search"
        placeholder="Search"
        class="border border-gray-400 p-2 rounded-lg w-full mt-5 text-black"
      />

      <div class="grid grid-cols-[15%_25%_10%_10%_10%_10%_10%_10%] mt-3" id="table">
        <div class="font-bold">Name</div>
        <div class="font-bold">Type</div>
        <div class="font-bold">HP</div>
        <div class="font-bold">Attack</div>
        <div class="font-bold">Defense</div>
        <div class="font-bold">Sp. Attack</div>
        <div class="font-bold">Sp. Defense</div>
        <div class="font-bold">Speed</div>
        <?php foreach ($pokemon as $row) { ?>
          <div class="font-bold"><?= $row['name'] ?></div>
          <div><?= implode(', ', $row['type']) ?></div>
          <div><?= $row['hp'] ?></div>
          <div><?= $row['attack'] ?></div>
          <div><?= $row['defense'] ?></div>
          <div><?= $row['special_attack'] ?></div>
          <div><?= $row['special_defense'] ?></div>
          <div><?= $row['speed'] ?></div>
        <?php } ?>
      </div>
   </main>
   <script src="/jquery-3.7.0.min.js"></script>
   <script src="/app-vanilla.js"></script>
   <link rel="stylesheet" href="/tailwind.css" />
   <link rel="stylesheet" href="/global.css" />
  </body>
</html>