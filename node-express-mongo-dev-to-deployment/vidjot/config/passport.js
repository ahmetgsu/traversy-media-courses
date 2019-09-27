const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Login Page User check
      User.findOne({
        email: email
      }).then(user => {
        // User does not exist
        if (!user) {
          // done 1st arg is error. 2nd is user. 3rd error msg
          return done(null, false, { message: 'No User Found' });
        }
        // If user exist, Match password
        // password is before encryption, user.password is after encryption
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            // it means, no err, everything is matched
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password Incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
