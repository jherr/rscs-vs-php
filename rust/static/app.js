$(document).ready(function () {
  $("#search").on("keyup", function () {
    $.get(`search?q=${encodeURIComponent($(this).val())}`, (newTable) => {
      $("#table").html(newTable);
    });
  });
});
