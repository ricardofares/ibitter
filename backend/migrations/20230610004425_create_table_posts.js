/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.string('username').references('username').inTable('users');
    table.string('content', 1000).notNull();
    table.integer('likes').unsigned().defaultTo(0);
    table.datetime('posted_at').notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
