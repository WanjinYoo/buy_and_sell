// $(() => {
  
//   const createMessageLine = (message) => {
//     const date = message.date;
//     const from = message.from;
//     const body = message.message;
//     const $messageLine = $('<div>').attr('class', 'messageLIne');
//     const $messageDate = $('<span>').attr('class', 'message-date').attr('type', 'date').text(`${date}`);
//     const $messageFrom = $('<span>').attr('class', 'message-from').text(`${from}`);
//     const $messageBody = $('<span>').attr('class', 'message-body').text(`${body}`);
//     $messageLine.append($messageDate, $messageFrom, $messageBody);
//     $(".messages").append($messageLine);
//   };
           
//   const displayItemName = (item) => {
//     const $conversations = $('<div>').attr('class', 'conversations');
//     const $itemDiv =  $('<div>').attr('class', 'item-id');
//     const $itemName =  $('<p>').attr('class', 'item-name').text(`${item}`);
//     const $messagesDiv = $('<div>').attr('class', 'messages');
//     $('.container-section').append($conversations, $itemDiv, $itemName, $messagesDiv);
//   };

//   const renderConversations = (messages) => {
//     let currItem = '';
//     for (const message of messages) {
//       if (currItem !== message.item) {
//         currItem = message.item;
//         console.log(currItem);
//         displayItemName(currItem);
//         createMessageLine(message);
//       } else {
//         createMessageLine(message);
//       }
//     }
//   };

//   $('#conversations').click(() => {
//     $.ajax({
//       type: `GET`,
//       url: `api/users/login`,
//     })
//       .then((data) => {
//         $.ajax({
//           type: `GET`,
//           dataType: 'json',
//           url: `api/conversations/`,
//         })
//           .then((data) => {
//             $('.container-section').empty();
//             renderConversations(data);
//           });
//       });
//   });
// });
