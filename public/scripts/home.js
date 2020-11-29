$(() => {

  $.ajax({
    type: `GET`,
    dataType: 'json',
    url: `api/users/`,
  })
    .then((data) => {
      const contents = JSON.stringify(data);
      $('#contents').text(contents);
    });








});
