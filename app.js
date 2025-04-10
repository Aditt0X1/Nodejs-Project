const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to MongoDB & listen for requests
const dbURI = 'mongodb+srv://aditto:test12345@simnode.j5dp4f5.mongodb.net/Simnode?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result => app.listen(3000)));

//register view engines
app.set('view engine', 'ejs');




//middleware & static
app.use(express.static('public'));
app.use(morgan('dev'));


//routees
app.get('/', (req, res) => {
 res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
     .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result});
     })
     .catch((err) => {
        console.log(err);
     })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
});

//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});



//this is a comment
