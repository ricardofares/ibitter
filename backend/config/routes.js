/// \brief Exports the routes to be accessed by the users.
module.exports = app => {
  ///
  /// \brief Routes for access the Users API.
  ///
  app.post('/signup', app.api.user.signUp);
  app.get('/getname', app.api.user.getName);
  app.get('/getcourse', app.api.user.fetchCourse);

  ///
  /// \brief Routes for access the Auth API.
  ///
  app.post('/signin', app.api.auth.signIn);

  ///
  /// \brief Routes for access the Post API.
  ///
  app.post('/newpost', app.api.post.save);
  app.get('/posts', app.api.post.load);
  app.get('/getpost', app.api.post.fetchPost);
  app.get('/postmessages', app.api.post.fetchPostMessages);

  ///
  /// \brief Routes for access the Likes API.
  ///
  app.post('/addlike', app.api.likes.add);
  app.post('/removelike', app.api.likes.remove);
  app.get('/getlike', app.api.likes.get);

  ///
  /// \brief Routes for access the Chats API.
  ///
  app.get('/getchats', app.api.chats.fetchChatList);
};
