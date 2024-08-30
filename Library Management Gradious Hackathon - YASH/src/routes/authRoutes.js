const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();
router.post('/admin', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        req.session.admin = { username: 'admin' };
        return res.status(201).send("Admin login Successfull")
    }

    return res.status(401).send('Invalid admin credentials');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send("Hashing of password failed!!")
        }
        db.query('INSERT INTO users (username,password) VALUES(?,?)', [username, hash], (err, results) => {
            if (err) {
                return res.status(500).send("Error registering user")
            }
            return res.status(201).send("Registration successfully")
        })
    })
})
router.post('/login', (req, res) => {
    const { username, password } = req.body
    db.query('SELECT * FROM users WHERE username=?', [username], (err, result) => {
        if (err) {
            return res.status(500).send('Login error')
        }
        if (result.length === 0) {
            return res.status(401).send('Invalid User')
        }
        const user = result[0]
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).send('Error while comparing password')

            }
            if (match) {
                req.session.user = user
                return res.status(200).send("Login successful")
            }
            return res.status(401).send('Invalid Credentials')
        })
    })
})
router.post("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send('Error logging out')
        }
        return res.send('Logout Succesfull')
    })
})

module.exports = router;