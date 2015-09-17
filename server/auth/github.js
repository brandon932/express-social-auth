// github passport auth strategy

var passport = require("passport");
var GitHubStrategy = require("passport-github");

// register app on github, create a model for mongoose,
// setup config file /env variables

var GITHUB_CLIENT_ID= '659644070207596e4147';
var GITHUB_CLIENT_SECRET= 'fa2133c72de3801c027356629a8e77c6573b8f87';

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    console.log(profile);
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // return done(err, user);
    // });
  }
));

module.exports = passport;
