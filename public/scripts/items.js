$(() => {

  // const createItemElement = (itemData) => {
  //   const $item = $(`
  //   <div class="item-border">
  //   <div class="inner-content">
  //     <div class="middle">
  //       <h6>${itemData.title}</h6>
  //     </div>
  //     <img style="width: 15%;" src=${itemData.thumbnail_photo_url} alt="">
  //     <div class="right">
  //       <h6>$${itemData.price}</h6>
  //       <h6>city?</h6>
  //       <h6>${itemData.date_listed}</h6>
  //     </div>
  //   </div>
  //   <div class="description">
  //     <h6>${itemData.description}</h6>
  //   </div>
  // </div>
  //   `);
  //   $('.container-section').append($item)
  // };

  // const renderItems = (itemData) => {
  //   for (const item of itemData.items) {
  //     createItemElement(item)
  //     console.log(item);
  //   }
  // };


  // $('#items').click(() => {
  //   $.ajax({
  //     type: `GET`,
  //     dataType: 'json',
  //     url: `api/items`,
  //   })
  //     .then((data) => {
  //       $(".container-section").empty();
  //       $("#contents").empty();
  //       renderItems(data)
  //       // $('#contents').text(contents);
  //     });
  // });
});
