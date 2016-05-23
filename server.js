var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var dbConfig = require('./db.js');

var LocalStrategy = require('passport-local').Strategy;

//var db = mongoose.connection;

var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/*db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});*/

mongoose.connect(dbConfig.url);
//mongoose.connect('mongodb://localhost/MyDatabase');


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);





app.listen(3000,function(){
    console.log("Working on port 3000");
});