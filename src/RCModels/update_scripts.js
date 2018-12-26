/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('updateScripts', {
		script: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'script'
		},
		dateExecuted: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_executed'
		}
	}, {
		tableName: 'update_scripts'
	});
};
