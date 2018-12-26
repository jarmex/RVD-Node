/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommShortCodes', {
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
		friendlyName: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'friendly_name'
		},
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'account_sid'
		},
		shortCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'short_code'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		smsUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'sms_url'
		},
		smsMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'sms_method'
		},
		smsFallbackUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'sms_fallback_url'
		},
		smsFallbackMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'sms_fallback_method'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		}
	}, {
		tableName: 'restcomm_short_codes'
	});
};
