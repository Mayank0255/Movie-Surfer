const express = require('express');
const router = express.Router();
const request = require('request');
const imageConfig = require("../../imageConfig");

router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/index", function(req, res) {
    request("https://api.themoviedb.org/3/genre/movie/list?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const genreNames = JSON.parse(body);
            res.render("index", { genreNames: genreNames, images: imageConfig.images });
        }
    });
});

router.get("/indextv", function(req, res) {
    request("https://api.themoviedb.org/3/genre/tv/list?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const genreNames = JSON.parse(body);
            res.render("indextv", { genreNames: genreNames, imagesTv: imageConfig.imagesTv });
        }
    });
});

module.exports = router;