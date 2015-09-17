// github passport auth strategy

var passport = require("passport");
var GitHubStrategy = require("passport-github");
var User = require("../models/user");
var mongoose = require("mongoose");

// register app on github, create a model for mongoose,
// setup config file /env variables

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  var githubUser= new User({
    username: profile.displayName,
    email: profile.emails[0].value
  });
  githubUser.save(function(err, user){
    if(err){
      done(err);
    }else{
      done(null, user);
    }
  });
}
));
// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  // console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    // console.log(user);
    if(!err) done(null, user);
    else done(err, null);
  });
});

module.exports = passport;
