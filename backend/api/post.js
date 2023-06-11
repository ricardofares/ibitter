module.exports = app => {

  const load = async (req, res) => {
    let posts = [];

    // Checks if the username has not been specified in the query parameters.
    // If so, a 400 Bad Request response error is returned.
    if (!req.query.username) {
      return res.status(400).json({
        code: "E010",
        message: "Usuário não especificado para consulta de postagens.",
      });
    }

    const { username } = req.query;

    if (req.query.myPosts && req.query.myPosts == 'true') {
      posts = await app.knex
        .select(app.knex.raw(`posts.*, COALESCE(likes.username, '') = '${username}' AS i_liked`))
        .from('posts')
        .leftJoin('likes', 'posts.id', 'likes.post_id')
        .whereRaw(`(likes.username IS NULL OR likes.username = '${username}') AND posts.username = '${username}'`)
        .orderBy('posts.posted_at', 'desc');
    } else {
      posts = await app.knex
        .select(app.knex.raw(`posts.*, COALESCE(likes.username, '') = '${username}' AS i_liked`))
        .from('posts')
        .leftJoin('likes', 'posts.id', 'likes.post_id')
        .whereRaw(`likes.username IS NULL OR likes.username = '${username}'`)
        .orderBy('posts.posted_at', 'desc');
    }

    return res.status(200).json(posts);
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
        posted_at: new Date()
      }).then(_ => {
        console.log(`User ${username} has made a post`);
        res.status(204).send();
      }).catch(err => {
        console.warn(`User ${username} tried to make a post, but failed.`);
        res.status(400).json(err);
      });
  };

  return { save, load };
};
