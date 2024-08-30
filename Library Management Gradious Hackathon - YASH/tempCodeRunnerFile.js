const express = require('express');
const path = require('path');
const db = require("./src/config/db")
const app = express();
const port = 3000;


db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});