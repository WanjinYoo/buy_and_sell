$(() => {
  $.ajax({
    type: `GET`,
    url: `api/users/login`,
  })

    .then((data) => {
      $('#loginID').text('Hello\t' + data[`name`]);
    });
});
