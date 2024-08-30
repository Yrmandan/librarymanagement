Library management system

Step 1: Intall all dependencies
```
npm i
```
Step 2: Change ./src/config/db.js as per your sql database
```
const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user', //your username
    password: '', //your password
    database: 'books_db' //your database
});

module.exports = connection;
```
Step 3: Add your secret key in .env file
```
SECRET_KEY="YOUR_SECRET_KEY"
```
Step 4: Add data in data base the sql queries are in mysql.txt

Step 5: Start server
```
node server.js
```
```
Admin username : admin
Admin password: admin
