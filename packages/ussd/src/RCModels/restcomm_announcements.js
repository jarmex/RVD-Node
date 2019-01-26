/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommAnnouncements', {
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
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'account_sid'
		},
		gender: {
			type: DataTypes.STRING(8),
			allowNull: false,
			field: 'gender'
		},
		language: {
			type: DataTypes.STRING(16),
			allowNull: false,
			field: 'language'
		},
		text: {
			type: DataTypes.STRING(32),
			allowNull: false,
			field: 'text'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		}
	}, {
		tableName: 'restcomm_announcements'
	});
};
