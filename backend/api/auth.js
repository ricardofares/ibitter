const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

module.exports = app => {

  const signIn = async (req, res) => {
    // Checks if the email has not been specified.
    if (!req.body.email) {
      return res.status(400).json({
        code: "E001",
        message: "O e-mail não foi especificado.",
      });
    }

    // Checks if the password has not been specified.
    if (!req.body.password) {
      return res.status(400).json({
        code: "E002",
        message: "A senha não foi especificada.",
      });
    }

    // Fetches the `email` and `password` from the request body.
    const { email, password } = req.body;
    const treatedEmail = email.toLowerCase()

    // Fetches the user with the specified email.
    const user = await app.knex('users')
      .where('email', '=', treatedEmail)
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
	name: user.name,
        username: user.username,
        email: user.email,
	course: user.course,
	avatar_url: user.avatar_url,
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, process.env.AUTH_SECRET),
      });
    });
  };

  return { signIn };
};
