module.exports = app => {

  const add = async (req, res) => {
    // Check if the username of the user who has liked a post has not been specified.
    // If the username is missing in the request body, return a 400 Bad Request response
    // with an error code and message indicating that the user is not specified.
    if (!req.body.username) {
      return res.status(400).json({
        code: "E008",
        message: "Usuário não especificado.",
      });
    }

    // Check if the post identifier of the post which the user has liked has not been specified.
    // If the post identifier is missing in the request body, return a 400 Bad Request response
    // with an error code and messagee indicating that the post identifier is not specified.
    if (!req.body.postId) {
      return res.status(400).json({
        code: "E009",
        message: "Identificador da postagem não especificado.",
      });
    }

    const { username, postId } = req.body;

    app.knex('likes')
      .insert({
        username,
        post_id: postId
      }).then(_ => {
        console.log(`User ${username} has liked the post ${postId}.`);

        app.knex('posts')
          .increment('likes')
          .where('id', postId)
          .then(_ => {
            console.log(`Post ${postId} had its likes count incremented.`);
            return res.status(204).send();
          })
          .catch(err => {
            console.log(`Post ${postId} tried to had its likes count incremented, but failed..`);
            return res.status(400).json(err);
          });
      }).catch(err => {
        console.warn(`User ${username} has tried to like the post ${postId}, but failed.`);
        return res.status(400).json(err);
      });

  };

  const remove = async (req, res) => {
    // Check if the username of the user who has liked a post has not been specified.
    // If the username is missing in the request body, return a 400 Bad Request response
    // with an error code and message indicating that the user is not specified.
    if (!req.body.username) {
      return res.status(400).json({
        code: "E008",
        message: "Usuário não especificado.",
      });
    }

    // Check if the post identifier of the post which the user has liked has not been specified.
    // If the post identifier is missing in the request body, return a 400 Bad Request response
    // with an error code and messagee indicating that the post identifier is not specified.
    if (!req.body.postId) {
      return res.status(400).json({
        code: "E009",
        message: "Identificador da postagem não especificado.",
      });
    }

    const { username, postId } = req.body;

    app.knex('posts')
      .decrement('likes')
      .where('id', postId)
      .then(_ => {
        console.log(`Post ${postId} had its likes count decremented.`);

        app.knex('likes')
          .where({ username, post_id: postId })
          .del()
          .then(_ => {
            console.log(`User ${username} has removed the liked from the post ${postId}.`);
            return res.status(204).send();
          })
          .catch(err => {
            console.warn(`Row (${username}, ${postId}) from 'likes' table has tried to be deleted, but failed.`);
            return res.status(400).json(err);
          });
      })
      .catch(err => {
        console.warn(`Username ${username} has tried to remove the like from the post ${postId}, but failed.`);
        return res.status(400).json(err);
      });

  };

  return { add, remove };
};
