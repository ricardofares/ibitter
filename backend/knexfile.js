module.exports = {
  client: 'postgresql',
  connection: {
    database: 'ibitter_db',
    user: 'ibitter_client',
    password: '0I2i8*!P98HB',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
