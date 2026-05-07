const library = [];

let libraryNode = document.querySelector("#library");

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
                            <button id="btn-edit">Edit</button>
                            <button id="btn-delete">Delete</button>
                        </div>`
    }

    libraryNode.innerHTML = libraryUI;
}

function main(){
    initialBooks();
}

main();

