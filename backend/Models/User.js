const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	login : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	username : String,
	birthday : Date,
	sex : String
});

module.exports = mongoose.model('user', userSchema);