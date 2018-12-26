/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommProfileAssociations', {
		targetSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			primaryKey: true,
			field: 'target_sid'
		},
		profileSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'profile_sid'
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
		}
	}, {
		tableName: 'restcomm_profile_associations'
	});
};
