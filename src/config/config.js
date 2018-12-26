require('dotenv').config();

module.exports = {
  development: {
    username: null,
    password: null,
    database: 'rvdController',
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: 'state/db.sqlite',
    sync: { force: false },
  },
  test: {
    username: null,
    password: null,
    database: 'rvdController',
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: 'state/db_test.sqlite',
    pool: {
      idle: 30000,
      min: 20,
      max: 30,
    },
    sync: { force: true },
  },
  production: {
    username: null,
    password: null,
    database: 'rvdController',
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: 'state/db_prod.sqlite',
    logging: false,
    pool: {
      idle: 10000,
      min: 20,
      max: 30,
      acquire: 30000,
    },
  },
};
