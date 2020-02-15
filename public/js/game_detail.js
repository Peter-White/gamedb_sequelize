$(document).ready(function(){
  const id = $(".container").attr("id");
  let $genres = $(".genres");
  let $genreSelect = $("#genreSelect");

  let gameGenreData = {};

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
        genreList += `<a class="btn btn-primary genre-link" href="/genres/${data.id}" role="button">${data.name}</a>`;
      }
    });
  });

  $genres.html(genreList);

  $.ajax({
    dataType: "json",
    url: `/api/game_genre?game_id=${id}`,
    async: false,
    success: function(data) {
      gameGenreData = data;
    }
  });
});
