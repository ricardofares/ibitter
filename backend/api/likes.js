module.exports = app => {

  const save = async (req, res) => {
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
        message: "Idnetificador da postagem não especificado.",
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

  return { save };
};
