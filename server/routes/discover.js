const express = require('express');
const router = express.Router();
const request = require('request');
const { API_URL, API_KEY_URL } = require('../constants/index');

router.get('/index/discover/:genre_name/:genre_id/:page', function(req, res) {
    const genre_id = req.params.genre_id;
    const genre_name = req.params.genre_name;
    const page = req.params.page;
    request(API_URL + `/discover/movie${API_KEY_URL}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre_id}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('discover', { data: data, genre_name: genre_name, genre_id: genre_id, page: page });
            }
        });
});

router.get('/indextv/discover/:genre_name/:genre_id/:page', function(req, res) {
    const genre_id = req.params.genre_id;
    const genre_name = req.params.genre_name;
    const page = req.params.page;
    request(API_URL + `/discover/tv${API_KEY_URL}&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${genre_id}&include_null_first_air_dates=false`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('discovertv', { data: data, genre_name: genre_name, genre_id: genre_id, page: page });
            }
        });
});

// ====================================================== MOST POPULAR AND TOP RATED =====================================================

// MOST POPULAR MOVIES
router.get('/index/discover/pop/:page', function(req, res) {
    const page = req.params.page;
    request(API_URL + `/movie/popular${API_KEY_URL}&page=${page}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('popmovie', { data: data, page: page });
            }
        });
});

// TOP RATED MOVIES
router.get('/index/discover/top/:page', function(req, res) {
    const page = req.params.page;
    request(API_URL + `/movie/top_rated${API_KEY_URL}&page=${page}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('topmovie', { data: data, page: page });
            }
        });
});

// MOST POPULAR TV SHOWS

router.get('/indextv/discover/pop/:page', function(req, res) {
    const page = req.params.page;
    request(API_URL + `/tv/popular${API_KEY_URL}&page=${page}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('poptv', { data: data, page: page });
            }
        });
});

// TOP RATED TV SHOWS

router.get('/indextv/discover/top/:page', function(req, res) {
    const page = req.params.page;
    request(API_URL + `/tv/top_rated${API_KEY_URL}&page=${page}`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('toptv', { data: data, page: page });
            }
        });
});


// ======================================================= SEARCH PAGE ===================================================================

router.get('/index/search/:page', function(req, res) {
    const query = req.query.search;
    const page = req.params.page;
    request(API_URL + `/search/multi${API_KEY_URL}&query=${query}&page=${page}&include_adult=false`,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render('search', { data: data, query: query, page: page });
            }
        });
});

module.exports = router;