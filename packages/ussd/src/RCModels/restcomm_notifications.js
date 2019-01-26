/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommNotifications', {
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
		accountSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'account_sid'
		},
		callSid: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'call_sid'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		log: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'log'
		},
		errorCode: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			field: 'error_code'
		},
		moreInfo: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'more_info'
		},
		messageText: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'message_text'
		},
		messageDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'message_date'
		},
		requestUrl: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'request_url'
		},
		requestMethod: {
			type: DataTypes.STRING(4),
			allowNull: false,
			field: 'request_method'
		},
		requestVariables: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'request_variables'
		},
		responseHeaders: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'response_headers'
		},
		responseBody: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'response_body'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		}
	}, {
		tableName: 'restcomm_notifications'
	});
};
