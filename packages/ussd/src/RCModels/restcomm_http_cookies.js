/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommHttpCookies', {
		sid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'sid'
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'comment'
		},
		domain: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'domain'
		},
		expirationDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'expiration_date'
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'name'
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'path'
		},
		value: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'value'
		},
		version: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'version'
		}
	}, {
		tableName: 'restcomm_http_cookies'
	});
};
