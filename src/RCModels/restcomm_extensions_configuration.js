/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommExtensionsConfiguration', {
		sid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'sid'
		},
		extension: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'extension'
		},
		configurationData: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'configuration_data'
		},
		configurationType: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'configuration_type'
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_created'
		},
		dateUpdated: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_updated'
		},
		enabled: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1',
			field: 'enabled'
		}
	}, {
		tableName: 'restcomm_extensions_configuration'
	});
};
