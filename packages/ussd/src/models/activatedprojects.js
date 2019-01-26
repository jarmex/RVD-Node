// 'use strict';

module.exports = (sequelize, DataTypes) => {
  const activatedprojects = sequelize.define(
    'ActivatedProjects',
    {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      friendlyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortcode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {},
  );

  return activatedprojects;
};
