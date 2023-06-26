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
    const treatedEmail = email.toLowerCase()

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
          email: treatedEmail,
          password: hash,
        })
        .then(_ => {
          console.log(`User ${username} with e-mail ${treatedEmail} has been registered successfully.`);
          res.status(204).send();
        })
        .catch(err => {
          console.warn(`User ${username} with e-mail ${treatedEmail} has tried to register, but failed.`);
          res.status(400).json(err);
        });
    });
  };
  const followers = (req, res) => {
	  const { username } = req.query;
	  app.knex.raw(`
	  	SELECT followed
		FROM followers
		WHERE
			followers.follower = '${username}';
			`)
	  .then(query => res.status(200).json(query.rows))
          .catch(e => { 
            /// Catch an unexpected error.
            console.error(`Unexpected error has occurred while ${username} was getting followeds.`, e);

            return res.status(400).json(e); 
          });
  }
  const follow = (req, res) => {
    const { follower, followed } = req.query;
	  console.log(req.body)
    app.knex('followers')
      .insert({follower,followed})
      .then(_ => {
        console.log(`User ${follower} now follows ${followed} successfully.`);
        res.status(204).send();
      })
      .catch(err => {
        console.warn(`User ${follower} could't follow ${followed}.`);
        res.status(400).json(err);
      });
  }

  const unfollow = (req, res) => {
    const {follower, followed} = req.query;
    app.knex('followers')
      .where({follower, followed})
      .delete()
      .then(_ => {
        console.log(`User ${follower} stopped following ${followed} successfully.`);
        res.status(204).send();
      })
      .catch(err => {
        console.warn(`User ${follower} could't unfollow ${followed}.`);
        res.status(400).json(err);
      });
  }

  /// \brief Get the name from the specified username.
  ///
  /// \param req The HTTP request.
  /// \param res The HTTP response.
  const getName = (req, res) => {
    /// Checks if the username has not been specified in the request query parameters.
    ///
    /// This conditional statement is used to validate the presence of a username in the request query parameters.
    /// If the username is not specified, it indicates an invalid request, and a response with status code 400 is sent
    /// along with an error message indicating that the user has not been specified.
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
        return res.status(400).json(err);
      });
  };

  /// \brief Get the email from the specified username.
  ///
  /// \param req The HTTP request.
  /// \param res The HTTP response.
  const getEmail = (req, res) => {
    /// Checks if the username has not been specified in the request query parameters.
    ///
    /// This conditional statement is used to validate the presence of a username in the request query parameters.
    /// If the username is not specified, it indicates an invalid request, and a response with status code 400 is sent
    /// along with an error message indicating that the user has not been specified.
    if (!req.query.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username } = req.query;

    app.knex('users')
      .select('email')
      .where('username', '=', username)
      .then(query => {
        return res.status(200).json(query);
      }).catch(err => {
        console.error(`An error has occurred while getting the email of the user ${username}`, err);
        return res.status(400).json(err);
      });
  };

  /// \brief Retrieves the course information for a user.
  ///
  /// \param req The HTTP request.
  /// \param res The HTTP response.
  const fetchCourse = (req, res) => {
    /// Checks if the username has not been specified in the request query parameters.
    ///
    /// This conditional statement is used to validate the presence of a username in the request query parameters.
    /// If the username is not specified, it indicates an invalid request, and a response with status code 400 is sent
    /// along with an error message indicating that the user has not been specified.
    if (!req.query.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username } = req.query;

    app.knex('users')
      .select('course', 'avatar_url')
      .where('username', '=', username)
      .then(query => {
        return res.status(200).json(query);
      }).catch(e => {
        return res.status(400).json(e);
      });
  };

  const update = (req, res) => {
    /// Checks if the username has not been specified in the request query parameters.
    ///
    /// This conditional statement is used to validate the presence of a username in the request query parameters.
    /// If the username is not specified, it indicates an invalid request, and a response with status code 400 is sent
    /// along with an error message indicating that the user has not been specified.
    if (!req.body.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username, name, course, avatarUrl } = req.body;

    app.knex('users')
    	.where({ username })
    	.update({
	  name,
	  course,
	  avatar_url: avatarUrl,
	})
    .then(query => res.status(204).send())
    .catch(e => res.status(400).json(e));
  };

  const updateUser = async (req, res) => {
    // Fetches the `email` and `password` from the request body.
    const { name, email } = req.body;

    // Fetches the user with the specified email.
    const user = await app.knex('users')
      .where('email', '=', email)
      .first();

    // Checks if the user with the specified email has not been found.
    if (!user) {
      return res.status(400).json({
        code: "E003",
        message: "Usuário com e-mail especificado não cadastrado.",
      });
    }

    bcrypt.compare(password, user.password, (err, match) => {
      // Check if the password comparison has failed.
      if (err || !match) {
        return res.status(401).json({
          code: "E004",
          message: "A senha informada está incorreta.",
        });
      }

      // Creates the token's payload.
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, process.env.AUTH_SECRET),
      });
    });
  };

  return { signUp, getName, getEmail, fetchCourse, update, follow, unfollow, followers };
};
