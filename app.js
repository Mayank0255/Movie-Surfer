require('dotenv').config();

var express = require("express"),
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


var images = [
    { url: "https://mla21yeiph1a.i.optimole.com/-AwcUrQd3iQ/w:800/h:533/q:auto/https://www.monstersandcritics.com/wp-content/uploads/2018/10/Hobbs-and-Shaw-Fast-and-the-Furious.jpg" },
    { url: "http://alliswall.com/file/1880/1920x1200/16:9/an-adventure-scene-from-pirates-of-the-caribbean.jpg" },
    { url: "http://wallpapers-all.com/uploads/posts/2017-05/26_your_name.jpg" },
    { url: "http://1920x1080hdwallpapers.com/image/201510/movies/2655/mask-comedy-jim-carrey-suit-tongue.jpg" },
    { url: "http://getwallpapers.com/wallpaper/full/1/b/9/76408.jpg" },
    { url: "https://straightfromamovie.com/wp-content/uploads/2017/05/Sachin-Tendulkar-movie.jpg" },
    { url: "http://www.wallpaperup.com/uploads/wallpapers/2016/01/09/871923/bf0b0870e7690e25386507b3bb22d491.jpg" },
    { url: "https://claratsi.files.wordpress.com/2012/08/mark_wahlberg_and_ted_ted_movie_hd_wallpaper-vvallpaper-net.jpg?w=538&h=430" },
    { url: "https://i.pinimg.com/originals/07/6e/22/076e22760f4317391133ea3896807559.jpg" },
    { url: "https://i.pinimg.com/originals/85/4b/15/854b15046b938ee0970401bb2045b62c.jpg" },
    { url: "https://i.pinimg.com/originals/d9/7c/22/d97c22332d391e2f66068506415144fd.jpg" },
    { url: "https://wallpapersite.com/images/wallpapers/bohemian-rhapsody-4311x2425-biography-music-2018-4k-15167.jpg" },
    { url: "https://wallpapersite.com/images/wallpapers/the-house-with-a-clock-in-its-walls-2880x1800-fantasy-horror-mystery-12808.jpg" },
    { url: "https://s-media-cache-ak0.pinimg.com/originals/58/e6/a7/58e6a7a54ec4f938420adc26cf1c6027.jpg" },
    { url: "https://wallpapercave.com/wp/ZZW1y8l.jpg" },
    { url: "http://www.74211.com/wallpaper/picture_big/Hangover-in-1920x1080-Pixel-One-Guy-in-the-Room-is-Dying-All-the-Others-Frozen-You-Will-All-be-Under-Suspection-TV-Movies-Wallpaper.jpg" },
    { url: "http://www.wallcoo.net/movie/2010_09_Machete/wallpapers/1440x900/Robert_De_Niro_in_Machete_Wallpaper_8.jpg" },
    { url: "http://s1.picswalls.com/wallpapers/2016/06/06/warcraft-2016-desktop-wallpaper_093057992_306.jpg" },
    { url: "http://cdn.windows7themes.net/wallpaper/Django-Unchained-wallpaper-04.jpg" }
];
var imagestv = [
    { url: "http://alliswall.com/file/1880/1920x1200/16:9/an-adventure-scene-from-pirates-of-the-caribbean.jpg" },
    { url: "http://wallpapers-all.com/uploads/posts/2017-05/26_your_name.jpg" },
    { url: "http://1920x1080hdwallpapers.com/image/201510/movies/2655/mask-comedy-jim-carrey-suit-tongue.jpg" },
    { url: "http://getwallpapers.com/wallpaper/full/1/b/9/76408.jpg" },
    { url: "https://straightfromamovie.com/wp-content/uploads/2017/05/Sachin-Tendulkar-movie.jpg" },
    { url: "http://www.wallpaperup.com/uploads/wallpapers/2016/01/09/871923/bf0b0870e7690e25386507b3bb22d491.jpg" },
    { url: "https://claratsi.files.wordpress.com/2012/08/mark_wahlberg_and_ted_ted_movie_hd_wallpaper-vvallpaper-net.jpg?w=538&h=430" },
    { url: "https://image.insider.com/5a6ba63446a288a20a8b45ee?width=1100&format=jpeg&auto=webp" },
    { url: "https://wallpapersite.com/images/wallpapers/the-house-with-a-clock-in-its-walls-2880x1800-fantasy-horror-mystery-12808.jpg" },
    { url: "https://i.pinimg.com/originals/9f/ec/9c/9fec9cdc9c7b615853163c517c0d1282.jpg" },
    { url: "https://tvseriesfinale.com/wp-content/uploads/2015/05/survivor51-e1431465981434.jpg" },
    { url: "https://wallpapercave.com/wp/ZZW1y8l.jpg" },
    { url: "https://media.gettyimages.com/photos/the-cast-of-the-granada-tv-series-coronation-street-celebrate-the-picture-id830133322" },
    { url: "https://cdn.dodowallpaper.com/full/972/the-tonight-show-starring-jimmy-fallon-wallpapers-2.jpg" },
    { url: "http://s1.picswalls.com/wallpapers/2016/06/06/warcraft-2016-desktop-wallpaper_093057992_306.jpg" },
    { url: "http://cdn.windows7themes.net/wallpaper/Django-Unchained-wallpaper-04.jpg" },
    { url: "http://cdn.windows7themes.net/wallpaper/Django-Unchained-wallpaper-04.jpg" },
    { url: "http://www.wallcoo.net/movie/2010_09_Machete/wallpapers/1440x900/Robert_De_Niro_in_Machete_Wallpaper_8.jpg" }
];

