$(document).ready(function(){
  let $game_form = $(".game_form");
  let $genre = $('input[name=name]');
  let $genres = $("table").DataTable();
  let $form_contatiner = $(".form_contatiner");

  $(".form-toggle").click(function(e) {
    e.preventDefault();
    console.log($genres);

    if($form_contatiner.hasClass("hide")) {
      $form_contatiner.removeClass("hide");
      $form_contatiner.addClass("show");
      $(this).html("Hide")
    } else {
      $form_contatiner.removeClass("show");
      $form_contatiner.addClass("hide");
      $(this).html("Show")
    }
  });

  $game_form.submit(function(e) {
    e.preventDefault();
    const name = $genre.val();

    if(name === "") {
      alert("Cannot have an empty name field")
    } else {
      $.ajax({
        type: "POST",
        url: "/api/genre",
        async: false,
        headers: {
          name: name
        },
        success: function(data) {
          $genres.row.add([`<a href='genres/${data.id}'>${data.name}</a>`]).draw();
          $genre.val("");
        },
        fail: function(data) {
          alert("Genre not posted");
        },
        dataType: "json"
      });
    }
  });
});
