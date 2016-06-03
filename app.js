/*var express = require('express')
, http = require('http')
, path = require('path')
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

var app = express();

var mongoose = require('mongoose');
var dbConfig = require('./db.js');
mongoose.connect(dbConfig.url);

//require('./config/passport')(passport); // pass passport for configuration

/*var mongoose = require('mongoose');

var mongoURI = "mongodb://127.0.0.1:27017/test";
var MongoDB = mongoose.connect(mongoURI);
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});*/

/*var LocalStrategy = require('passport-local').Strategy;

//var db = mongoose.connection;

//var expressSession = require('express-session');
//app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
//app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public'))); //will help serve static files as middleware



var initPassport = require('./passport/init');
initPassport(passport);

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.get('/index.html',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.get('/about.html',function(req,res){
      res.sendFile(__dirname + "/about.html");
});

app.get('/subjects.html',function(req,res){
      res.sendFile(__dirname + "/subjects.html");
});


/*passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});*/

/*db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});*/

//mongoose.connect(dbConfig.url);
//mongoose.connect('mongodb://localhost/MyDatabase');


/*app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);



app.listen(3000,function(){
    console.log("Working on port 3000");
});

module.exports = app;*/




var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.set('views', path.join(__dirname, 'public'));

//app.set('view engine', 'html');

//app.use(express.static(path.join(__dirname, 'public'))); //will help serve static files as middleware

//app.use(favicon());
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.engine('html', require('ejs').renderFile);

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
//app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
//var flash = require('connect-flash');
//app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
//app.use('/', routes);



app.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
  res.sendFile(__dirname + "/index.html");
});

app.get('/index.html',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.get('/about.html',function(req,res){
      res.sendFile(__dirname + "/about.html");
});

app.get('/subjects.html',function(req,res){
      res.sendFile(__dirname + "/subjects.html");
});

/* Handle Login POST */
app.post('/login', passport.authenticate('login', {

  successRedirect: '/',
  failureRedirect: '/about.html',
  
}));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.listen(3000,function(){
    console.log("Working on port 3000");
});

module.exports = app;
