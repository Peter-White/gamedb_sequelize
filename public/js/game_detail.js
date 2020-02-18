$(document).ready(function(){
  const id = $(".container").attr("id");
  let $genres = $(".genres");
  let $genreSelect = $("#genreSelect");

  let genreData = {};
  let gameGenreData = {};

  $.ajax({
    dataType: "json",
    url: `/api/genre`,
    async: false,
    success: function(data) {
      genreData = data;
    }
  });

  $.ajax({
    dataType: "json",
    url: `/api/game_genre?game_id=${id}`,
    async: false,
    success: function(data) {
      gameGenreData = data;
    }
  });

  let genreList = "";

  gameGenreData.forEach(function(genre) {
    $.ajax({
      dataType: "json",
      url: `/api/genre/${genre.genre_id}`,
      async: false,
      success: function(data) {

      }
    });
  });

  $genres.html(genreList);
});
