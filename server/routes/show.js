const express = require('express');
const router = express.Router();
const request = require('request');
const { API_URL, API_KEY_URL } = require('../constants/index');

router.get('/indextv/discover/:tv_id/show', function(req, res) {
    const tv_id = req.params.tv_id;

    request(API_URL + `/tv/${tv_id}${API_KEY_URL}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('showtv', { data: data, tv_id: tv_id });
            }
        });
});


router.get('/index/discover/:movie_id/show', function(req, res) {
    const movie_id = req.params.movie_id;

    request(API_URL + `/movie/${movie_id}${API_KEY_URL}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('show', { data: data, movie_id: movie_id });
            }
        });
});

router.get('/watchlist', function(req, res) {
    res.render('watchlist');
});

module.exports = router;