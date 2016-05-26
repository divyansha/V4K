var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var dbConfig = require('./db.js');
mongoose.connect(dbConfig.url);

/*var mongoose = require('mongoose');

var mongoURI = "mongodb://127.0.0.1:27017/test";
var MongoDB = mongoose.connect(mongoURI);
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});*/



var LocalStrategy = require('passport-local').Strategy;

//var db = mongoose.connection;

//var expressSession = require('express-session');
//app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public'))); //will help serve static files as middleware


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


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/*db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});*/

//mongoose.connect(dbConfig.url);
//mongoose.connect('mongodb://localhost/MyDatabase');


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);


app.listen(3000,function(){
    console.log("Working on port 3000");
});