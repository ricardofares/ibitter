/** @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('likes', table => {
    table.string('username').references('username').inTable('users');
    table.integer('post_id').references('id').inTable('posts');
    table.primary(['username', 'post_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('likes');
};
