const express = require('express');
const router = express.Router();
const request = require('request');
const imageConfig = require('../../imageConfig');
const { API_URL, MOVIE_GENRE_URL, TV_GENRE_URL } = require('../constants/index');

router.get('/', function(req, res) {
    res.render('landing');
});

router.get('/index', function(req, res) {
    request(API_URL + MOVIE_GENRE_URL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const genreNames = JSON.parse(body);
            res.render('index', { genreNames: genreNames, images: imageConfig.images });
        }
    });
});

router.get('/indextv', function(req, res) {
    request(API_URL + TV_GENRE_URL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const genreNames = JSON.parse(body);
            res.render('indextv', { genreNames: genreNames, imagesTv: imageConfig.imagesTv });
        }
    });
});

module.exports = router;