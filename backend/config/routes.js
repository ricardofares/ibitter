/// \brief Exports the routes to be accessed by the users.
module.exports = app => {
  /// \brief Creates a route for user to sign-up.
  app.post('/signup', app.api.user.signUp);

  /// \brief Creates a route for user to sign-in.
  app.post('/signin', app.api.auth.signIn);

  /// \brief Creates a route for user to post.
  app.post('/newpost', app.api.post.save);

  /// \brief Create a route for user to fetch posts.
  app.get('/posts', app.api.post.load);
  app.get('/getpost', app.api.post.fetchPost);
  app.get('/postmessages', app.api.post.fetchPostMessages);

  /// \brief Create a route for user to like posts.
  app.post('/addlike', app.api.likes.add);
  app.post('/removelike', app.api.likes.remove);
  app.get('/getlike', app.api.likes.get);

  app.get('/getname', app.api.user.getName);
};
