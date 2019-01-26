/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommInstanceId', {
		instanceId: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'instance_id'
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
		host: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'host'
		}
	}, {
		tableName: 'restcomm_instance_id'
	});
};
