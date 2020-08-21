const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    User.register(new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/movie');
        });
    });
});



// LOGIN ROUTES

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/movie',
        failureRedirect: '/login'
    })(req, res);
});

// LOGOUT ROUTES

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/movie');
});

module.exports = router;