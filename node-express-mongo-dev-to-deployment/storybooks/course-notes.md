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

---

In section 41, we set up google strategy in passport.js file and we are able to go /auth/google route. But as we do not have our callback function we get an error message as follows in the /auth/google route after logged in: Cannot GET /auth/google/callback.

Normally we need to have a callback function as defined in the passport-google-oauth20 web site

          app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
              // Successful authentication, redirect home.
              res.redirect('/');
            });

In section 42, we will be dealing with this callback function.

1.  In auth.js, we paste the code below and modify a bit

           router.get(
             '/google/callback',
             passport.authenticate('google', { failureRedirect: '/' }),
             (req, res) => {
               // Successful authentication, redirect dashboard.
               res.redirect('/dashboard');
             }
           );

2.  In passport.js, we have written console.log for accessToken and profile. When we try to sign-in we get those information in console. We will use mongoose to take profile information and format it in a way that we want and insert it into mangoose. In order to do that, we need to create mongoose module.

3.  We deployed our changes to heroku.
    git add .
    git commit -am "handled auth"
    git push heroku master

4.  We then go to heroku app and open up the application. We try to go the link: https://agile-inlet-11133.herokuapp.com/auth/google. But it gives an error. Because we've solely added http://localhost:5000 to Authorized JavaScript origins section.

        4.1 First, in console.developers.google.com we select the storybooks project on top left side. Then, in the left side bar we go to OAUth consent screen to add "agile-inlet-11133.herokuapp.com" link to Authorized domains.

        4.2 After that, select Credentials and click on "Web client 1" underneath of the Credentials. Then, we add https://agile-inlet-11133.herokuapp.com to Authorized JavaScript origins.

        4.3 On the other hand, we must add https://agile-inlet-11133.herokuapp.com/auth/google/callback to Authorized redirect URIs section

---

SECTION 7-43: CREATING THE USER MODEL

In this chapter, we will implement mongoose and connect our MongoDB Atlas dev database(db) and create a user model

1.  In app.js, we brought mongoose but we've not connected yet. So, we'll do that. But first we need to bring (load) the keys in app.js file.

          // Load Keys
          const keys = require('./config/keys');

2.  Then, we connect mongoose as follows:

          // Mongoose Connect
          mongoose
            .connect(keys.mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err));

3.  We create "models" folder in root directory and inside of it we create User.js file.

            const mongoose = require('mongoose');
            const Schema = mongoose.Schema;

            // Create Schema
            const UserSchema = new Schema({
              googleID: {
                type: String,
                required: true
              },
              email: {
                type: String,
                required: true
              },
              firstName: {
                type: String
              },
              lastName: {
                type: String
              },
              image: {
                type: String
              }
            });

            // Create collection and add schema
            mongoose.model('users', UserSchema);

---

SECTION 7-44: SAVING THE AUTHENTICATED USER

In this section we are going to take some of the user profile info and we put them into database.
