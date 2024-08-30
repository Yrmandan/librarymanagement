const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '',
    database: 'books_db'
});

module.exports = connection;
