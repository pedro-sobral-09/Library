const library = [];

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
}

function main(){
    initialBooks();  
}

main();

