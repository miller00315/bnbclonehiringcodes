const API_URL = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
const LIMIT = 3;

let items = [];
let actual_page = 1;
let total_pages;

fetch(API_URL)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    items = data;

    results = listItems(data, actual_page, LIMIT);

    pagination(Math.ceil(items.length / 3));

    renderItems(results);
  });

function renderItems(results) {
  let rooms = document.getElementById('results');

  rooms.innerHTML = '';

  results.forEach((item) => {
    let roomDiv = document.createElement('div');

    roomDiv.classList.add('col-m-4', 'col-lg-4');

    let internalDiv = document.createElement('div');
    internalDiv.classList.add('card', 'col-12');

    let image = document.createElement('img');

    image.className = 'card-img-top';
    image.src = item.photo;

    internalDiv.appendChild(image);

    let cardHeader = document.createElement('h5');
    cardHeader.className = 'card-title';
    cardHeader.innerHTML = item.name;

    internalDiv.appendChild(cardHeader);

    let cardType = document.createElement('h6');
    cardType.className = 'card-type';
    cardType.innerHTML = `Tipo de moradia: ${item.property_type}`;

    internalDiv.appendChild(cardType);

    let cardPrice = document.createElement('h6');
    cardPrice.className = 'card-type';
    cardPrice.innerHTML = `Valor diária: R$ ${item.price.toFixed(2)}`;

    internalDiv.appendChild(cardPrice);

    roomDiv.appendChild(internalDiv);

    rooms.appendChild(roomDiv);
  });
}

function pagination(totalPages) {
  let pages = document.getElementById('pagination');

  for (i = 0; i < totalPages; i++) {
    let listItem = document.createElement('li');
    listItem.classList.add('page-item');

    let pageButton = document.createElement('button');
    pageButton.classList.add('page-link');
    pageButton.appendChild(document.createTextNode(i + 1));

    pageButton.setAttribute('onCLick', `updatePage(${i + 1})`);

    listItem.appendChild(pageButton);

    pages.appendChild(listItem);
  }
}

function updatePage(page) {
  let results = listItems(items, page, LIMIT);

  renderItems(results);
}

function listItems(items, pageActual, limitItems) {
  let result = [];
  let totalPage = Math.ceil(items.length / limitItems);
  let count = pageActual * limitItems - limitItems;
  let delimiter = count + limitItems;

  if (pageActual <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      if (items[i] != null) {
        result.push(items[i]);
      }
      count++;
    }
  }

  return result;
}

function loadMore() {}
