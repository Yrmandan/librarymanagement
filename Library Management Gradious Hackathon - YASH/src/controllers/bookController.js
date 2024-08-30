const db = require('../config/db');

exports.createBook = (req, res) => {
    const book = req.body;
    db.query('INSERT INTO books SET ?', book, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: `Book added with ID: ${result.insertId}` });
    });

};

exports.getBooks = (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
};

exports.getBookById = (req, res) => {
    db.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result[0]);
    });
};

exports.updateBook = (req, res) => {
    db.query('UPDATE books SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(`Book updated with ID: ${req.params.id}`);
    });
};

exports.deleteBook = (req, res) => {
    db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(`Book deleted with ID: ${req.params.id}`);
    });
};
