/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommMediaServers', {
		msId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'ms_id'
		},
		localIp: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'local_ip'
		},
		localPort: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'local_port'
		},
		remoteIp: {
			type: DataTypes.STRING(34),
			allowNull: false,
			unique: true,
			field: 'remote_ip'
		},
		remotePort: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'remote_port'
		},
		compatibility: {
			type: DataTypes.STRING(34),
			allowNull: true,
			defaultValue: 'rms',
			field: 'compatibility'
		},
		responseTimeout: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'response_timeout'
		},
		externalAddress: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'external_address'
		}
	}, {
		tableName: 'restcomm_media_servers'
	});
};
