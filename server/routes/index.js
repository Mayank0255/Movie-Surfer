const express = require('express');
const router = express.Router();
const request = require('request');
const imageConfig = require('../../imageConfig');
const { API_URL, MOVIE_GENRE_URL, TV_GENRE_URL } = require('../constants/index');

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/index', (req, res) => {
    request(API_URL + MOVIE_GENRE_URL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const genreNames = JSON.parse(body);
            res.render('index', { genreNames: genreNames, type: 'movie', images: imageConfig.images });
        }
    });
});

router.get('/indextv', (req, res) => {
    request(API_URL + TV_GENRE_URL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const genreNames = JSON.parse(body);
            res.render('index', { genreNames: genreNames, type: 'tv', imagesTv: imageConfig.imagesTv });
        }
    });
});

module.exports = router;