/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('chats', table => {
    table.increments('id').primary();
    table.string('username_from').references('username').inTable('users').notNull();
    table.string('username_to').references('username').inTable('users').notNull();
    table.string('message').notNull();
    table.datetime('sent_at').defaultTo(knex.fn.now()).notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('chats');
};
