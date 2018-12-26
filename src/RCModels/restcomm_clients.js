/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommClients', {
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
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		friendlyName: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'friendly_name'
		},
		login: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'login'
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'password'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'status'
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
		voiceFallbackUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'voice_fallback_url'
		},
		voiceFallbackMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'voice_fallback_method'
		},
		voiceApplicationSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'voice_application_sid'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		},
		pushClientIdentity: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'push_client_identity'
		},
		passwordAlgorithm: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'password_algorithm'
		}
	}, {
		tableName: 'restcomm_clients'
	});
};
