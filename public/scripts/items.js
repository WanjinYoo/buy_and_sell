$(() => {
  const createItemElement = (item, isAdmin, itemsArray) => {
    let $item = `

    <li class="list-group-item d-flex border border-secondary">
          <div style="width: 23%;">
          <img class="ml-3" style="width: 50%; object-fit: fill;" src="${item.thumbnail_photo_url}">
          <a href='/items/${item.id}'>
            <h6 class= "mr-5 text-center"> ${item.title} </h6>
          </a>
          </div>
          <div class = "d-flex flex-column justify-content-around" style="width: 70%;">
          <h5 class="title"> ${item.description} ... </h5>
        <div class="test border border-secondary mt-5 pb-2">
        `
    if (!isAdmin) {
      if (itemsArray.includes(item.id)) {
        $item += `
          <div class="fav">
            <button class="fav-btn favourited" data-id=${item.id}>
              Favourite
            </button>
          </div>
        `
      } else {
        $item += `
        <div class="fav">
          <button class="fav-btn" data-id=${item.id}>
            Favourite
          </button>
        </div>
        `
      }
    }
    $item += `
              <h6 class = "mt-3"> ${getDate(item.date_listed)}</h6>
              <h6 class = "mt-3">Price: $${item.price}</h6>
              <div class="like-container">
              <img class="like-img" style="width: 25px;" src="https://www.flaticon.com/svg/static/icons/svg/1029/1029132.svg" alt="">
              <h6 class = "mt-3">Likes: ${item.number_of_likes}</h6>
              </div>
            </div>
              `
    if (isAdmin) {
      $item += `
      <div class = "d-flex flex-column justify-content-space">
        <form action="/items/${item.id}/delete", method="POST">
          <button class="btn btn-outline-danger" type="submit">
            Delete
          </button>
        </form>

        <form action="/items/${item.id}/sold", method="POST">
          <button class="btn btn-outline-success" type="submit">
            Mark As Sold
          </button>
        </form>
      </div>
    </div>
    `
    }
    $item += `

</li>
    `
    $(".list-group").append($item);
  };


  const getDate = milliseconds => {
    const datePosted = new Date(milliseconds);
    const dateNow = new Date().getTime();
    const time = Math.abs(dateNow - datePosted);
    let sum;
    if (time < 1000 * 60) {
      sum = Math.floor(time / (1000));
      unit = "S";
    } else if (time < 1000 * 60 * 60) {
      sum = Math.floor(time / (1000 * 60));
      unit = "m";
    } else if (time < 1000 * 60 * 60 * 60) {
      sum = Math.floor(time / (1000 * 60 * 60));
      unit = "h";
    } else {
      sum = Math.floor(time / (1000 * 60 * 60 * 60));
      unit = "d";
    }
    return `${sum} ${unit}`;
  };

  const renderItems = (itemData, isAdmin, itemArray) => {
    for (const item of itemData) {
      createItemElement(item, isAdmin, itemArray)
    }
  };








  $('#price-filter').submit(function (event) {
    event.preventDefault()
    $.ajax({
      method: "POST",
      url: "/items/priceFilter",
      data: $(this).serialize()
    })
    .then(function (data) {
      $(".list-group").empty();
      renderItems(data.items, data.isAdmin, data.itemsArray);
    })
  });

  $('.list-group').on("click", ".fav-btn", function (event) {
    const data = {itemId: event.target.dataset.id}
    console.log(data);
    $.ajax({
      method: "POST",
      url: "/items/ajaxFavs",
      data
    })
    .then(function (data) {
      loadItems();
    })
    .catch(function (error) {
      console.log("Submit error", error);
    })
  });

  const loadItems = function () {
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
      method: "GET",
      url: "/items/data",
      data: {sort: urlParams.get("sort")}
    })
      .then(function (data) {
        $(".list-group").empty();
        renderItems(data.items, data.isAdmin, data.itemsArray);
        })
      .catch(function (error) {
        console.log("Load Tweets error", error);
      });
  }
  loadItems();
});

