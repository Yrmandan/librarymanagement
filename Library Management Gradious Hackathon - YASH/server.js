const express = require('express');
const db = require('./src/config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./src/routes/bookRoutes');
const authRoutes = require('./src/routes/authRoutes')
const session = require('express-session');
const authMiddleware = require('./src/middleware/auth');
require('dotenv').config();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}));
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.use('/books', authMiddleware, bookRoutes);
app.use('/auth',authRoutes)
app.get('/', (req, res) => {
    if(req.session.user){
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    else if(req.session.admin){
        res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
    }
    else{
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});
app.get('/login', (req, res) => {
    if(req.session.user){
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    else if(req.session.admin){
        res.sendFile(path.join(__dirname, 'public', 'admin-page.html'));
    }
    else{
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
})
app.get("/register",(req,res) => {
    if(req.session.user){
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    else if(req.session.admin){
        res.sendFile(path.join(__dirname, 'public', 'admin-page.html'));
    }
    else{
        res.sendFile(path.join(__dirname, 'public', 'register.html'));
    }
}
)
app.get("/admin",(req,res) => {
    if(req.session.user){
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    else if(req.session.admin){
        res.sendFile(path.join(__dirname, 'public', 'admin-page.html'));
    }
    else{
        res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
    }
}
)
app.get('/login.html', (req, res) => {
    res.status(403).send('Access denied');
});
app.get('/admin-login.html', (req, res) => {
    res.status(403).send('Access denied');
});
app.get('/admin-dashboard.html', (req, res) => {
    res.status(403).send('Access denied');
});
app.get('/register.html', (req, res) => {
    res.status(403).send('Access denied');
});
app.get('/index.html', (req, res) => {
    res.status(403).send('Access denied');
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
