class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id){
        this.books = this.books.filter((book) => book.id !== id);
    }

    findBook(id) {
        for (let book of library) {
            if (book.id == id) {
                return book;
            }
        }
    }
}

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = crypto.randomUUID();
    }

    updateBook(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    updateStatus() {
        if (this.status === "To read"){
            this.status = "Reading";
        } else if (this.status === "Reading"){
            this.status = "Read";
        }
    }

    get isCompleted(){
        return this.status === "Read";
    }

    createHTML(){
        return `<div class="book" data-id="${this.id}">
                    <h2 class="title">${this.title}</h2>
                    <p class="author">By ${this.author}</p>
                    <p class="pages">Pages: ${this.pages}</p>
                    <button class="status" ${this.isCompleted ? "disabled" : ""}>${this.status}</button>
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </div>`;
    }
}

const library = new Library();

// variables of screen
let libraryNode = document.querySelector("#library");
const dialog = document.querySelector("#dialog-books");
const form = document.querySelector("#form-dialog");

// control variable
let editingBookID = null;

// variables of buttons
const btnAdd = document.querySelector("#btn-add");
const btnClose = document.querySelector("#btn-close");
const btnConfirm = document.querySelector("#btn-confirm");

function initialBooks() {
    library.addBook(new Book("Atomic Habits", "James Clear", 320, "Read"));
    library.addBook(new Book("The Lean Startup", "Eric Ries", 336, "To read"));
    library.addBook(new Book("Deep Work", "Cal Newport", 304, "Reading"));
    library.addBook(new Book("Clean Code", "Robert C. Martin", 464, "To read"));
    library.addBook(new Book("The Pragmatic Programmer", "Andrew Hunt and David Thomas", 352, "To read"));
    library.addBook(new Book("Eloquent JavaScript", "Marijn Haverbeke", 472, "Reading"));
    library.addBook(new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 336, "Read"));
    library.addBook(new Book("The Psychology of Money", "Morgan Housel", 256, "To read"));
    library.addBook(new Book("Dune", "Frank Herbert", 688, "Reading"));
    displayBooks();
}

function displayBooks(){
    let libraryUI = ``;

    for (let book of library.books){
        libraryUI += book.createHTML();
    }

    libraryNode.innerHTML = libraryUI;
}

function setupDialogEvent(){
    btnAdd.addEventListener("click", () => {
        // Reset editingBookID to null to indicate we're adding a new book, not editing an existing one
        editingBookID = null;

        dialog.showModal();
    });
}

function getInputs(){
    const title = document.querySelector("#input-title");
    const author = document.querySelector("#input-author");
    const pages = document.querySelector("#input-pages");
    const status = document.querySelector("#input-status");
    return [title, author, pages, status];
}

function editingTheBook() {
    // editing the book
    const bookEdit = library.findBook(editingBookID);
    const [title, author, pages, status] = getInputs();

    bookEdit.updateBook(title.value, author.value, pages.value, status.value);

    // reset editingBookID
    editingBookID = null;
}

function handleConfirmClick(){
    const [title, author, pages, status] = getInputs();
    
    // check if new book or editing | if it is a new book, editingBookID will be null
    if (editingBookID == null){
        library.addBook(new Book(title.value, author.value, pages.value, status.value));
        displayBooks();
        btnClose.click();
    } else {
        editingTheBook();
        displayBooks();
        btnClose.click();
    }
}

function setupFormEvents(){
    btnClose.addEventListener("click", () => {
        form.reset();
        dialog.close();
    });

    // confirm button event
    form.addEventListener("submit", (event) => {
        // does not let the form submit
        event.preventDefault();
        handleConfirmClick();
    });
}

function getBookIDFromButton(clickedButton){
    const bookCard = clickedButton.closest(".book");
    return bookCard.dataset.id;
}

function updateForm(book){
    const [title, author, pages, status] = getInputs();
    
    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;
    status.value = book.status;
}

function handleEditClick(clickedButton){
    editingBookID = getBookIDFromButton(clickedButton);
    const bookEdit = library.findBook(editingBookID);
    updateForm(bookEdit);
    dialog.showModal();
}

function handleDeleteClick(clickedButton){
    library.removeBook(getBookIDFromButton(clickedButton));
    displayBooks();
}

function handleStatusClick(clickedButton){
    const bookEdit = library.findBook(getBookIDFromButton(clickedButton));
    bookEdit.updateStatus();
    displayBooks();
}

function setupLibraryEvents(){
    libraryNode.addEventListener("click", (event)=> {
        const clickedButton = event.target;

        if (clickedButton.classList.contains("btn-edit")) {
            handleEditClick(clickedButton);
        }

        if (clickedButton.classList.contains("btn-delete")) {
            handleDeleteClick(clickedButton);
        }

        if (clickedButton.classList.contains("status")) {
            handleStatusClick(clickedButton);
        }
    });
}

function setupButtons(){
    setupDialogEvent(); // make event for add button
    setupFormEvents(); // make events for confirm and close buttons
    setupLibraryEvents(); // make events for edit, delete and status buttons
}

function main(){
    initialBooks();
    setupButtons();
}

main();

