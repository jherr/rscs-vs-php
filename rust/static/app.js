$(document).ready(function () {
  $("#search").on("keyup", function () {
    $.get(`search?q=${encodeURIComponent($(this).val())}`, (newTable) => {
      // Do not follow this example in production code, if the source of the data is not trusted.
      $("#table").html(newTable);
    });
  });
});
