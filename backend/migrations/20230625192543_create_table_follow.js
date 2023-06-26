/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('followers', table => {
		table.string('follower').notNull();
		table.string('followed').notNull();
		table.foreign('follower').references('users.username');
		table.foreign('followed').references('users.username');
		table.primary(['follower','followed']);
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTable('followers');
};
