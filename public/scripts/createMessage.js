// $(() => {

//   $(".message-button").click(event => {
//     event.preventDefault();
//     const userId = req.session[`userId`];
//     const message = $("#message-text").val();
//     const date = Date.now();    
//   });

  // helpers.checkAdmin(db, userId)
  //   .then(data => {
  //     const isAdmin = data.rows[0].is_admin;
  //     const userName = data.rows[0].name;
  //     helpers.getAllConversationsByUser(db, userId, isAdmin)
  //       .then(data => {
  //         const messages = data.rows;
  //         // const messageGroups = assembleMessageGroups(messages);
  //         // const templateVars = {groups: messageGroups, username: userName};
  //         // res.render('conversations', templateVars);
  //       })
  //       .catch(err => {
  //         res
  //           .status(500)
  //           .json({ error: err.message });
  //       });
  //   });
});