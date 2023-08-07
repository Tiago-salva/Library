//Get the necessary elements
const addBookBtn = document.getElementById("addBookBtn");
const submitBtn = document.getElementById("submitBtn");
const bookForm = document.getElementById("bookForm");
const overlay = document.getElementById("overlay");
const libraryContainer = document.querySelector(".library-container");
const formContainer = document.querySelector(".form-container");

//Array for the Books
let myLibrary = [];

//Objct constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

//Method to toggle the read status of the book
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};

//When you click the addBookBtn, the form appear
addBookBtn.addEventListener("click", () => {
    formContainer.classList.add("active");
    overlay.classList.add("active");
});

//When you click the overlay, the form disappear
overlay.addEventListener("click", () => {
    formContainer.classList.remove("active");
    overlay.classList.remove("active");
});

//Create a card for the book
const createCardBook = (userBook, index) => {
    //Create the internal elements
    const cardBook = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    //Assign the content for the elements
    title.textContent = `"${userBook.title}"`;
    author.textContent = userBook.author;
    pages.textContent = `${userBook.pages} pages`;
    readBtn.textContent = userBook.read ? "Read" : "Not read";
    removeBtn.textContent = "Remove";

    // Add data attribute to the card
    cardBook.setAttribute("data-index", index);

    // Assign the class for the readBtn based on userBook.read
    readBtn.classList.add(userBook.read ? "read" : "not-read");

    // Add an event listener to the readBtn to toggle the read status
    readBtn.addEventListener("click", () => {
        userBook.toggleReadStatus();
        readBtn.textContent = userBook.read ? "Read" : "Not read";
        readBtn.classList.toggle("read");
        readBtn.classList.toggle("not-read");
    });

    removeBtn.addEventListener("click", () => {
        const cardIndex = parseInt(cardBook.getAttribute("data-index"));
        if (cardIndex !== undefined && !isNaN(cardIndex)) {
            myLibrary.splice(cardIndex, 1);
            updateLibraryDisplay();
        }
    });


    cardBook.appendChild(title);
    cardBook.appendChild(author);
    cardBook.appendChild(pages);
    cardBook.appendChild(readBtn);
    cardBook.appendChild(removeBtn);

    libraryContainer.appendChild(cardBook);
}

//Get the value from the inputs
const getBookFromInput = () => {
    const title = document.getElementById("Title").value;
    const author = document.getElementById("Author").value;
    const pages = document.getElementById("Pages").value;
    const isRead = document.getElementById("isRead").checked;
    return new Book(title, author, pages, isRead);
}

//Function to check if the userBook is duplicated
function isTitleDuplicated(title) {
    const lowerCaseTitle = title.toLowerCase();
    for (let i = 0; i < myLibrary.length; i++) {
        if ((myLibrary[i].title).toLowerCase() === lowerCaseTitle) {
            return true
        }
    }
    return false
}

//Function to update the library display after modifying myLibrary
const updateLibraryDisplay = () => {
    libraryContainer.innerHTML = "";
    myLibrary.forEach((book, index) => {
        createCardBook(book, index);
    });
};

//Reset the value of the inputs after submit them
function resetFormInputs() {
    const inputs = document.querySelectorAll("#bookForm input");
    for (const input of inputs) {
        input.value = "";
    }
    const checkbox = document.getElementById("isRead");
    checkbox.checked = false;
}

//Get the userBook and add it to the Library
const addBookToLibrary = (e) => {
    e.preventDefault();
    const userBook = getBookFromInput();

    //If the book already exists, show an error message
    if (isTitleDuplicated(userBook.title)) {
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "block";
        setTimeout(function () {
            errorMessage.style.display = "none";
        }, 2000);
        return
    }

    formContainer.classList.remove("active");
    overlay.classList.remove("active");

    myLibrary.push(userBook);
    updateLibraryDisplay();

    resetFormInputs();
}

//When you submit the form, the book is added yo the library
bookForm.addEventListener("submit", addBookToLibrary);