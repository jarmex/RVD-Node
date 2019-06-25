require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TRANSACTION_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // operatorsAliases: false,
    sync: { force: false },
  },
  test: {
    username: 'root',
    password: 'FindMy12345',
    database: 'joors',
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      idle: 30000,
      min: 20,
      max: 30,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TRANSACTION_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // operatorsAliases: false,
    logging: false,
    sync: { force: false },
  },
};

// module.exports = {
//   development: {
//     username: null,
//     password: null,
//     database: 'rvdController',
//     host: 'localhost',
//     dialect: 'sqlite',
//     operatorsAliases: false,
//     storage: 'state/db.sqlite',
//     sync: { force: false },
//   },
//   test: {
//     username: null,
//     password: null,
//     database: 'rvdController',
//     host: 'localhost',
//     dialect: 'sqlite',
//     operatorsAliases: false,
//     storage: 'state/db_test.sqlite',
//     pool: {
//       idle: 30000,
//       min: 20,
//       max: 30,
//     },
//     sync: { force: true },
//   },
//   production: {
//     username: null,
//     password: null,
//     database: 'rvdController',
//     host: 'localhost',
//     dialect: 'sqlite',
//     operatorsAliases: false,
//     storage: 'state/db_prod.sqlite',
//     logging: false,
//     pool: {
//       idle: 10000,
//       min: 20,
//       max: 30,
//       acquire: 30000,
//     },
//   },
// };
