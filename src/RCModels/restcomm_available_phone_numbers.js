/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommAvailablePhoneNumbers', {
		friendlyName: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'friendly_name'
		},
		phoneNumber: {
			type: DataTypes.STRING(15),
			allowNull: false,
			primaryKey: true,
			field: 'phone_number'
		},
		lata: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'lata'
		},
		rateCenter: {
			type: DataTypes.STRING(32),
			allowNull: true,
			field: 'rate_center'
		},
		latitude: {
			type: "DOUBLE",
			allowNull: true,
			field: 'latitude'
		},
		longitude: {
			type: "DOUBLE",
			allowNull: true,
			field: 'longitude'
		},
		region: {
			type: DataTypes.STRING(2),
			allowNull: true,
			field: 'region'
		},
		postalCode: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'postal_code'
		},
		isoCountry: {
			type: DataTypes.STRING(2),
			allowNull: false,
			field: 'iso_country'
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
		cost: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'cost'
		}
	}, {
		tableName: 'restcomm_available_phone_numbers'
	});
};
