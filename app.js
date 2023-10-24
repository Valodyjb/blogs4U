const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routing/blogRoutes');



//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://netninja:Abcde123456!@blogs4u.tprynsn.mongodb.net/Blogs4U_DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000)) //listen to request after connection to db has been established
    .catch((err)=> console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //pass url into an object to be used with req.body
app.use(morgan('dev'));
app.use((req, res, next)=> {
    res.locals.path = req.path;
    next();
});

//routes
app.get('/', (req, res)=> {
    res.redirect('/blogs');
});

app.get('/about', (req, res)=> {
    res.render('about', {title: 'About US'});
});

//blog routes
app.use('/blogs', blogRoutes);

// 404 page \will happen if no matches found (will also happen if put first, so make sure it is last.)
app.use((req, res)=> {
    res.status(404).render('404', {title: 'Not found'})
});
