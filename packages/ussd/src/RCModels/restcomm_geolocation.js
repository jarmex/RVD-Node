/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommGeolocation', {
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
		dateExecuted: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_executed'
		},
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'account_sid'
		},
		source: {
			type: DataTypes.STRING(30),
			allowNull: true,
			field: 'source'
		},
		deviceIdentifier: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'device_identifier'
		},
		geolocationType: {
			type: DataTypes.STRING(15),
			allowNull: false,
			field: 'geolocation_type'
		},
		responseStatus: {
			type: DataTypes.STRING(30),
			allowNull: true,
			field: 'response_status'
		},
		cellId: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'cell_id'
		},
		locationAreaCode: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'location_area_code'
		},
		mobileCountryCode: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'mobile_country_code'
		},
		mobileNetworkCode: {
			type: DataTypes.STRING(3),
			allowNull: true,
			field: 'mobile_network_code'
		},
		networkEntityAddress: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'network_entity_address'
		},
		ageOfLocationInfo: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'age_of_location_info'
		},
		deviceLatitude: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'device_latitude'
		},
		deviceLongitude: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'device_longitude'
		},
		accuracy: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'accuracy'
		},
		physicalAddress: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'physical_address'
		},
		internetAddress: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'internet_address'
		},
		formattedAddress: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: 'formatted_address'
		},
		locationTimestamp: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'location_timestamp'
		},
		eventGeofenceLatitude: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'event_geofence_latitude'
		},
		eventGeofenceLongitude: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'event_geofence_longitude'
		},
		radius: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'radius'
		},
		geolocationPositioningType: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'geolocation_positioning_type'
		},
		lastGeolocationResponse: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'last_geolocation_response'
		},
		cause: {
			type: DataTypes.STRING(150),
			allowNull: true,
			field: 'cause'
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
		}
	}, {
		tableName: 'restcomm_geolocation'
	});
};
