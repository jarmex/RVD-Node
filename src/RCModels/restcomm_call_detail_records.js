/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommCallDetailRecords', {
		sid: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			primaryKey: true,
			field: 'sid'
		},
		parentCallSid: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			field: 'parent_call_sid'
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
		phoneNumberSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'phone_number_sid'
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'status'
		},
		startTime: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'start_time'
		},
		endTime: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'end_time'
		},
		duration: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'duration'
		},
		price: {
			type: DataTypes.STRING(8),
			allowNull: true,
			field: 'price'
		},
		direction: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'direction'
		},
		answeredBy: {
			type: DataTypes.STRING(64),
			allowNull: true,
			field: 'answered_by'
		},
		apiVersion: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'api_version'
		},
		forwardedFrom: {
			type: DataTypes.STRING(30),
			allowNull: true,
			field: 'forwarded_from'
		},
		callerName: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'caller_name'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		},
		callPath: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'call_path'
		},
		ringDuration: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'ring_duration'
		},
		instanceid: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'instanceid'
		},
		conferenceSid: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'conference_sid'
		},
		muted: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'muted'
		},
		startConferenceOnEnter: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'start_conference_on_enter'
		},
		endConferenceOnExit: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'end_conference_on_exit'
		},
		onHold: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			field: 'on_hold'
		},
		msId: {
			type: DataTypes.STRING(34),
			allowNull: true,
			field: 'ms_id'
		}
	}, {
		tableName: 'restcomm_call_detail_records'
	});
};
