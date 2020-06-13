require('dotenv').config();

const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      request = require("request"),
      mongoose = require("mongoose"),
      User = require("./models/user"),
      Watch = require("./models/watchlist"),
      flash = require("connect-flash"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/MovieSurfer", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "SYSTEM BREACHED !!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


const images = [
    { url: "ACTION.jpg" },
    { url: "ADVENTURE.jpg" },
    { url: "ANIMATION.jpg" },
    { url: "COMEDY.jpg" },
    { url: "CRIME.jpg" },
    { url: "DOCUMENTARY.jpg" },
    { url: "DRAMA.jpg" },
    { url: "FAMILY.jpg" },
    { url: "FANTASY.jpg" },
    { url: "HISTORY.jpg" },
    { url: "HORROR.jpg" },
    { url: "MUSIC.jpg" },
    { url: "MYSTERY.jpg" },
    { url: "ROMANCE.jpg" },
    { url: "SCIENCE.jpg" },
    { url: "TVMOVIE.jpg" },
    { url: "THRILLER.jfif" },
    { url: "WAR.jpg" },
    { url: "WESTERN.jpg" }
];
const imagestv = [
    { url: "ADVENTURE.jpg" },
    { url: "ANIMATION.jpg" },
    { url: "COMEDY.jpg" },
    { url: "CRIME.jpg" },
    { url: "DOCUMENTARY.jpg" },
    { url: "DRAMA.jpg" },
    { url: "FAMILY.jpg" },
    { url: "KIDS.jfif" },
    { url: "MYSTERY.jpg" },
    { url: "NEWS.jpg" },
    { url: "REALITY.jpg" },
    { url: "SCIENCE.jpg" },
    { url: "SOAP.jpg" },
    { url: "TALK.jpg" },
    { url: "WAR.jpg" },
    { url: "WESTERN.jpg" }
];

// =============================================== INDEX PAGE OF MOVIES AND TV SHOWS ============================================================


app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/index", function(req, res) {
    request("https://api.themoviedb.org/3/genre/movie/list?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const genreNames = JSON.parse(body);
            res.render("index", { genreNames: genreNames, images: images });
        }
    });
});

app.get("/indextv", function(req, res) {
    request("https://api.themoviedb.org/3/genre/tv/list?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const genreNames = JSON.parse(body);
            res.render("indextv", { genreNames: genreNames, imagestv: imagestv });
        }
    });
});

// ====================================== DISCOVER PAGE BY GENRE OF MOVIES AND TV SHOWS ==========================================================

app.get("/index/discover/:genre_name/:genre_id/:page", function(req, res) {
    const genre_id = req.params.genre_id;
    const genre_name = req.params.genre_name;
    const page = req.params.page;
    request("https://api.themoviedb.org/3/discover/movie?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page + "&with_genres=" + genre_id,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("discover", { data: data, genre_name: genre_name, genre_id: genre_id, page: page });
            }
        });
});

app.get("/indextv/discover/:genre_name/:genre_id/:page", function(req, res) {
    const genre_id = req.params.genre_id;
    const genre_name = req.params.genre_name;
    const page = req.params.page;
    request("https://api.themoviedb.org/3/discover/tv?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&sort_by=popularity.desc&page=" + page + "&timezone=America%2FNew_York&with_genres=" + genre_id + "&include_null_first_air_dates=false",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("discovertv", { data: data, genre_name: genre_name, genre_id: genre_id, page: page });
            }
        });
});

// ====================================================== MOST POPULAR AND TOP RATED =====================================================

// MOST POPULAR MOVIES
app.get("/index/discover/pop/:page", function(req, res) {
    const page = req.params.page;
    request("https://api.themoviedb.org/3/movie/popular?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("popmovie", { data: data, page: page });
            }
        });
});

// TOP RATED MOVIES
app.get("/index/discover/top/:page", function(req, res) {
    const page = req.params.page;
    request("https://api.themoviedb.org/3/movie/top_rated?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("topmovie", { data: data, page: page });
            }
        });
});

// MOST POPULAR TV SHOWS

app.get("/indextv/discover/pop/:page", function(req, res) {
    const page = req.params.page;
    request("https://api.themoviedb.org/3/tv/popular?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("poptv", { data: data, page: page });
            }
        });
});

// TOP RATED TV SHOWS

app.get("/indextv/discover/top/:page", function(req, res) {
    const page = req.params.page;
    request("https://api.themoviedb.org/3/tv/top_rated?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("toptv", { data: data, page: page });
            }
        });
});


// ======================================================= SEARCH PAGE ===================================================================

app.get("/index/search/:page", function(req, res) {
    const query = req.query.search;
    const page = req.params.page;
    request("https://api.themoviedb.org/3/search/multi?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&query=" + query + "&page=" + page + "&include_adult=false",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("search", { data: data, query: query, page: page });
            }
        });
});

// ======================================================== SHOW PAGE ====================================================================


app.get("/indextv/discover/:tv_id/show", function(req, res) {
    const tv_id = req.params.tv_id;

    request("https://api.themoviedb.org/3/tv/" + tv_id + "?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("showtv", { data: data, tv_id: tv_id });
            }
        });
});


app.get("/index/discover/:movie_id/show", function(req, res) {
    const movie_id = req.params.movie_id;

    request("https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.render("show", { data: data, movie_id: movie_id });
            }
        });
});

// ================================================= WATCH LIST PAGE ========================================================================

app.get("/watchlist", function(req, res) {
    res.render("watchlist");
});



// ================================================== AUTHENTICATION ROUTES ==================================================

// REGISTER ROUTES

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/index");
        });
    });
});



// LOGIN ROUTES

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/index",
        failureRedirect: "/login"
    })(req, res);
});

// LOGOUT ROUTES

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/index");
});

const port = process.env.PORT;

app.listen(1000, function() {
    console.log("MovieSurfer server started");

});
