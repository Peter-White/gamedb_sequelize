$(document).ready(function(){
  let $game_form = $(".game_form");
  let $games = $("table").DataTable();
  let $form_contatiner = $(".form_contatiner");

  $game_form.submit(function(e) {
    e.preventDefault();

    const $title = $("input[name=title]");
    const $description = $("textarea[name=description]");
    const $mode = $("#mode");
    const $rating = $("#rating");
    const $released = $("#date-input");
    const $cover = $("input[name=cover]");

    let headers = {};

    if($title.val()) {
      headers.title = $title.val();
    } else {
      headers.error = "title required";
    }

    if($description.val()) {
      headers.description = $description.val();
    } else {
      headers.error = "description required";
    }

    if($mode.val()) {
      headers.mode = $mode.val();
    } else {
      headers.error = "mode required";
    }

    if($rating.val()) {
      headers.rating = $rating.val();
    } else {
      headers.error = "rating required";
    }

    if($released.val()) {
      headers.released = $released.val();
    } else {
      headers.error = "released required";
    }

    if($cover.val()) {
      headers.cover = $cover.val();
    } else {
      headers.error = "cover required";
    }

    if(headers.error) {
      console.log(headers.error);
    } else {
      $.ajax({
        type: "POST",
        url: "/api/game",
        async: false,
        headers: headers,
        success: function(data) {
          console.log(data);
          // $games.row.add([`<a href='games/${data.id}'>${data.name}</a>`, data.released]).draw();
          // $title.val("");
          // $description.val("");
          // $released.val("");
          // $cover.val("");
        },
        fail: function(data) {
          alert("Game not posted");
        },
        dataType: "json"
      });
    }
  });
});
