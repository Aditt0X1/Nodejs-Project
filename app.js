const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');
const { result } = require('lodash');

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
app.use(express.urlencoded({extended: true}));
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

//POST req handler
app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);

    blog.save(req.body)
      .then((result) => {
        res.redirect('/blogs');
      })
     .catch((err) => {
        console.log(err);
     })  
});

app.get('/blogs/:id', (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return next(); // skip to 404
  Blog.findById(id)
    .then(result => {
      if (!result) return res.status(404).render('404', { title: '404' });
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('500', { title: 'Error' });
    });
});

app.delete('/blogs/:id', (req,res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => {
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



//this is a comments
