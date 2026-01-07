// Library functionality
let currentBooks = [...books];

function renderBooks() {
    const shelvesContainer = document.getElementById('shelves');
    shelvesContainer.innerHTML = '';

    // Create shelves (roughly 8 books per shelf)
    const booksPerShelf = 8;
    const numShelves = Math.ceil(currentBooks.length / booksPerShelf);

    for (let i = 0; i < numShelves; i++) {
        const shelf = document.createElement('div');
        shelf.className = 'bookshelf';
        
        const startIdx = i * booksPerShelf;
        const endIdx = Math.min(startIdx + booksPerShelf, currentBooks.length);
        
        for (let j = startIdx; j < endIdx; j++) {
            const book = currentBooks[j];
            const bookEl = document.createElement('div');
            bookEl.className = 'book';
            bookEl.style.backgroundColor = book.color;
            bookEl.style.height = book.height + 'px';
            bookEl.style.width = book.width + 'px';
            
            bookEl.innerHTML = `
                <div class="book-spine">${book.title}</div>
                <div class="book-tooltip">${book.title}<br>${book.author}</div>
            `;
            
            bookEl.onclick = () => openModal(book);
            shelf.appendChild(bookEl);
        }
        
        shelvesContainer.appendChild(shelf);
    }
}

function openModal(book) {
    document.getElementById('modal-title').textContent = book.title;
    document.getElementById('modal-author').textContent = book.author;
    document.getElementById('modal-edition').textContent = book.edition;
    document.getElementById('modal-year').textContent = book.year;
    document.getElementById('modal-annotations').textContent = book.annotations;
    document.getElementById('book-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('book-modal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('book-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Sorting
document.getElementById('sort-select').addEventListener('change', function(e) {
    const sortType = e.target.value;
    
    switch(sortType) {
        case 'title':
            currentBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'author':
            currentBooks.sort((a, b) => a.author.localeCompare(b.author));
            break;
        case 'year':
            currentBooks.sort((a, b) => b.year - a.year);
            break;
        case 'year-old':
            currentBooks.sort((a, b) => a.year - b.year);
            break;
        case 'random':
            currentBooks.sort(() => Math.random() - 0.5);
            break;
    }
    
    renderBooks();
});

// Initial render
renderBooks();
