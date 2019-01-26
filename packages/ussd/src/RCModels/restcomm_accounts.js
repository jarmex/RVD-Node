/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommAccounts', {
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
		emailAddress: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'email_address'
		},
		friendlyName: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'friendly_name'
		},
		parentSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'parent_sid'
		},
		type: {
			type: DataTypes.STRING(8),
			allowNull: false,
			field: 'type'
		},
		status: {
			type: DataTypes.STRING(16),
			allowNull: false,
			field: 'status'
		},
		authToken: {
			type: DataTypes.STRING(32),
			allowNull: false,
			field: 'auth_token'
		},
		role: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'role'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		},
		organizationSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'organization_sid'
		}
	}, {
		tableName: 'restcomm_accounts'
	});
};
