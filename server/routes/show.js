const express = require('express');
const router = express.Router();
const request = require('request');

router.get("/indextv/discover/:tv_id/show", function(req, res) {
    const tv_id = req.params.tv_id;

    request("https://api.themoviedb.org/3/tv/" + tv_id + "?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("showtv", { data: data, tv_id: tv_id });
            }
        });
});


router.get("/index/discover/:movie_id/show", function(req, res) {
    const movie_id = req.params.movie_id;

    request("https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("show", { data: data, movie_id: movie_id });
            }
        });
});

router.get("/watchlist", function(req, res) {
    res.render("watchlist");
});

module.exports = router;