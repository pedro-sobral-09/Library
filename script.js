const library = [];

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

function Book (title, author, pages, status){
    let id = crypto.randomUUID();
    return { title, author, pages, status, id };
}

function addBookToLibrary(book){
    library.push(book);
}

function initialBooks() {
    addBookToLibrary(new Book("Atomic Habits", "James Clear", 320, "Read"));
    addBookToLibrary(new Book("The Lean Startup", "Eric Ries", 336, "To read"));
    addBookToLibrary(new Book("Deep Work", "Cal Newport", 304, "Reading"));
    addBookToLibrary(new Book("Clean Code", "Robert C. Martin", 464, "To read"));
    addBookToLibrary(new Book("The Pragmatic Programmer", "Andrew Hunt and David Thomas", 352, "To read"));
    addBookToLibrary(new Book("Eloquent JavaScript", "Marijn Haverbeke", 472, "Reading"));
    addBookToLibrary(new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 336, "Read"));
    addBookToLibrary(new Book("The Psychology of Money", "Morgan Housel", 256, "To read"));
    addBookToLibrary(new Book("Dune", "Frank Herbert", 688, "Reading"));
    displayBooks();
}

function displayBooks(){
    let libraryUI = ``;

    for (let book of library){
        libraryUI += `<div class="book" data-id="${book.id}">
                            <h2 class="title">${book.title}</h2>
                            <p class="author">By ${book.author}</p>
                            <p class="pages">Pages: ${book.pages}</p>
                            <p class="status">Status: ${book.status}</p>
                            <button class="btn-edit">Edit</button>
                            <button class="btn-delete">Delete</button>
                        </div>`
    }

    libraryNode.innerHTML = libraryUI;
}

function setupDialogEvent(){
    btnAdd.addEventListener("click", () => {
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
    const bookEdit = findBookByID(editingBookID);
    const [title, author, pages, status] = getInputs();

    bookEdit.title = title.value;
    bookEdit.author = author.value;
    bookEdit.pages = pages.value;
    bookEdit.status = status.value;
}

function handleConfirmClick(){
    const [title, author, pages, status] = getInputs();
    
    // check if new book or editing
    if (editingBookID == null){
        addBookToLibrary(new Book(title.value, author.value, pages.value, status.value));
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
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleConfirmClick();
    });
}

function getBookIDFromButton(clickedButton){
    const bookCard = clickedButton.closest(".book");
    return bookCard.dataset.id;
}

function findBookByID(id){
    for (let book of library){
        if (book.id == id){
            return book;
        }
    }
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
    const bookEdit = findBookByID(editingBookID);
    updateForm(bookEdit);
    dialog.showModal();
}

function setupLibraryEvents(){
    libraryNode.addEventListener("click", (event)=> {
        const clickedButton = event.target;

        if (clickedButton.classList.contains("btn-edit")) {
            handleEditClick(clickedButton);
        }
    });
}

function setupButtons(){
    setupDialogEvent(); // make event for add button
    setupFormEvents(); // make events for confirm and close buttons
    setupLibraryEvents(); // make events for edit and delete
}

function main(){
    initialBooks();
    setupButtons();
}

main();

