1. Create a routes folder in main root directory
2. Create auth.js file. This will be /auth route.
3. In auth.js file, do following configurations:

   const express = require('express');
   const router = express.Router();

   // As we're in auth.js file /google will lead us to /auth/google route
   router.get('/google', (req, res) => {
   res.send('auth');
   });

   module.exports = router;

4. In app.js file we need to have a link to auth.js file. That's loading the file to use the routes

   // Load Routes
   const auth = require('./routes/auth');

5. Right above the port, we need to add codes for using that routes as follows:

   // Use Routes
   app.use('/auth', auth);

---

IMPLEMENTING THE STRATEGY

1.  In config folder, create a passport.js file in which we will define our strategy and write initial codes as follows:

        const GoogleStrategy = require('passport-google-oauth20').Strategy;
        const mongoose = require("mongoose");
        const keys = require("./keys");

        module.exports = function(passport) {

        }

2.  In the app.js, we need to require passport.js file

    const passport = require('passport');

        // Passport Config
        require('./config/passport')(passport);

3.  Then, we gonna define a strategy in passport.js

         module.exports = function(passport) {
           passport.use(
             new GoogleStrategy(
               {
                 clientID: keys.googleClientID,
                 clientSecret: keys.googleClientSecret,
                 callbackURL: '/auth/google/callback',
                 proxy: true
               },
               (accessToken, refreshToken, profile, done) => {
                 console.log(accessToken);
                 console.log(profile);
               }
             )
           );
         };

we added "proxy: true" beacuse heroku deploys with "https" and this will prevent us to get error

4.  In the auth.js, we will import passport

         const passport = require('passport');

         // As we're in auth.js file /google will lead us to /auth/google route
         router.get(
           '/google',
           passport.authenticate('google', { scope: ['profile', 'email'] })
         );
