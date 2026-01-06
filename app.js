const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const seasonRouter = require('./src/routes/seasonRouter');
const adminRouter = require('./src/routes/adminRouter');

const app = express();

const dbURI = 'mongodb://localhost:27017/twdg_db';

mongoose.connect(dbURI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error('Database connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'src/images')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/about', (req, res) => {
    res.render('pages/about', { 
        title: 'About the Project'
    });
});

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/', seasonRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
    res.status(404).render('pages/404', { 
        title: '404 - Page Not Found',
        url: req.url
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', { 
        title: 'Error',
        error: { message: 'An internal server error occurred' }
    });
});

module.exports = app;