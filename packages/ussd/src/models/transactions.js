'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    'Transactions',
    {
      msisdn: DataTypes.STRING(35),
      cellid: DataTypes.STRING(25),
      sessionid: DataTypes.STRING(128),
      imsi: DataTypes.STRING(40),
      shortcode: DataTypes.STRING(20),
      moduleName: DataTypes.STRING(75),
      moduleLabel: DataTypes.STRING(75),
      stepName: DataTypes.STRING(75),
      stepKind: DataTypes.STRING(75),
      flowend: DataTypes.BOOLEAN,
      replyMessage: DataTypes.STRING(500),
    },
    {},
  );
  // transactions.associate = function(models) {
  //   // associations can be defined here
  // };
  return Transactions;
};
