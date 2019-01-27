'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msisdn: {
        type: Sequelize.STRING
      },
      cellid: {
        type: Sequelize.STRING
      },
      sessionid: {
        type: Sequelize.STRING
      },
      imsi: {
        type: Sequelize.STRING
      },
      shortcode: {
        type: Sequelize.STRING
      },
      moduleName: {
        type: Sequelize.STRING
      },
      stepName: {
        type: Sequelize.STRING
      },
      flowend: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};