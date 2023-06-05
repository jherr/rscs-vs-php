$(document).ready(function () {
  $("#search").on("keyup", function () {
    const value = $(this).val();
    // $.getJSON(`search.php?search=${encodeURIComponent(value)}`, (pokemon) => {
    //   const tableElement = $("#table");
    //   tableElement.empty();

    //   tableElement.append(
    //     [
    //       "Name",
    //       "Type",
    //       "HP",
    //       "Attack",
    //       "Defense",
    //       "Sp. Attack",
    //       "Sp. Defense",
    //       "Speed",
    //     ]
    //       .map((col) => `<div class="font-bold">${col}</div>`)
    //       .join("")
    //   );

    //   for (const row of pokemon) {
    //     tableElement.append(
    //       $(`
    //       <div class="font-bold">${row.name}</div>
    //       <div>${row.type.join(", ")}</div>
    //       <div>${row.hp}</div>
    //       <div>${row.attack}</div>
    //       <div>${row.defense}</div>
    //       <div>${row.special_attack}</div>
    //       <div>${row.special_defense}</div>
    //       <div>${row.speed}</div>
    //       `)
    //     );
    //   }
    // });
    $.get(`search-html.php?search=${encodeURIComponent(value)}`, (newTable) => {
      const tableElement = $("#table");
      tableElement.html(newTable);
    });
  });
});
