const express = require('express');
const router = express.Router();
const request = require('request');
const imageList = require('../../imageConfig');
const { API_URL, MOVIE_GENRE_URL, TV_GENRE_URL } = require('../constants/index');

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/movie', (req, res) => {
    request(API_URL + MOVIE_GENRE_URL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const genreNames = JSON.parse(body);
            res.render('index', {
                genreNames: genreNames,
                type: 'movie',
                imageList: imageList
            });
        }
    });
});

router.get('/tv', (req, res) => {
    request(API_URL + TV_GENRE_URL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const genreNames = JSON.parse(body);
            res.render('index', {
                genreNames: genreNames,
                type: 'tv',
                imageList: imageList
            });
        }
    });
});

module.exports = router;