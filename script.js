// 1. Array of 15 Books
let books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { title: "1984", author: "George Orwell", year: 1949 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
    { title: "Moby Dick", author: "Herman Melville", year: 1851 },
    { title: "War and Peace", author: "Leo Tolstoy", year: 1869 },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866 },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
    { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
    { title: "The Diary of a Young Girl", author: "Anne Frank", year: 1947 },
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry", year: 1943 },
    { title: "Jane Eyre", author: "Charlotte Brontë", year: 1847 }
];

const bookListDiv = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const yearInput = document.getElementById("yearInput");
const addBtn = document.getElementById("addBtn");
const bookCountSpan = document.getElementById("bookCount");

// Function to Display Books using .forEach()
function displayBooks(booksArray) {
    bookListDiv.innerHTML = "";
    
    // Bonus: Update total count using .length
    bookCountSpan.textContent = booksArray.length;

    if (booksArray.length === 0) {
        bookListDiv.innerHTML = "<p>No books found.</p>";
        return;
    }

    booksArray.forEach((book, index) => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-item";
        bookDiv.innerHTML = `
            <span><strong>${book.title}</strong> by ${book.author} (${book.year})</span>
            <button onclick="removeBook('${book.title}')">Remove</button>
        `;
        bookListDiv.appendChild(bookDiv);
    });
}

// 2. Search Function using .filter()
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

// 3. Sort Function using .sort()
sortSelect.addEventListener("change", (e) => {
    const sortValue = e.target.value;
    // Create a copy of array to avoid mutating original directly during sort
    let sortedBooks = [...books]; 

    if (sortValue === "az") {
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "za") {
        sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayBooks(sortedBooks);
});

// 4. Add Book using .unshift()
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value.trim();

    if (title === "" || author === "" || year === "") {
        alert("Please fill all fields!");
        return;
    }

    const newBook = { title, author, year: Number(year) };
    books.unshift(newBook); // Adds to the top of the array

    displayBooks(books);

    // Clear inputs
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
});

// 5. Remove Book using .filter()
function removeBook(titleToRemove) {
    books = books.filter(book => book.title !== titleToRemove);
    displayBooks(books);
}

// Initial display call
displayBooks(books);