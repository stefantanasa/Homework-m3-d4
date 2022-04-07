let books = [];
filteredBooks = [];

console.log(asinID);
const fetchData = () => {
  fetch("https://striveschool-api.herokuapp.com/books", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      books = data;
      console.log(data);
      renderBooks(books);
    });
};
// elements created
const added = document.createElement("span");
added.classList = "badge badge-primary";
added.innerText = "Added";
const cardItem = document.createElement("li");
cardItem.classList.add("list-group-item");
let countBadge = added.cloneNode(true);
let deleteAllItems = document.createElement("button");
deleteAllItems.classList.add("btn-danger");
deleteAllItems.innerText = "Emplty Cart";

// render funciton
let renderBooks = (arrayData) => {
  // clean the target
  rowBookList.innerHTML = "";
  //   loop through books
  arrayData.forEach((book) => {
    //   create new card for card
    let bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.style.cssText = "width: 12rem";
    bookCard.innerHTML = `
        <a href="details.html?asin=${book.asin}" > <img src=${book.img} class="card-img-top" alt="..."></a>
          <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Category: ${book.category}</p>
          <p class="card-text">Price: $${book.price}</p>
          <button class="btn btn-primary" onclick="handleAdd(event)" >Add </button>
          <button class="btn btn-primary" onclick="handleHideBook(event)">Skip</button>
          </div>
          `;

    //   append the card
    rowBookList.appendChild(bookCard);
  });
};

// handleres:
let handleClearCart = () => {
  addedBooks.innerHTML = "";
};
let handleAdd = (event) => {
  //   console.log(event.target.parentNode.firstChild.innerText);
  const toCard = event.target.closest(".card").cloneNode(true);
  event.target.classList = "btn btn-success";
  addedBooks.appendChild(toCard);
  addedBooks.prepend(countBadge);
  countBadge.innerText = addedBooks.children.length - 1;
};

let handleHideBook = (event) => {
  event.target.closest(".card").remove();
  addedBooks.prepend(countBadge);
  countBadge.innerText = addedBooks.children.length - 1;
};

let handleSearch = (event) => {
  console.log("ok", event.target.value);

  if (event.target.value.length >= 3) {
    console.log("Start filtering");

    filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    renderBooks(filteredBooks);
  } else {
    renderBooks(books);
  }
};
// get ing elements:
let searchBar = document.querySelector(".search-bar");
let addedBooks = document.querySelector(".added-books");
let rowBookList = document.querySelector(".list-books");

window.onload = () => {
  fetchData();
};
