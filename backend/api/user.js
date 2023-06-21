/// \brief Loads the `bcryptjs` module that is going to be used
///        to crypt the user password.
const bcrypt = require('bcrypt-nodejs');

const messages = require('../config/messages.js');

module.exports = app => {
  /// \brief Hashes the specified plain-text password.
  ///
  /// \param plainPassword The plain-text password to be hashed.
  /// \param callback A callback function to be called if the password
  ///                 has been hashed successfull. Further, the hash
  ///                 is supplied to the callback.
  const hashPassword = (plainPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(plainPassword, salt, null, (err, hash) => {
        // Calls the `callback` supplying the password's hash.
        callback(hash);
      });
    });
  };

  /// \brief Creates an user in the database.
  ///
  /// \param req The HTTP request.
  /// \param res The HTTP response.
  const signUp = (req, res) => {
    // Fetches the username, email and password from the request body.
    const { name, username, course, email, password } = req.body;

    // Hashes the password specified in the request body.
    hashPassword(password, hash => {
      // Inserts an user inside the database. If the user has been
      // inserted, then a success message is sent as the response.
      // Otherwise, an error message is sent.
      app.knex('users')
        .insert({
          name,
          username,
          course,
          email,
          password: hash,
        })
        .then(_ => {
          console.log(`User ${username} with e-mail ${email} has been registered successfully.`);
          res.status(204).send();
        })
        .catch(err => {
          console.warn(`User ${username} with e-mail ${email} has tried to register, but failed.`);
          res.status(400).json(err);
        });
    });
  };

  /// \brief Get the name from the specified username.
  ///
  /// \param req The HTTP request.
  /// \param res The HTTP response.
  const getName = (req, res) => {
    // Checks if the username has not been specified.
    if (!req.query.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username } = req.query;
    app.knex('users')
      .select('name')
      .where('username', '=', username)
      .then(query => {
        return res.status(200).json(query);
      }).catch(err => {
        console.error(`An error has occurred while getting the name of the user ${username}`, err);
        res.status(400).json(err);
      });
  };

  return { signUp, getName };
};
