const messages = require('../config/messages');

module.exports = app => {

  const fetchChatList = async (req, res) => {
    /// Check if the username has not been specified. Therefore, a
    /// 400 Bad Request HTTP Response is sent, indicating what gone
    /// wrong. In this case, the user has not been specified.
    if (!req.query.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username } = req.query;

    try {
      const response = await app.knex.raw(`
        SELECT *
        FROM chats AS c
        WHERE c.username_from = '${username}'
        ORDER BY c.sent_at DESC
        LIMIT 1
      `);

      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json(e);
    }
  };

  return { fetchChatList };
};
