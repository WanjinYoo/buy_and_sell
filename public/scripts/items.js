$(() => {



  $(".ajaxTest").click(function (event) {

    // console.log(event.target.id);

    const id = event.target.id
    $.ajax({
      method: "POST",
      url: `/items/favs/${id}`,
    })
      .then(function(data) {

      })
      .catch(function(error) {
        console.log("Submit error", error);
      });
  });

});
