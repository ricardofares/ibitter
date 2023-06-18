const messages = require('../config/messages.js');

module.exports = app => {

  const load = async (req, res) => {
    let posts = [];

    // Check if the username has not beenn specified. If the user
    // has not been specified, then a 400 Bad Request response is
    // sent.
    if (!req.query.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username } = req.query.username;

    app.knex.raw(`
        SELECT *,
        (SELECT COUNT(*) FROM posts WHERE reply_to = p.id) AS messages_count,
        (SELECT COUNT(*) > 0 FROM likes WHERE username = ${username} AND post_id = p.id) AS i_liked
        FROM posts AS p
        ORDER BY posted_at DESC
      `)
      .then(query => { return res.status(200).json(query.rows); })
      .catch(err => { return res.status(400).json(err); });
  };

  /// \brief Saves a post in the database.
  /// 
  /// \param req The HTTP request.
  /// \param res The HTTP response.
  const save = (req, res) => {
    // Checks if the username has not been specified.
    if (!req.body.username) {
      return res.status(400).json({
        code: "E005",
        message: "O usuário da postagem não foi especificado.",
      });
    }

    // Checks if the content has not been specified.
    if (!req.body.content) {
      return res.status(400).json({
        code: "E006",
        message: "O conteúdo da postagem não foi especificado.",
      });
    }

    // Fetches the username and the post's content.
    const { username, content } = req.body;

    // Check if the content is empty.
    if (content.length === 0) {
      return res.status(400).json({
        code: "E007",
        message: "O conteúdo da postagem não pode ser vazio",
      });
    }

    // Inserts a poster into the database.
    app.knex('posts').
      insert({
        username,
        content,
        reply_to: req.body.replyTo || null,
        posted_at: new Date()
      }).then(_ => {
        if (req.body.replyTo)
          console.log(`User ${username} has made a post replying the post ${req.body.replyTo}`);
        else
          console.log(`User ${username} has made a post`);

        res.status(204).send();
      }).catch(err => {
        console.warn(`User ${username} tried to make a post, but failed.`);
        res.status(400).json(err);
      });
  };

  return { save, load };
};
