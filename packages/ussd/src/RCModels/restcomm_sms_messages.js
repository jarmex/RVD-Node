/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommSmsMessages', {
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
		dateSent: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_sent'
		},
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'account_sid'
		},
		sender: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'sender'
		},
		recipient: {
			type: DataTypes.STRING(64),
			allowNull: false,
			field: 'recipient'
		},
		body: {
			type: DataTypes.STRING(999),
			allowNull: false,
			field: 'body'
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'status'
		},
		direction: {
			type: DataTypes.STRING(14),
			allowNull: false,
			field: 'direction'
		},
		price: {
			type: DataTypes.STRING(8),
			allowNull: false,
			field: 'price'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		},
		smppMessageId: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'smpp_message_id'
		}
	}, {
		tableName: 'restcomm_sms_messages'
	});
};
