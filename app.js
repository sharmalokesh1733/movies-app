const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require('./models/Movie');


mongoose.connect('mongodb://127.0.0.1:27017/moviesdb') // returns callback
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();


app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.urlencoded({ extended: true }))




app.get('/', (req, res) => {
    res.render('index');
})

app.get('/search', async(req, res) => {
    const { q } = req.query;
    const movie = await Movie.find({ name: { $regex: `^${q}` } });
    res.status(200).json(movie);
})


app.get('/new', (req, res) => {
    res.render('addMovie');
})

app.post('/', (req, res) => {
    const movie = req.body;
    // console.log(movie);
    let newMovie = {
        name: movie.name,
        date: Number(movie.year),
        rating: Number(movie.rating),
        isValid: false
    };

    if (Object.keys(movie).length === 4) {
        newMovie.isValid = true;
    }
    Movie.create(newMovie);

    res.redirect('/');
})



app.listen(4000, () => {
    console.log('server is running on port 4000');
})