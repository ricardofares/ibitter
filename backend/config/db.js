/// \brief Imports the database configurations.
const config = require('../knexfile.js');

/// \brief Create a \c knex instance based on the previously
///         loaded configuration.
const knex = require('knex')(config);

// Executes the last migrations in the database.
knex.migrate.latest([config]);

// Exports the knex to be used outside this file.
module.exports = knex;
