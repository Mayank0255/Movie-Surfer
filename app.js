const dotenv = require('dotenv');
dotenv.config();

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(flash());

// PASSPORT CONFIGURATION

app.use(require('express-session')({
    secret: 'SYSTEM BREACHED !!!',
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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(require('./server/routes/index'));
app.use(require('./server/routes/discover'));
app.use(require('./server/routes/show'));
app.use(require('./server/routes/auth'));

const port = process.env.PORT || 1000;

app.listen(port, () => console.log(`Running at ${port}`));
