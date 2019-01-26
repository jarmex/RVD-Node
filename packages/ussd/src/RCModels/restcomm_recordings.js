/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommRecordings', {
		sid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'sid'
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_created'
		},
		dateUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_updated'
		},
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'account_sid'
		},
		callSid: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			field: 'call_sid'
		},
		duration: {
			type: "DOUBLE",
			allowNull: false,
			field: 'duration'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		},
		fileUri: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'file_uri'
		},
		s3Uri: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 's3_uri'
		}
	}, {
		tableName: 'restcomm_recordings'
	});
};
