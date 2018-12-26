/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommRegistrations', {
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
		dateExpires: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_expires'
		},
		addressOfRecord: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'address_of_record'
		},
		displayName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'display_name'
		},
		userName: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'user_name'
		},
		userAgent: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'user_agent'
		},
		ttl: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ttl'
		},
		location: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'location'
		},
		webrtc: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'webrtc'
		},
		instanceid: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'instanceid'
		},
		isLbPresent: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'isLBPresent'
		},
		organizationSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'organization_sid'
		}
	}, {
		tableName: 'restcomm_registrations'
	});
};
