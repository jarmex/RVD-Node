/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommSandBoxes', {
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
		pin: {
			type: DataTypes.STRING(8),
			allowNull: false,
			field: 'pin'
		},
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'account_sid'
		},
		phoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false,
			field: 'phone_number'
		},
		applicationSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'application_sid'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		voiceUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'voice_url'
		},
		voiceMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'voice_method'
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
		statusCallback: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'status_callback'
		},
		statusCallbackMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'status_callback_method'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		}
	}, {
		tableName: 'restcomm_sand_boxes'
	});
};
