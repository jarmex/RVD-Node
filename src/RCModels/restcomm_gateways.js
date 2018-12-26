/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommGateways', {
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
			allowNull: true,
			field: 'friendly_name'
		},
		userName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'user_name'
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'password'
		},
		proxy: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'proxy'
		},
		register: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'register'
		},
		ttl: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ttl'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		}
	}, {
		tableName: 'restcomm_gateways'
	});
};
