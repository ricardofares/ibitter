/// \brief Loads the `bcryptjs` module that is going to be used
///        to crypt the user password.
const bcrypt = require('bcrypt-nodejs');

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
    // Fetches the name, email and password from the request body.
    const { name, email, password } = req.body;

    // Hashes the password specified in the request body.
    hashPassword(password, hash => {
      console.log(hash);
      // Inserts an user inside the database. If the user has been
      // inserted, then a success message is sent as the response.
      // Otherwise, an error message is sent.
      app.knex('users')
        .insert({
          name,
          email,
          password: hash,
        })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err));
    });
  };

  return { signUp };
};
