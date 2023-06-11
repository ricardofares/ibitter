/// \brief Loads the `.env` properties at `process.env`.
require('dotenv').config();

/// \brief Imports the `express` module.
const express = require('express');

/// \brief Instantiate an `express` class.
const app = express();

/// \brief Loads the `body-parser` middleware.
const bodyParser = require('body-parser');

/// \brief Loads the `cors` (Cross-Origin Resource Sharing).
const cors = require('cors');

/// \brief Loads the database query builder.
const knex = require('./config/db.js')

/// \brief Loads the User, Auth, Post and Likes API.
const userAPI = require('./api/user.js')(app);
const authAPI = require('./api/auth.js')(app);
const postAPI = require('./api/post.js')(app);
const likesAPI = require('./api/likes.js')(app);

// Update the application properties in `app` to be used
// outside this file.
app.knex = knex;
app.api = {
  user: userAPI,
  auth: authAPI,
  post: postAPI,
  likes: likesAPI,
};

// Adds a middleware that only parsers `json`.
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

/// \brief Loads the routes.
//  \note The route loading must be made after setting
//        the `app` properties as `api`, since the route
//        definition use these properties.
require('./config/routes.js')(app);

// Make the server starts to listen.
app.listen(process.env.SERVER_PORT, () => {
  console.log('Backend running 🚀️');
});
