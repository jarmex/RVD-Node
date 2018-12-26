/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommConferenceDetailRecords', {
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
		status: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'status'
		},
		friendlyName: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'friendly_name'
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
		masterMsId: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'master_ms_id'
		},
		masterConferenceEndpointId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_conference_endpoint_id'
		},
		masterPresent: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1',
			field: 'master_present'
		},
		masterIvrEndpointId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_ivr_endpoint_id'
		},
		masterIvrEndpointSessionId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_ivr_endpoint_session_id'
		},
		masterBridgeEndpointId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_bridge_endpoint_id'
		},
		masterBridgeEndpointSessionId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_bridge_endpoint_session_id'
		},
		masterBridgeConnId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_bridge_conn_id'
		},
		masterIvrConnId: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'master_ivr_conn_id'
		},
		moderatorPresent: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'moderator_present'
		}
	}, {
		tableName: 'restcomm_conference_detail_records'
	});
};
