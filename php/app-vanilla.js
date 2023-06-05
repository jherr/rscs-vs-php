// Original video code:

// document.getElementById("search").addEventListener("keyup", function () {
//   const value = this.value;
//   const tableElement = document.getElementById("table");
//   fetch(`search-html.php?search=${encodeURIComponent(value)}`)
//     .then((response) => response.text())
//     .then((newTable) => {
//       // Do not follow this example in production code, if the source of the data is not trusted.
//       tableElement.innerHTML = newTable;
//     });
// });

// New code that has the same security profile as React:

const createTextNode = (text, className) => {
  const node = document.createElement("div");
  node.textContent = text;
  if (className) {
    node.classList.add(className);
  }
  return node;
};
document.getElementById("search").addEventListener("keyup", function () {
  const value = this.value;
  const tableElement = document.getElementById("table");
  fetch(`search.php?search=${encodeURIComponent(value)}`)
    .then((response) => response.json())
    .then((pokemon) => {
      while (tableElement.firstChild) {
        tableElement.removeChild(tableElement.firstChild);
      }
      tableElement.append(
        ...[
          "Name",
          "Type",
          "HP",
          "Attack",
          "Defense",
          "Sp. Attack",
          "Sp. Defense",
          "Speed",
        ].map((col) => createTextNode(col, "font-bold"))
      );

      for (const row of pokemon) {
        tableElement.append(
          createTextNode(row.name, "font-bold"),
          createTextNode(row.type.join(", ")),
          createTextNode(row.hp),
          createTextNode(row.attack),
          createTextNode(row.defense),
          createTextNode(row.special_attack),
          createTextNode(row.special_defense),
          createTextNode(row.speed)
        );
      }
    });
});
