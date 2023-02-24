const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        maxLength: 25
    },
    date: {
        type: Number,
        required: true,
        maxLength: 4
    },
    rating: {
        type: Number,
        required: [true, 'you need to provide rating'],
        min: 1,
        max: 10
    },
    isValid: {
        type: Boolean,
        default: false
    }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;