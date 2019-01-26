/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restcommTranscriptions', {
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
		status: {
			type: DataTypes.STRING(11),
			allowNull: false,
			field: 'status'
		},
		recordingSid: {
			type: DataTypes.STRING(34),
			allowNull: false,
			field: 'recording_sid'
		},
		duration: {
			type: "DOUBLE",
			allowNull: false,
			field: 'duration'
		},
		transcriptionText: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'transcription_text'
		},
		price: {
			type: DataTypes.STRING(8),
			allowNull: false,
			field: 'price'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'uri'
		}
	}, {
		tableName: 'restcomm_transcriptions'
	});
};
