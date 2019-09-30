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
