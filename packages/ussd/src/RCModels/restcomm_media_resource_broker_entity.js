/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommMediaResourceBrokerEntity', {
		conferenceSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'conference_sid'
		},
		slaveMsId: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'slave_ms_id'
		},
		slaveMsBridgeEpId: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'slave_ms_bridge_ep_id'
		},
		slaveMsCnfEpId: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'slave_ms_cnf_ep_id'
		},
		isBridgedTogether: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_bridged_together'
		}
	}, {
		tableName: 'restcomm_media_resource_broker_entity'
	});
};
