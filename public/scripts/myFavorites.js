$(() => {
  $('#MyFavorites').click(() => {
    $.ajax({
      type: `GET`,
      dataType: 'json',
      url: `api/users/favourites`,
    })
      .then((data) => {
        const contents = JSON.stringify(data);
        $('#contents').text(contents);
      });
  });
});
