/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'restcommApplications',
    {
      sid: {
        type: DataTypes.STRING(34),
        allowNull: false,
        primaryKey: true,
        field: 'sid',
      },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created',
      },
      dateUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_updated',
      },
      friendlyName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'friendly_name',
      },
      accountSid: {
        type: DataTypes.STRING(34),
        allowNull: false,
        field: 'account_sid',
      },
      apiVersion: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'api_version',
      },
      voiceCallerIdLookup: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: 'voice_caller_id_lookup',
      },
      uri: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'uri',
      },
      rcmlUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'rcml_url',
      },
      kind: {
        type: DataTypes.STRING(5),
        allowNull: true,
        field: 'kind',
      },
    },
    {
      tableName: 'restcomm_applications',
    },
  );
};