// =============================================== INDEX PAGE OF MOVIES AND TV SHOWS ============================================================


app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/index", function(req, res) {
    request("https://api.themoviedb.org/3/genre/movie/list?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var genreNames = JSON.parse(body);
            res.render("index", { genreNames: genreNames, images: images });
        }
    });
});

app.get("/indextv", function(req, res) {
    request("https://api.themoviedb.org/3/genre/tv/list?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var genreNames = JSON.parse(body);
            res.render("indextv", { genreNames: genreNames, imagestv: imagestv });
        }
    });
});

// ====================================== DISCOVER PAGE BY GENRE OF MOVIES AND TV SHOWS ==========================================================

app.get("/index/discover/:genre_name/:genre_id/:page", function(req, res) {
    var genre_id = req.params.genre_id;
    var genre_name = req.params.genre_name;
    var page = req.params.page;
    request("https://api.themoviedb.org/3/discover/movie?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page + "&with_genres=" + genre_id,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("discover", { data: data, genre_name: genre_name, genre_id: genre_id, page: page });
            }
        });
});

app.get("/indextv/discover/:genre_name/:genre_id/:page", function(req, res) {
    var genre_id = req.params.genre_id;
    var genre_name = req.params.genre_name;
    var page = req.params.page;
    request("https://api.themoviedb.org/3/discover/tv?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&sort_by=popularity.desc&page=" + page + "&timezone=America%2FNew_York&with_genres=" + genre_id + "&include_null_first_air_dates=false",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("discovertv", { data: data, genre_name: genre_name, genre_id: genre_id, page: page });
            }
        });
});

// ====================================================== MOST POPULAR AND TOP RATED =====================================================

// MOST POPULAR MOVIES
app.get("/index/discover/pop/:page", function(req, res) {
    var page = req.params.page;
    request("https://api.themoviedb.org/3/movie/popular?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("popmovie", { data: data, page: page });
            }
        });
});

// TOP RATED MOVIES
app.get("/index/discover/top/:page", function(req, res) {
    var page = req.params.page;
    request("https://api.themoviedb.org/3/movie/top_rated?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("topmovie", { data: data, page: page });
            }
        });
});

// MOST POPULAR TV SHOWS

app.get("/indextv/discover/pop/:page", function(req, res) {
    var page = req.params.page;
    request("https://api.themoviedb.org/3/tv/popular?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("poptv", { data: data, page: page });
            }
        });
});

// TOP RATED TV SHOWS

app.get("/indextv/discover/top/:page", function(req, res) {
    var page = req.params.page;
    request("https://api.themoviedb.org/3/tv/top_rated?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&page=" + page,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("toptv", { data: data, page: page });
            }
        });
});


// ======================================================= SEARCH PAGE ===================================================================

app.get("/index/search/:page", function(req, res) {
    var query = req.query.search;
    var page = req.params.page;
    request("https://api.themoviedb.org/3/search/multi?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US&query=" + query + "&page=" + page + "&include_adult=false",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("search", { data: data, query: query, page: page });
            }
        });
});

// ======================================================== SHOW PAGE ====================================================================


app.get("/indextv/discover/:tv_id/show", function(req, res) {
    var tv_id = req.params.tv_id;

    request("https://api.themoviedb.org/3/tv/" + tv_id + "?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("showtv", { data: data, tv_id: tv_id });
            }
        });
});


app.get("/index/discover/:movie_id/show", function(req, res) {
    var movie_id = req.params.movie_id;

    request("https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=2358e7487a7ec65f8d1133ca61f0f1e2&language=en-US",
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
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