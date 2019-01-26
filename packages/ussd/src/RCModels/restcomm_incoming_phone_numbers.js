/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommIncomingPhoneNumbers', {
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
			type: DataTypes.STRING(256),
			allowNull: false,
			field: 'friendly_name'
		},
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'account_sid'
		},
		phoneNumber: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'phone_number'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		voiceCallerIdLookup: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'voice_caller_id_lookup'
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
		voiceApplicationSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'voice_application_sid'
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
		smsApplicationSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'sms_application_sid'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		},
		voiceCapable: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'voice_capable'
		},
		smsCapable: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'sms_capable'
		},
		mmsCapable: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'mms_capable'
		},
		faxCapable: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'fax_capable'
		},
		pureSip: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'pure_sip'
		},
		cost: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'cost'
		},
		ussdUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ussd_url'
		},
		ussdMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'ussd_method'
		},
		ussdFallbackUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ussd_fallback_url'
		},
		ussdFallbackMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'ussd_fallback_method'
		},
		ussdApplicationSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'ussd_application_sid'
		},
		referUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'refer_url'
		},
		referMethod: {
			type: DataTypes.STRING(4),
			allowNull: true,
			field: 'refer_method'
		},
		referApplicationSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'refer_application_sid'
		},
		organizationSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'organization_sid'
		}
	}, {
		tableName: 'restcomm_incoming_phone_numbers'
	});
};
