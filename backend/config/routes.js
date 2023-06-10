/// \brief Exports the routes to be accessed by the users.
module.exports = app => {
  /// \brief Creates a route for user to sign-up.
  app.post('/signup', app.api.user.signUp);

  /// \brief Creates a route for user to sign-in.
  app.post('/signin', app.api.auth.signIn);

  /// \brief Creates a route for user to post.
  app.post('/newpost', app.api.post.save);
};
