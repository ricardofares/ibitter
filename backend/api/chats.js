const messages = require('../config/messages');

module.exports = app => {

  const createMessage = async (req, res) => {
    /// Check if the sender has not been specified. Therefore, a
    /// 400 Bad Request HTTP Response is sent, indicating what gone
    /// wrong. In this case, the sender has not been specified.
    if (!req.body.from)
      return res.status(400).json(messages['SENDER_NOT_SPECIFIED']);

    /// Check if the recipient has not been specified. Therefore, a
    /// 400 Bad Request HTTP Response is sent, indicating what gone
    /// wrong. In this case, the recipient has not been specified.
    if (!req.body.to)
      return res.status(400).json(messages['RECIPIENT_NOT_SPECIFIED']);

    const { from, to, content } = req.body;

    try {
      await app.knex('chats')
      	.insert({
	  username_from: from,
	  username_to: to,
	  message: content,
	});
 
      /// Sending a message to the standard output of the back-end application to indicate
      /// that the message has been sent successfully.
      console.log(`User ${from} has sent a message to ${to} with the content (${content})`);

      return res.status(205).send();
    } catch (e) {
      /// Catch an unexpected error.
      console.error('unexpected error in createMessage in chats: ', e);

      return res.status(400).json(e);
    }
  };

  const fetchChatList = async (req, res) => {
    /// Check if the username has not been specified. Therefore, a
    /// 400 Bad Request HTTP Response is sent, indicating what gone
    /// wrong. In this case, the user has not been specified.
    if (!req.query.username)
      return res.status(400).json(messages['USER_NOT_SPECIFIED']);

    const { username } = req.query;

    try {
      const query = await app.knex.raw(`
      	SELECT username_from, username_to, MAX(sent_at) as sent_at
	FROM chats
	WHERE username_from = '${username}' OR username_to = '${username}'
	GROUP BY username_from, username_to
      `);

      return res.status(200).json(query.rows);
    } catch (e) {
      return res.status(400).json(e);
    }
  };

  const fetchChatMessages = async (req, res) => {
    /// Check if the sender has not been specified. Therefore, a
    /// 400 Bad Request HTTP Response is sent, indicating what gone
    /// wrong. In this case, the sender has not been specified.
    if (!req.query.from)
      return res.status(400).json('O remetente da mensagem não foi especificado.');

    /// Check if the sender has not been specified. Therefore, a
    /// 400 Bad Request HTTP Response is sent, indicating what gone
    /// wrong. In this case, the sender has not been specified.
    if (!req.query.to)
      return res.status(400).json('O remetente da mensagem não foi especificado.');
    
    const { from, to } = req.query;

    try {
    const response = await app.knex('chats')
      	.where('username_from', '=', from)
      	.where('username_to', '=', to)
      	.orderBy('sent_at', 'DESC');

      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json(e);
    }
  };

  return { createMessage, fetchChatList, fetchChatMessages };
};
