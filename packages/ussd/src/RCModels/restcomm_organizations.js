/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommOrganizations', {
		sid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'sid'
		},
		domainName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
			field: 'domain_name'
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
		status: {
			type: DataTypes.STRING(16),
			allowNull: false,
			field: 'status'
		}
	}, {
		tableName: 'restcomm_organizations'
	});
};
