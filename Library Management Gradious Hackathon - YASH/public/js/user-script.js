const apiUrl = 'http://localhost:5000/books';


document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('closePreviewModalBtn').addEventListener('click', closePreviewModal);
document.getElementById('logoutBtn').addEventListener('click', function() {
    fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Logout successfull')
            window.location.href = '/';
        } else {
            console.error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const bookId = document.getElementById('bookId').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        publication_year: parseInt(document.getElementById('publication_year').value),
        language: document.getElementById('language').value,
        price: parseFloat(document.getElementById('price').value),
        isbn: document.getElementById('isbn').value,
        publisher: document.getElementById('publisher').value,
        rating: parseFloat(document.getElementById('rating').value)
    };

    if (bookId) {
        updateBook(bookId, bookData);
    } else {
        addBook(bookData);
    }
});

function showModal() {
    document.getElementById('bookModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('bookModal').classList.add('hidden');
    clearForm();
}

function closePreviewModal() {
    document.getElementById('previewModal').classList.add('hidden');
}

function addBook(book) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        closeModal();
        fetchBooks();
    })
    .catch(error => console.error('Error:', error));
}


function fetchBooks() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(books => {
        const booksList = document.getElementById('booksList');
        booksList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="book-details">
                <span>${book.title}</span>
                <span class="book-author">${book.author}</span>
                </div>
                <div>
                <button class="preview-btn" onclick="previewBook(${book.id})">Preview</button>
                </div

            `;
            booksList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteBook(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchBooks();
    })
    .catch(error => console.error('Error:', error));
}

function editBook(id) {
    fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(book => {
        document.getElementById('bookId').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('genre').value = book.genre;
        document.getElementById('publication_year').value = book.publication_year;
        document.getElementById('language').value = book.language;
        document.getElementById('price').value = book.price;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('rating').value = book.rating;
        showModal(); 
        
    })
    .catch(error => console.error('Error:', error));
}

function updateBook(id, book) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        closeModal();
        fetchBooks();
    })
    .catch(error => console.error('Error:', error));
}

function previewBook(id) {
    fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(book => {
        const bookDetails = document.getElementById('bookDetails');
        bookDetails.innerHTML = `
            <strong>Title:</strong> ${book.title}<br>
            <strong>Author:</strong> ${book.author}<br>
            <strong>Genre:</strong> ${book.genre}<br>
            <strong>Publication Year:</strong> ${book.publication_year}<br>
            <strong>Language:</strong> ${book.language}<br>
            <strong>Price:</strong>  ₹${book.price}<br>
            <strong>ISBN:</strong> ${book.isbn}<br>
            <strong>Publisher:</strong> ${book.publisher}<br>
            <strong>Rating:</strong> ${book.rating}
        `;
        document.getElementById('previewModal').classList.remove('hidden');
    })
    .catch(error => console.error('Error:', error));
}

function clearForm() {
    document.getElementById('bookId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('publication_year').value = '';
    document.getElementById('language').value = '';
    document.getElementById('price').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('publisher').value = '';
    document.getElementById('rating').value = '';
}

document.addEventListener('DOMContentLoaded', fetchBooks);
