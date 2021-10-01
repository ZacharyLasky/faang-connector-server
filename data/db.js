const knex = require('knex');
const knexfile = require('../knexfile');
const dbEnv = process.env.DB_ENV || 'development';
const configOptions = knexfile[dbEnv];

module.exports = knex(configOptions);
