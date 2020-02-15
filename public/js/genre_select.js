$(document).ready(function() {
  let $genreSelect = $("#genreSelect");
  let options = [];

  $.ajax({
    dataType: "json",
  })

  $genreSelect.html("<option value='1'>Test 1</option><option value='2'>Test 2</option><option value='3'>Test 3</option><option value='1'>Test 4</option><option value='1'>Test 5</option><option value='1'>Test 6</option>")

  $genreSelect.change(function(e) {
    var values = $(this).val();
    console.log(values);
  });
});
