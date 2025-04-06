const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engines
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

//middleware & static
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {

    const blogs = [
        {title:"How to Create Friends", snippet:'Lorem ipsum dolor sit amet consectetur'},
        {title:"Why Hacking is really fun!", snippet:'Lorem ipsum dolor sit amet consectetur'},
        {title:"I am on some dope Sh*t!", snippet:'Lorem ipsum dolor sit amet consectetur'},
    ];

    //res.send('<p>Hello World!</p>');
    //res.sendFile('./views/index.html', {root: __dirname});
    res.render('index', {title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
});

//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});



//this is a comment
