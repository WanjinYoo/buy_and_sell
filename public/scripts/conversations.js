$(() => {

  $('#conversations').click(() => {
    $.ajax({
      type: `GET`,
      dataType: 'json',
      url: `api/conversations/`,
    })
      .then((data) => {
        const contents = JSON.stringify(data);
        $('#contents').text(contents);
      });
  });

});
