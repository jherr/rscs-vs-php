document.getElementById("search").addEventListener("keyup", function () {
  const value = this.value;
  const tableElement = document.getElementById("table");
  fetch(`search-html.php?search=${encodeURIComponent(value)}`)
    .then((response) => response.text())
    .then((newTable) => {
      tableElement.innerHTML = newTable;
    });
});
