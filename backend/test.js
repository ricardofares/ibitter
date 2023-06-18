const knex = require('./config/db.js');

knex.raw(`
  SELECT *,
  (SELECT COUNT(*) FROM posts WHERE reply_to = p.id) AS message_count,
  (SELECT COUNT(*) > 0 FROM likes WHERE username = 'ricardo' AND post_id = p.id) AS i_liked
  FROM posts AS p
`)
  .then(response => console.log(response.rows))
  .catch(e => console.log(e));
