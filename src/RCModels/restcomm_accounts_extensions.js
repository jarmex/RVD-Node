/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommAccountsExtensions', {
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'account_sid'
		},
		extensionSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'extension_sid'
		},
		configurationData: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'configuration_data'
		}
	}, {
		tableName: 'restcomm_accounts_extensions'
	});
};
