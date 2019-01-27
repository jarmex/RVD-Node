require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
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
    define: {
      timestamps: false,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
    define: {
      timestamps: false,
    },
  },
};
