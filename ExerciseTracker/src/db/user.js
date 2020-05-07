const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		maxlength: [20, 'username too long']
	},
	_id: {
		type: String,
		index: true,
		default: shortid.generate
	}
});

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;


